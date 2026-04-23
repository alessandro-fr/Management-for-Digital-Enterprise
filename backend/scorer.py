"""
VALUE INTELLIGENCE PLATFORM
Livello 2 — Scoring Model (4 Capitali)

Riceve le variabili normalizzate dal Livello 1 (scala 0–1)
e restituisce:
  - Score per ciascuno dei 4 capitali       [0–1]
  - SQF (Strategic Quality Factor)          [0.6–1.4]
  - Quality Score (leggibile /100)          [0–100]
  - Risk Index                              [LOW / MEDIUM / HIGH]
  - Scalability Index                       [LOW / MEDIUM / HIGH]
  - GF (Growth Factor)                      [float]
"""


# ─────────────────────────────────────────────
# TABELLE DI CONTESTO
# ─────────────────────────────────────────────

# Multipli EBITDA per settore (fonte: Mediobanca SME Report, Damodaran)
SECTOR_MULTIPLES = {
    "Tecnologia/SaaS":       7.5,
    "Servizi B2B":           5.5,
    "Manifatturiero":        4.5,
    "Healthcare":            6.0,
    "Retail/GDO":            4.0,
    "Edilizia/Immobiliare":  4.2,
    "Altro":                 5.0,
}

# Fattori di aggiustamento GF per settore
# Riflette la qualità attesa della crescita in quel mercato
SECTOR_GF_FACTORS = {
    "Tecnologia/SaaS":       1.20,
    "Servizi B2B":           1.00,
    "Manifatturiero":        0.85,
    "Healthcare":            1.10,
    "Retail/GDO":            0.90,
    "Edilizia/Immobiliare":  0.88,
    "Altro":                 1.00,
}

# Benchmark di settore per i 4 capitali
# Usati per mostrare gap vs media nel dashboard
SECTOR_BENCHMARKS = {
    "Tecnologia/SaaS":      {"financial": 0.72, "technological": 0.80, "human": 0.65, "relational": 0.70},
    "Servizi B2B":          {"financial": 0.65, "technological": 0.55, "human": 0.60, "relational": 0.68},
    "Manifatturiero":       {"financial": 0.60, "technological": 0.45, "human": 0.55, "relational": 0.50},
    "Healthcare":           {"financial": 0.68, "technological": 0.60, "human": 0.70, "relational": 0.65},
    "Retail/GDO":           {"financial": 0.55, "technological": 0.50, "human": 0.50, "relational": 0.60},
    "Edilizia/Immobiliare": {"financial": 0.58, "technological": 0.40, "human": 0.52, "relational": 0.55},
    "Altro":                {"financial": 0.62, "technological": 0.52, "human": 0.57, "relational": 0.58},
}


# ─────────────────────────────────────────────
# PASSO 1 — SCORE PER CAPITALE
# ─────────────────────────────────────────────

def score_financial_capital(n: dict) -> float:
    """
    Capitale Finanziario — peso nel SQF: 35%
    Misura la solidità e qualità economica dell'azienda.
    È il capitale più pesante perché interamente verificabile da bilancio.

    Variabili:
      - ebitda_margin      (30%) → redditività operativa
      - revenue_cagr       (25%) → traiettoria di crescita
      - recurring_revenue  (25%) → qualità e prevedibilità dei ricavi
      - client_concentration (20%) → rischio di concentrazione (inversa)
    """
    score = (
        n["ebitda_margin"]       * 0.30 +
        n["revenue_cagr"]        * 0.25 +
        n["recurring_revenue"]   * 0.25 +
        n["client_concentration"]* 0.20
    )
    return round(score, 4)


def score_technological_capital(n: dict) -> float:
    """
    Capitale Tecnologico — peso nel SQF: 25%
    Misura la maturità digitale e la capacità di crescere
    senza aumentare proporzionalmente i costi.

    Variabili:
      - digital_maturity  (40%) → quanto sono digitalizzati i processi
      - tech_investment   (35%) → quanto si investe in tecnologia
      - scalability       (25%) → quanto il modello è scalabile
    """
    score = (
        n["digital_maturity"]  * 0.40 +
        n["tech_investment"]   * 0.35 +
        n["scalability"]       * 0.25
    )
    return round(score, 4)


