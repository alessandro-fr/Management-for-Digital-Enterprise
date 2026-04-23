"""
VALUE INTELLIGENCE PLATFORM
Livello 1 — Normalizzazione delle Variabili

Ogni variabile viene portata su scala 0.0 – 1.0
Le variabili inverse (es. founder dependency, client concentration)
vengono penalizzate: più alto il valore grezzo, più basso il normalizzato.
"""


# ─────────────────────────────────────────────
# VARIABILI QUANTITATIVE DA BILANCIO
# ─────────────────────────────────────────────

def normalize_ebitda_margin(margin_pct: float) -> float:
    """
    EBITDA Margin in percentuale (es. 18.5 per 18.5%)
    Soglie calibrate su PMI italiane (fonte: Mediobanca SME Report)
    """
    if margin_pct < 5:
        return 0.1
    elif margin_pct < 10:
        return 0.3
    elif margin_pct < 15:
        return 0.5
    elif margin_pct < 20:
        return 0.7
    elif margin_pct < 25:
        return 0.85
    else:
        return 1.0


def normalize_revenue_cagr(cagr_pct: float) -> float:
    """
    Revenue CAGR in percentuale (es. 8.5 per 8.5%)
    Calcolato automaticamente da: (Rev_Y3 / Rev_Y1)^(1/2) - 1
    Valori negativi = declino = penalizzazione massima
    """
    if cagr_pct < 0:
        return 0.0
    elif cagr_pct < 3:
        return 0.3
    elif cagr_pct < 7:
        return 0.5
    elif cagr_pct < 12:
        return 0.7
    elif cagr_pct < 20:
        return 0.9
    else:
        return 1.0


def normalize_recurring_revenue(recurring_pct: float) -> float:
    """
    Percentuale di ricavi ricorrenti su totale (0–100)
    Dato dichiarato dall'imprenditore (non estraibile da bilancio)
    """
    if recurring_pct < 10:
        return 0.1
    elif recurring_pct < 25:
        return 0.3
    elif recurring_pct < 50:
        return 0.6
    elif recurring_pct < 75:
        return 0.8
    else:
        return 1.0


def normalize_client_concentration(top3_pct: float) -> float:
    """
    Concentrazione top-3 clienti su fatturato totale (0–100)
    INVERSA: più concentrato = più rischioso = score più basso
    Dato dichiarato dall'imprenditore
    """
    if top3_pct > 70:
        return 0.1
    elif top3_pct > 50:
        return 0.3
    elif top3_pct > 35:
        return 0.5
    elif top3_pct > 20:
        return 0.8
    else:
        return 1.0


def normalize_tech_investment(tech_rev_ratio_pct: float) -> float:
    """
    Tech investment / Revenue in percentuale (es. 3.5 per 3.5%)
    Dato ibrido: dichiarato dall'imprenditore + validato da bilancio
    """
    if tech_rev_ratio_pct < 1:
        return 0.1
    elif tech_rev_ratio_pct < 2:
        return 0.3
    elif tech_rev_ratio_pct < 4:
        return 0.5
    elif tech_rev_ratio_pct < 6:
        return 0.7
    elif tech_rev_ratio_pct < 10:
        return 0.9
    else:
        return 1.0


# ─────────────────────────────────────────────
# VARIABILI QUALITATIVE (scala 1–5)
# ─────────────────────────────────────────────

def normalize_qualitative(value: int) -> float:
    """
    Normalizzazione lineare standard per variabili qualitative 1–5
    Usata per: management_structure, digital_maturity,
               client_portfolio_quality, business_model_scalability,
               network_partnership_strength
    """
    if value < 1 or value > 5:
        raise ValueError(f"Valore qualitativo deve essere tra 1 e 5, ricevuto: {value}")
    return (value - 1) / 4


def normalize_founder_dependency(value: int) -> float:
    """
    Founder dependency — INVERSA
    5 = totalmente dipendente dal fondatore = score 0 (massimo rischio)
    1 = azienda autonoma dal fondatore     = score 1 (minimo rischio)
    """
    if value < 1 or value > 5:
        raise ValueError(f"Valore qualitativo deve essere tra 1 e 5, ricevuto: {value}")
    return (5 - value) / 4


# ─────────────────────────────────────────────
# CALCOLO CAGR DA RICAVI GREZZI
# ─────────────────────────────────────────────

def calculate_cagr(revenue_y1: float, revenue_y3: float) -> float:
    """
    Calcola il CAGR a 2 anni dai ricavi anno 1 e anno 3
    Formula: (Rev_Y3 / Rev_Y1)^(1/2) - 1
    Restituisce la percentuale (es. 8.5 per 8.5%)
    """
    if revenue_y1 <= 0:
        raise ValueError("Revenue anno 1 deve essere positivo")
    cagr = ((revenue_y3 / revenue_y1) ** 0.5) - 1
    return round(cagr * 100, 2)


# ─────────────────────────────────────────────
# FUNZIONE PRINCIPALE — normalizza tutti gli input
# ─────────────────────────────────────────────

def normalize_all_inputs(raw_inputs: dict) -> dict:
    """
    Riceve il dizionario grezzo degli input e restituisce
    tutti i valori normalizzati su scala 0–1.

    Input attesi (raw_inputs):
    {
        # Da bilancio
        "revenue_y1": float,           # Ricavi anno 1 in €
        "revenue_y2": float,           # Ricavi anno 2 in €
        "revenue_y3": float,           # Ricavi anno 3 in €
        "ebitda": float,               # EBITDA in €
        "tech_investment_pct": float,  # Tech invest / revenue %

        # Dichiarati dall'imprenditore
        "recurring_revenue_pct": float,   # % ricavi ricorrenti
        "client_concentration_pct": float, # % top-3 clienti

        # Qualitativi 1–5
        "founder_dependency": int,
        "management_structure": int,
        "digital_maturity": int,
        "client_portfolio_quality": int,
        "business_model_scalability": int,
        "network_partnership_strength": int,
    }
    """

    # Calcoli derivati da bilancio
    cagr = calculate_cagr(raw_inputs["revenue_y1"], raw_inputs["revenue_y3"])
    ebitda_margin = (raw_inputs["ebitda"] / raw_inputs["revenue_y3"]) * 100

    normalized = {
        # Quantitativi
        "ebitda_margin":           normalize_ebitda_margin(ebitda_margin),
        "revenue_cagr":            normalize_revenue_cagr(cagr),
        "recurring_revenue":       normalize_recurring_revenue(raw_inputs["recurring_revenue_pct"]),
        "client_concentration":    normalize_client_concentration(raw_inputs["client_concentration_pct"]),
        "tech_investment":         normalize_tech_investment(raw_inputs["tech_investment_pct"]),

        # Qualitativi
        "founder_dependency":      normalize_founder_dependency(raw_inputs["founder_dependency"]),
        "management_structure":    normalize_qualitative(raw_inputs["management_structure"]),
        "digital_maturity":        normalize_qualitative(raw_inputs["digital_maturity"]),
        "client_portfolio_quality":normalize_qualitative(raw_inputs["client_portfolio_quality"]),
        "scalability":             normalize_qualitative(raw_inputs["business_model_scalability"]),
        "network_strength":        normalize_qualitative(raw_inputs["network_partnership_strength"]),

        # Valori derivati (utili per Livello 2 e 3)
        "_cagr_pct":               cagr,
        "_ebitda_margin_pct":      round(ebitda_margin, 2),
        "_ebitda_raw":             raw_inputs["ebitda"],
        "_revenue_y3":             raw_inputs["revenue_y3"],
    }

    return normalized