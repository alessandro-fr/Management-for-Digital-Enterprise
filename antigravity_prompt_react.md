# ANTIGRAVITY PROMPT — Value Intelligence Platform
# Frontend React — Qualità Production-Grade
# Master in Data Science for Management — Cattolica, 2026

---

## CONTESTO DEL PROGETTO

Sto sviluppando la **Value Intelligence Platform**, una web app per la
valutazione strategica delle PMI italiane. È il progetto finale del corso
"Management for Digital Enterprise" (Prof. G. Tedeschi, Università Cattolica).

Il backend Python (FastAPI) è già scritto e gira su `http://localhost:8000`.
Devi costruire il **frontend in React** che comunica con esso via fetch API.

---

## DIREZIONE ESTETICA — LUXURY DARK INTELLIGENCE

L'interfaccia deve trasmettere: **precisione analitica, autorevolezza finanziaria,
strumento per decisori**. Non un tool universitario — un prodotto SaaS premium.

Ispirazione visiva: Bloomberg Terminal meets Palantir Foundry.
Dark, denso di informazioni, ma estremamente leggibile e controllato.

### Palette colori
```css
--bg-base:        #080f1a;   /* Sfondo root — quasi nero */
--bg-surface:     #0d1b2a;   /* Superfici principali */
--bg-elevated:    #132238;   /* Card e pannelli */
--bg-subtle:      #1a2f4a;   /* Hover, input background */

--accent-primary: #00c2ff;   /* Ciano elettrico — azioni principali */
--accent-second:  #00e5a0;   /* Verde teal — valori positivi */
--accent-warn:    #ffb830;   /* Ambra — warning, medium risk */
--accent-danger:  #ff4d6d;   /* Rosso — high risk, errori */

--text-primary:   #e8f0f8;   /* Testo principale */
--text-secondary: #7a9bbf;   /* Label, descrizioni */
--text-muted:     #3d5a7a;   /* Placeholder, disabled */

--border-subtle:  #1e3550;   /* Bordi card */
--border-active:  #00c2ff33; /* Bordi focus/active con alpha */

--glow-primary:   0 0 20px #00c2ff22;
--glow-success:   0 0 20px #00e5a022;
```

### Tipografia
```
Display / Titoli grandi: "Space Grotesk" (Google Fonts) — peso 700
Body / UI:               "DM Sans" (Google Fonts) — peso 400/500
Monospace / Numeri:      "JetBrains Mono" (Google Fonts) — per valori €, %
Label uppercase:         DM Sans 500, letter-spacing: 0.12em, font-size: 0.7rem
```

### Principi di layout
- Griglia a 12 colonne con gap 24px
- Border-radius: 2px per elementi piccoli, 6px per card, 12px per pannelli grandi
- Ombre: `box-shadow: 0 1px 3px #00000066, 0 0 0 1px var(--border-subtle)`
- Nessun elemento "piatto" — ogni card ha profondità tramite bordi e ombre
- Separatori: linee sottili 1px in `--border-subtle`, mai blocchi colorati
- Numeri grandi in JetBrains Mono — danno senso di dato reale e preciso

### Micro-interazioni
- Hover su card: `border-color` passa da `--border-subtle` a `--border-active` con transizione 200ms
- Bottoni: scale(0.97) on click, glow on hover
- Input focus: bordo `--accent-primary` con glow sottile
- Slider: track colorato che si riempie da sinistra, thumb con glow
- Numeri del dashboard: counter animato da 0 al valore finale (600ms, easing ease-out)
- Transizione tra step: fade + slide verso l'alto (300ms)

---

## STRUTTURA DELL'APPLICAZIONE

### Stack tecnico
```
React 18 (Vite)
Recharts — radar chart e bar chart
Framer Motion — animazioni e transizioni
React Hook Form — gestione form
Tailwind CSS — utility classes (solo quelle base, no JIT)
```

### Struttura file
```
src/
├── App.jsx                    # Router principale e layout
├── components/
│   ├── layout/
│   │   ├── Header.jsx         # Logo + step indicator
│   │   └── StepIndicator.jsx  # Progress bar 4 step
│   ├── steps/
│   │   ├── Step1Profile.jsx   # Profilazione azienda
│   │   ├── Step2Financials.jsx # Dati di bilancio
│   │   ├── Step3Questionnaire.jsx # Questionario
│   │   └── Step4Dashboard.jsx # Output finale
│   ├── dashboard/
│   │   ├── KpiCard.jsx        # Card metrica singola
│   │   ├── RadarChart.jsx     # Radar 4 capitali
│   │   ├── ScoreBar.jsx       # Barra score per capitale
│   │   ├── ActionCard.jsx     # Card azione prioritaria
│   │   └── ValueGapBar.jsx    # Barra value gap
│   └── ui/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Slider.jsx
│       ├── Select.jsx
│       └── QualitativeScale.jsx  # Scala 1-5 con label
└── hooks/
    └── useValuation.js        # Logica chiamata API
```