def score_human_capital(n: dict) -> float:
    """
    Capitale Umano & Organizzativo — peso nel SQF: 25%
    Misura la trasferibilità e solidità organizzativa.
    Critico per valutazioni in ottica di exit o investimento.

    Variabili:
      - founder_dependency      (40%) → rischio dipendenza (già inversa dal L1)
      - management_structure    (35%) → solidità del team manageriale
      - client_portfolio_quality (25%) → qualità e fidelizzazione clienti
    """
    score = (
        n["founder_dependency"]       * 0.40 +
        n["management_structure"]     * 0.35 +
        n["client_portfolio_quality"] * 0.25
    )
    return round(score, 4)


def score_relational_capital(n: dict) -> float:
    """
    Capitale Relazionale — peso nel SQF: 15%
    Misura la forza della rete e delle relazioni strategiche.
    Pesa meno perché è il più soggettivo e volatile nel tempo.

    Variabili:
      - network_strength       (60%) → qualità delle partnership
      - client_concentration   (40%) → proxy: dipendere da pochi = rete debole
    """
    score = (
        n["network_strength"]        * 0.60 +
        n["client_concentration"]    * 0.40
    )
    return round(score, 4)


# ─────────────────────────────────────────────
# PASSO 2 — SQF (Strategic Quality Factor)
# ─────────────────────────────────────────────

def calculate_sqf(scores: dict) -> float:
    """
    Aggrega i 4 score nel SQF finale.
    Range output: [0.6 – 1.4]

    Pesi:
      Finanziario   35% — più pesante, oggettivo e verificabile
      Tecnologico   25% — abilitante per la crescita
      Umano         25% — critico per trasferibilità
      Relazionale   15% — rilevante ma più soggettivo

    Formula di riscalamento:
      sqf_raw è in [0, 1]
      SQF = 0.6 + (sqf_raw × 0.8) → mappa su [0.6, 1.4]

    Interpretazione:
      SQF < 0.8   → azienda con fragilità strutturali significative
      SQF 0.8–1.0 → azienda nella media
      SQF 1.0–1.2 → azienda solida, sopra la media
      SQF > 1.2   → azienda eccellente, alta attrattività
    """
    sqf_raw = (
        scores["financial"]    * 0.35 +
        scores["technological"]* 0.25 +
        scores["human"]        * 0.25 +
        scores["relational"]   * 0.15
    )
    sqf = 0.6 + (sqf_raw * 0.8)
    return round(sqf, 4)


# ─────────────────────────────────────────────
# PASSO 3 — GROWTH FACTOR (GF)
# ─────────────────────────────────────────────

def calculate_gf(n: dict, sector: str) -> float:
    """
    Growth Factor: misura la qualità e sostenibilità della crescita attesa.
    Combina CAGR (velocità) con Recurring Revenue (qualità).
    Viene aggiustato per settore e normalizzato per non distorcere
    eccessivamente la valutazione finale.

    Formula:
      gf_raw = (CAGR_norm × 60%) + (Recurring_norm × 40%)
      GF = gf_raw × fattore_settore

    Range tipico: [0.3 – 1.2]
    """
    gf_raw = (
        n["revenue_cagr"]      * 0.60 +
        n["recurring_revenue"] * 0.40
    )
    sector_factor = SECTOR_GF_FACTORS.get(sector, 1.0)
    gf = gf_raw * sector_factor
    return round(gf, 4)


# ─────────────────────────────────────────────
# PASSO 4 — INDICI DERIVATI
# ─────────────────────────────────────────────

def calculate_quality_score(sqf: float) -> int:
    """
    Trasforma il SQF [0.6–1.4] in un punteggio leggibile [0–100].
    Usato nel dashboard come 'Quality Score'.

    Formula: ((SQF - 0.6) / 0.8) × 100
    """
    score = ((sqf - 0.6) / 0.8) * 100
    return round(score)


