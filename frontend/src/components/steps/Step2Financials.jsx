import { Input, Slider } from "../ui";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";

export const Step2Financials = ({ register, control, errors, watch }) => {
  const rev1 = parseFloat(watch("revenueY1")) || 0;
  const rev3 = parseFloat(watch("revenueY3")) || 0;
  const ebitda = parseFloat(watch("ebitda")) || 0;

  // CAGR calculation: ( (Rev3 / Rev1)^(1/2) ) - 1
  let cagr = 0;
  if (rev1 > 0 && rev3 > 0) {
    cagr = (Math.pow(rev3 / rev1, 0.5) - 1) * 100;
  }
  
  // EBITDA Margin calculation: EBITDA / Rev3
  let margin = 0;
  if (rev3 > 0 && ebitda > 0) {
    margin = (ebitda / rev3) * 100;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8"
    >
      {/* Left Column: Form Inputs */}
      <div className="flex-1 flex flex-col gap-6 bg-[var(--color-bg-elevated)] backdrop-blur-md p-8 rounded-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] relative overflow-hidden">
        
        <div className="flex flex-col gap-2 mb-2">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Dati di Bilancio</h2>
          <p className="text-[var(--color-text-secondary)] text-sm">Inserisci i dati oggettivi verificabili dal bilancio aziendale.</p>
        </div>

        <div className="flex flex-col gap-5">
          <Input
            label="REVENUE ANNO 1 (€)"
            type="number"
            placeholder="0"
            rightIcon="€"
            error={errors.revenueY1}
            {...register("revenueY1", { required: "Campo obbligatorio", min: { value: 1, message: "Deve essere > 0" } })}
          />
          <Input
            label="REVENUE ANNO 2 (€)"
            type="number"
            placeholder="0"
            rightIcon="€"
            error={errors.revenueY2}
            {...register("revenueY2", { required: "Campo obbligatorio", min: { value: 1, message: "Deve essere > 0" } })}
          />
          <Input
            label="REVENUE ANNO 3 (€) - Più recente"
            type="number"
            placeholder="0"
            rightIcon="€"
            error={errors.revenueY3}
            {...register("revenueY3", { required: "Campo obbligatorio", min: { value: 1, message: "Deve essere > 0" } })}
          />
          <Input
            label="EBITDA (€) - Anno 3"
            type="number"
            placeholder="0"
            rightIcon="€"
            error={errors.ebitda}
            {...register("ebitda", { required: "Campo obbligatorio" })}
          />
        </div>
      </div>

      {/* Right Column: Preview & Slider */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="bg-[var(--color-bg-surface)] backdrop-blur-md p-6 rounded-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-6">
          <h3 className="font-mono text-sm tracking-widest text-[var(--color-text-secondary)]">PREVIEW CALCOLATA</h3>
          
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-text-primary)] text-sm font-medium">EBITDA Margin</span>
              <span className="font-mono text-xl font-bold text-[var(--color-accent-second)]">{margin.toFixed(1)}%</span>
            </div>
            
            <div className="flex justify-between items-end border-b border-[var(--color-border-subtle)] pb-2">
              <span className="text-[var(--color-text-primary)] text-sm font-medium">Revenue CAGR</span>
              <span className="font-mono text-xl font-bold text-[var(--color-accent-second)]">{cagr.toFixed(1)}%</span>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-bg-base)] rounded-md border border-[var(--color-border-subtle)]">
            <p className="text-xs text-[var(--color-text-muted)] italic">
              Calcolato automaticamente dai dati inseriti (CAGR su 3 anni).
            </p>
          </div>
        </div>

        <div className="bg-[var(--color-bg-elevated)] backdrop-blur-md p-6 rounded-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)]">
          <h3 className="font-mono text-sm tracking-widest text-[var(--color-text-secondary)] mb-4">DATO IBRIDO</h3>
          <Controller
            name="techInvestment"
            control={control}
            defaultValue={5}
            rules={{ required: true }}
            render={({ field }) => (
              <Slider
                label="Tech Investment / Revenue %"
                min={0}
                max={20}
                step={0.1}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="text-xs text-[var(--color-text-muted)] mt-4">
            * Dato dichiarato — da validare in seguito con i bilanci
          </p>
        </div>
      </div>
    </motion.div>
  );
};