---

## FLUSSO A 4 STEP

### STEP INDICATOR (header fisso)
```
○──────○──────○──────○
1      2      3      4
Profilo Bilancio Quiz Dashboard
```
- Step completati: cerchio pieno `--accent-primary`
- Step attivo: cerchio con bordo + glow
- Step futuri: cerchio vuoto `--text-muted`
- Linea di collegamento che si riempie progressivamente

---

### STEP 1 — Profilo Azienda

Layout: form centrato, max-width 640px, card elevata

**Campi:**
```
Nome azienda        → Input text, placeholder "es. Tecno Srl"

Settore             → Select custom con icone
  Opzioni: Tecnologia/SaaS | Servizi B2B | Manifatturiero
           Healthcare | Retail/GDO | Edilizia/Immobiliare | Altro

Fase ciclo di vita  → Radio buttons orizzontali con label
  Startup | Crescita | Maturità | Declino

Obiettivo           → Radio cards (non radio tradizionale)
  — Crescita organica
  — Ricerca investitori
  — Preparazione exit/vendita
  — Passaggio generazionale
  — Stabilità

Orizzonte temporale → Segmented control (3 opzioni)
  1–2 anni | 3–5 anni | 5+ anni

Asset distintivi    → Checkbox multiplo
  Brevetti/IP | Marchio registrato | Software proprietario
  Contratti pluriennali | Nessuno
```

---

### STEP 2 — Dati di Bilancio

Layout: due colonne su desktop, una su mobile

**Sezione sinistra — Da Bilancio:**
```
Revenue Anno 1 (€)  → Input numerico con formattazione automatica
Revenue Anno 2 (€)  → Input numerico
Revenue Anno 3 (€)  → Input numerico
EBITDA (€)          → Input numerico
```

**Sezione destra — Preview calcolata in tempo reale:**
```
┌─────────────────────────────┐
│  PREVIEW                    │
│                             │
│  EBITDA Margin   16.0%      │
│  Revenue CAGR    11.8%      │
│                             │
│  Calcolato automaticamente  │
│  dai dati inseriti          │
└─────────────────────────────┘
```

**Sezione inferiore — Dato ibrido:**
```
Tech Investment / Revenue %
Slider 0–20% con valore mostrato in tempo reale
Nota: "Dato dichiarato — validato con bilancio"
```

---

### STEP 3 — Questionario

Layout: due colonne

**Colonna sinistra — Quantitativi dichiarati:**
```
% Ricavi Ricorrenti
Slider 0–100% con label:
  0%    "Nessun ricavo ricorrente"
  50%   "Metà del fatturato"
  100%  "Completamente ricorrente"

Concentrazione Top-3 Clienti %
Slider 0–100% con label:
  <20%  "Portfolio molto diversificato ✓"
  >60%  "Rischio concentrazione alto ⚠"
```

**Colonna destra — Qualitativi 1–5:**

Per ognuna delle 6 domande usare il componente `QualitativeScale`:
```
Domanda
[1]──[2]──[3]──[4]──[5]
Label_min         Label_max
```

Le 6 domande:
```
1. Dipendenza dal Fondatore
   1 = "Azienda completamente autonoma"
   5 = "Tutto dipende dal fondatore"

2. Struttura Manageriale
   1 = "Nessun middle management"
   5 = "Team manageriale completo"

3. Maturità Digitale
   1 = "Processi su carta/Excel"
   5 = "Completamente digitalizzato"

4. Qualità Portfolio Clienti
   1 = "1–2 clienti dominanti"
   5 = "Portfolio diversificato e fidelizzato"

5. Scalabilità del Modello
   1 = "Crescita richiede costi proporzionali"
   5 = "Altamente scalabile"

6. Forza della Rete
   1 = "Nessuna rete strategica"
   5 = "Ecosistema di partner solido"
```

**In basso a destra:** mini-preview score in tempo reale
```
Financial  ████████░░  0.60
Human      ████░░░░░░  0.34
```

