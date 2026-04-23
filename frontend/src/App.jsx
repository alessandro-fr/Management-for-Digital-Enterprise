import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Step1Profile } from './components/steps/Step1Profile';
import { Step2Financials } from './components/steps/Step2Financials';
import { Step3Questionnaire } from './components/steps/Step3Questionnaire';
import { Step4Dashboard } from './components/steps/Step4Dashboard';
import { Button } from './components/ui';
import { submitValuation } from './hooks/useValuation';

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
  founderDependency:   "4",
  managementStructure: "3",
  digitalMaturity:     "3",
  clientPortfolio:     "2",
  scalability:         "3",
  networkStrength:     "2",
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [valuationResult, setValuationResult] = useState(null);

  const { register, control, handleSubmit, formState: { errors }, watch, reset, trigger } = useForm({
    mode: "onChange"
  });

  const loadDemoData = () => {
    reset(DEMO);
  };

  const handleNext = async () => {
    // Validate current step fields before progressing
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = ['companyName', 'sector', 'lifecycle', 'objective', 'horizon'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['revenueY1', 'revenueY2', 'revenueY3', 'ebitda', 'techInvestment'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['recurringRevenue', 'clientConcentration', 'founderDependency', 'managementStructure', 'digitalMaturity', 'clientPortfolio', 'scalability', 'networkStrength'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 3) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 4) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    setLoadingPhase(0);

    // Simulate multi-step loading animation
    const phases = [
      "Normalizzazione dati",
      "Scoring 4 capitali",
      "Valutazione finale"
    ];
    
    // Increment phase every 800ms
    const interval = setInterval(() => {
      setLoadingPhase((p) => Math.min(p + 1, 2));
    }, 800);

    try {
      // In a real environment, submitValuation will trigger fetch API
      // We wrap in a promise to showcase the loader properly
      let result;
      try {
        result = await submitValuation(data);
      } catch (e) {
        // Mock fallback if api fails or is not present locally
        console.warn("Backend not found, using Mock data");
        await new Promise(resolve => setTimeout(resolve, 2400));
        result = {
          "estimated_value": 1962468,
          "value_min": 1766221,
          "value_max": 2158715,
          "multiple_used": 5.5,
          "value_gap_pct": 88.3,
          "optimized_value": 3697226,
          "gap_absolute": 1734758,
          "scores": { "financial": 0.595, "technological": 0.5, "human": 0.3375, "relational": 0.27 },
          "sqf": 0.9665,
          "gf": 0.66,
          "quality_score": 46,
          "risk_index": { "label": "MEDIUM", "color": "#fdcb6e" },
          "benchmarks": { "financial": 0.65, "technological": 0.55, "human": 0.60, "relational": 0.68 },
          "gaps_vs_benchmark": { "financial": -0.055, "technological": -0.05, "human": -0.2625, "relational": -0.41 },
          "top3_actions": [
            { "title": "Riduci la concentrazione clienti", "desc": "Porta i top-3 clienti sotto il 40% del fatturato.", "impact": 14, "capital": "financial", "horizon": "18–24 mesi", "sqf_delta": "+0.12 SQF" },
            { "title": "Sviluppa partnership strategiche", "desc": "Costruisci un ecosistema di partner certificati", "impact": 10, "capital": "relational", "horizon": "12-18 mesi", "sqf_delta": "+0.08 SQF" },
            { "title": "Accelera maturità digitale", "desc": "Digitalizza processi core", "impact": 8, "capital": "technological", "horizon": "18–24 mesi", "sqf_delta": "+0.05 SQF" }
          ]
        };
      }
      
      clearInterval(interval);
      setValuationResult(result);
      setCurrentStep(4);
    } catch (error) {
      console.error(error);
      clearInterval(interval);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    reset({});
    setValuationResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] font-body flex flex-col">
      <Header currentStep={currentStep} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10"
            >
              <div className="w-full max-w-md bg-[var(--color-bg-elevated)] p-8 rounded-xl border border-[var(--color-border-subtle)] shadow-[var(--shadow-glow-primary)]">
                <h2 className="text-xl font-display font-bold mb-6 text-center text-[var(--color-text-primary)]">Analisi in corso...</h2>
                <div className="flex flex-col gap-4 font-mono text-xs">
                  {["Normalizzazione dati", "Scoring 4 capitali", "Valutazione finale"].map((phase, idx) => (
                    <div key={phase} className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className={idx <= loadingPhase ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-muted)]"}>
                          {phase}
                        </span>
                        <span>{idx < loadingPhase ? "100%" : idx === loadingPhase ? "Caricamento..." : "0%"}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden relative">
                        <motion.div 
                          className="absolute h-full bg-[var(--color-accent-primary)]" 
                          initial={{ width: 0 }} 
                          animate={{ width: idx < loadingPhase ? "100%" : idx === loadingPhase ? "60%" : "0%" }} 
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full pb-20">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <Step1Profile key="step1" register={register} control={control} errors={errors} />
                )}
                {currentStep === 2 && (
                  <Step2Financials key="step2" register={register} control={control} errors={errors} watch={watch} />
                )}
                {currentStep === 3 && (
                  <Step3Questionnaire key="step3" control={control} errors={errors} watch={watch} />
                )}
                {currentStep === 4 && (
                  <Step4Dashboard key="step4" result={valuationResult} onReset={handleReset} />
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </main>

      {!isLoading && currentStep < 4 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--color-bg-base)]/80 backdrop-blur-md border-t border-[var(--color-border-subtle)] p-4 flex justify-between items-center z-40">
          <div className="max-w-7xl mx-auto w-full flex justify-between px-6">
            <Button variant="ghost" onClick={loadDemoData} className="!text-[var(--color-accent-second)] text-sm">
              Carica Demo
            </Button>
            <div className="flex gap-4">
              {currentStep > 1 && (
                <Button variant="secondary" onClick={handleBack}>
                  Indietro
                </Button>
              )}
              <Button variant="primary" onClick={handleNext}>
                {currentStep === 3 ? "Analizza" : "Avanti"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