def calculate_risk_index(scores: dict) -> dict:
    """
    Risk Index: misura il rischio strutturale complessivo.
    Pesa principalmente il capitale finanziario e umano
    perché sono i driver principali di rischio per investitori.

    Formula:
      risk_raw = 1 - (Financial×50% + Human×30% + Relational×20%)
      Più basso il risk_raw, più bassa la qualità → più alto il rischio

    Soglie:
      risk_raw < 0.30 → HIGH   (azienda fragile)
      risk_raw < 0.60 → MEDIUM (rischi presenti ma gestibili)
      risk_raw ≥ 0.60 → LOW    (azienda solida)
    """
    risk_raw = (
        scores["financial"]   * 0.50 +
        scores["human"]       * 0.30 +
        scores["relational"]  * 0.20
    )
    if risk_raw < 0.30:
        return {"label": "HIGH",   "color": "#e17055", "value": round(risk_raw, 4)}
    elif risk_raw < 0.60:
        return {"label": "MEDIUM", "color": "#fdcb6e", "value": round(risk_raw, 4)}
    else:
        return {"label": "LOW",    "color": "#00b894", "value": round(risk_raw, 4)}


def calculate_scalability_index(scores: dict, n: dict) -> dict:
    """
    Scalability Index: misura il potenziale di crescita senza
    aumentare proporzionalmente i costi.
    Pesa tecnologico e scalability come driver principali.

    Soglie:
      < 0.40 → LOW
      < 0.70 → MEDIUM
      ≥ 0.70 → HIGH
    """
    scalability_raw = (
        scores["technological"] * 0.50 +
        n["scalability"]        * 0.30 +
        scores["relational"]    * 0.20
    )
    if scalability_raw < 0.40:
        return {"label": "LOW",    "color": "#e17055", "value": round(scalability_raw, 4)}
    elif scalability_raw < 0.70:
        return {"label": "MEDIUM", "color": "#fdcb6e", "value": round(scalability_raw, 4)}
    else:
        return {"label": "HIGH",   "color": "#00b894", "value": round(scalability_raw, 4)}


# ─────────────────────────────────────────────
# FUNZIONE PRINCIPALE — esegue tutto il Livello 2
# ─────────────────────────────────────────────

def run_scoring_model(normalized: dict, sector: str) -> dict:
    """
    Riceve l'output del Livello 1 (normalized) e il settore.
    Restituisce tutti gli score e indici calcolati.

    Input:
      normalized — dizionario output di normalize_all_inputs() dal L1
      sector     — stringa settore (es. "Servizi B2B")

    Output:
      {
        scores: { financial, technological, human, relational },
        sqf,
        gf,
        quality_score,
        risk_index,
        scalability_index,
        benchmarks,
        gaps_vs_benchmark
      }
    """
    # Score per capitale
    scores = {
        "financial":     score_financial_capital(normalized),
        "technological": score_technological_capital(normalized),
        "human":         score_human_capital(normalized),
        "relational":    score_relational_capital(normalized),
    }

    # SQF e GF
    sqf = calculate_sqf(scores)
    gf  = calculate_gf(normalized, sector)

    # Indici derivati
    quality_score     = calculate_quality_score(sqf)
    risk_index        = calculate_risk_index(scores)
    scalability_index = calculate_scalability_index(scores, normalized)

    # Benchmark e gap vs settore
    benchmarks = SECTOR_BENCHMARKS.get(sector, SECTOR_BENCHMARKS["Altro"])
    gaps = {
        cap: round(scores[cap] - benchmarks[cap], 4)
        for cap in scores
    }

    return {
        "scores":            scores,
        "sqf":               sqf,
        "gf":                gf,
        "quality_score":     quality_score,
        "risk_index":        risk_index,
        "scalability_index": scalability_index,
        "benchmarks":        benchmarks,
        "gaps_vs_benchmark": gaps,
    }