---

### STEP 4 — Dashboard Output

Questo è lo schermo principale. Deve sembrare un prodotto reale.

#### Layout generale
```
┌─────────────────────────────────────────────────────────┐
│  HEADER: Nome azienda | Settore | Data analisi          │
├──────────┬──────────┬──────────┬──────────────────────  │
│ VALORE   │ VALUE    │ QUALITY  │ RISK                   │
│ STIMATO  │ GAP      │ SCORE    │ INDEX                  │
├──────────┴──────────┴──────────┴──────────────────────  │
│                          │                              │
│   RADAR 4 CAPITALI       │   TOP 3 PRIORITY ACTIONS     │
│   (Recharts RadarChart)  │                              │
│   Attuale vs Benchmark   │   01 ─────────────── +14% V  │
│                          │   02 ─────────────── +9% V   │
│                          │   03 ─────────────── +7% V   │
├──────────────────────────┴──────────────────────────────│
│   SCORE BREAKDOWN — barre orizzontali per capitale      │
└─────────────────────────────────────────────────────────┘
```

#### KPI Cards (4 in alto)

**Card 1 — Valore Stimato**
```
VALORE STIMATO
€ 1.96M
Range: € 1.77M – € 2.16M
Multiplo: 5.5x EBITDA
```
Numero in JetBrains Mono 2.8rem, colore `--accent-primary`
Counter animato da 0 al valore (600ms ease-out)

**Card 2 — Value Gap**
```
VALUE GAP
+88.3%
€ 1.73M di potenziale non espresso
```
Numero in JetBrains Mono, colore `--accent-second`
Barra di progressione sotto il numero

**Card 3 — Quality Score**
```
QUALITY SCORE
46 / 100
Sotto la media di settore
```
Gauge semicircolare SVG animata

**Card 4 — Risk Index**
```
RISK INDEX
MEDIUM
Concentrazione clienti
```
Colore dinamico: LOW=`--accent-second`, MEDIUM=`--accent-warn`, HIGH=`--accent-danger`

#### Radar Chart 4 Capitali
```javascript
// Dati per Recharts RadarChart
const radarData = [
  { capital: 'Financial',     actual: score_f, benchmark: bench_f },
  { capital: 'Technological', actual: score_t, benchmark: bench_t },
  { capital: 'Human & Org.',  actual: score_h, benchmark: bench_h },
  { capital: 'Relational',    actual: score_r, benchmark: bench_r },
];
// Due aree sovrapposte: attuale (--accent-primary, opacity 0.3)
//                       benchmark (--text-muted, opacity 0.15)
// Legenda in basso
```

#### Top 3 Priority Actions
Ogni card azione:
```
┌─────────────────────────────────────────────────┐
│  01  Riduci la concentrazione clienti   +14% V  │
│      Porta i top-3 clienti sotto il 40%         │
│      Orizzonte: 18–24 mesi  ·  +0.12 SQF        │
│      ████████████████░░░░  Financial Capital     │
└─────────────────────────────────────────────────┘
```
Badge "+X% V" in `--accent-second` con sfondo `--accent-second22`

#### Score Breakdown
Barre orizzontali per ogni capitale con:
- Valore attuale (barra colorata)
- Benchmark di settore (linea verticale tratteggiata)
- Gap in % a destra
- Label capitale a sinistra

---

## CHIAMATA API

```javascript
// hooks/useValuation.js
const API_URL = 'http://localhost:8000';

export async function submitValuation(formData) {
  const response = await fetch(`${API_URL}/api/valutazione`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // Step 1
      company_name:    formData.companyName,
      sector:          formData.sector,
      lifecycle:       formData.lifecycle,
      objective:       formData.objective,
      horizon:         formData.horizon,
      assets:          formData.assets,

      // Step 2
      revenue_y1:      parseFloat(formData.revenueY1),
      revenue_y2:      parseFloat(formData.revenueY2),
      revenue_y3:      parseFloat(formData.revenueY3),
      ebitda:          parseFloat(formData.ebitda),
      tech_investment_pct: parseFloat(formData.techInvestment),

      // Step 3
      recurring_revenue_pct:    parseFloat(formData.recurringRevenue),
      client_concentration_pct: parseFloat(formData.clientConcentration),
      founder_dependency:       parseInt(formData.founderDependency),
      management_structure:     parseInt(formData.managementStructure),
      digital_maturity:         parseInt(formData.digitalMaturity),
      client_portfolio_quality: parseInt(formData.clientPortfolio),
      business_model_scalability: parseInt(formData.scalability),
      network_partnership_strength: parseInt(formData.networkStrength),
    })
  });

  if (!response.ok) throw new Error('Errore API');
  return response.json();
}
```

**Risposta API attesa:**
```json
{
  "estimated_value": 1962468,
  "value_min": 1766221,
  "value_max": 2158715,
  "multiple_used": 5.5,
  "value_gap_pct": 88.3,
  "optimized_value": 3697226,
  "gap_absolute": 1734758,
  "scores": {
    "financial": 0.595,
    "technological": 0.5,
    "human": 0.3375,
    "relational": 0.27
  },
  "sqf": 0.9665,
  "gf": 0.66,
  "quality_score": 46,
  "risk_index": { "label": "MEDIUM", "color": "#fdcb6e" },
  "scalability_index": { "label": "MEDIUM", "color": "#fdcb6e" },
  "benchmarks": {
    "financial": 0.65,
    "technological": 0.55,
    "human": 0.60,
    "relational": 0.68
  },
  "gaps_vs_benchmark": {
    "financial": -0.055,
    "technological": -0.05,
    "human": -0.2625,
    "relational": -0.41
  },
  "top3_actions": [
    {
      "title": "Riduci la concentrazione clienti",
      "desc": "Porta i top-3 clienti sotto il 40% del fatturato.",
      "impact": 14,
      "capital": "financial",
      "horizon": "18–24 mesi",
      "sqf_delta": "+0.12 SQF"
    }
  ]
}
```

---

## DATI DEMO

Aggiungi un bottone "Carica Demo" visibile in ogni step che popola
automaticamente tutti i campi con questi valori:

```javascript
const DEMO = {
  companyName:         "Tecno Srl",
  sector:              "Servizi B2B",
  lifecycle:           "Crescita",
  objective:           "Ricerca investitori",
  horizon:             "3–5 anni",
  assets:              ["Marchio registrato"],
  revenueY1:           2800000,
  revenueY2:           3100000,
  revenueY3:           3500000,
  ebitda:              560000,
  techInvestment:      3.2,
  recurringRevenue:    35,
  clientConcentration: 55,
  founderDependency:   4,
  managementStructure: 3,
  digitalMaturity:     3,
  clientPortfolio:     2,
  scalability:         3,
  networkStrength:     2,
};
```

---

## COMPORTAMENTI UX CRITICI

1. **Validazione per step** — non si può avanzare senza aver compilato
   tutti i campi obbligatori dello step corrente. Mostra errori inline.

2. **Preview live Step 2** — EBITDA margin e CAGR si aggiornano in
   tempo reale mentre l'utente digita i ricavi.

3. **Preview score Step 3** — le barre Financial e Human si aggiornano
   in tempo reale mentre l'utente muove gli slider e le scale 1–5.

4. **Loading state** — durante la chiamata API mostra uno schermo
   intermedio con animazione (non un semplice spinner):
   ```
   Analisi in corso...
   ████████████████████░░░░  Normalizzazione dati
   ████████████████░░░░░░░░  Scoring 4 capitali
   ████████████░░░░░░░░░░░░  Valutazione finale
   ```

5. **Animazione dashboard** — quando arriva la risposta API:
   - Le KPI card appaiono con stagger (0, 100, 200, 300ms delay)
   - I numeri fanno counter animato da 0 al valore finale
   - Il radar chart si disegna progressivamente
   - Le action card scorrono dal basso verso l'alto

6. **Bottone "Nuova analisi"** — in basso nel dashboard, riporta
   allo Step 1 con tutti i campi azzerati.

7. **Responsive** — funziona su desktop (1280px+) e tablet (768px+).
   Su mobile il dashboard collassa in colonna singola.

---

## NOTE FINALI CRITICHE

- Il bottone "Carica Demo" deve essere sempre visibile — serve per
  la dimostrazione durante la presentazione alla giuria
- Il dashboard deve sembrare un **prodotto SaaS reale**, non un
  progetto universitario. È il criterio di valutazione con più peso.
- Tutti i numeri grandi (€, %) devono usare **JetBrains Mono** —
  dà autorevolezza ai dati
- Il radar chart deve mostrare **due aree sovrapposte**: valore
  attuale vs benchmark di settore — è il differenziatore visivo
  più forte del dashboard
- Non usare `alert()` o `console.log()` nel codice finale
- Commenta il codice in italiano per coerenza con il progetto
