import { Controller } from "react-hook-form";
import { Input, Select } from "../ui";
import { Briefcase, Building2, Cpu, Cross, ShoppingCart, Activity, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";

const SECTOR_OPTIONS = [
  { value: "Tecnologia/SaaS", label: "Tecnologia/SaaS", icon: <Cpu size={16} /> },
  { value: "Servizi B2B", label: "Servizi B2B", icon: <Briefcase size={16} /> },
  { value: "Manifatturiero", label: "Manifatturiero", icon: <Building2 size={16} /> },
  { value: "Healthcare", label: "Healthcare", icon: <Cross size={16} /> },
  { value: "Retail/GDO", label: "Retail/GDO", icon: <ShoppingCart size={16} /> },
  { value: "Edilizia/Immobiliare", label: "Edilizia/Immobiliare", icon: <Activity size={16} /> },
  { value: "Altro", label: "Altro", icon: <LayoutGrid size={16} /> },
];

export const Step1Profile = ({ register, control, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto flex flex-col gap-8 bg-[var(--color-bg-elevated)] backdrop-blur-md p-8 rounded-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-second)]" />
      
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">Profilo Aziendale</h2>
        <p className="text-[var(--color-text-secondary)] text-sm">Inserisci i dati anagrafici e di contesto strategico per inquadrare il modello valutativo.</p>
      </div>

      <div className="flex flex-col gap-6">
        <Input
          label="NOME AZIENDA"
          placeholder="es. Tecno Srl"
          error={errors.companyName}
          {...register("companyName", { required: "Il nome azienda è obbligatorio" })}
        />

        <Controller
          name="sector"
          control={control}
          rules={{ required: "Seleziona un settore" }}
          render={({ field }) => (
            <Select
              label="SETTORE"
              placeholder="Seleziona settore..."
              options={SECTOR_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.sector}
            />
          )}
        />

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">FASE CICLO DI VITA</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["Startup", "Crescita", "Maturità", "Declino"].map((lifecycle) => (
              <label key={lifecycle} className="relative cursor-pointer">
                <input
                  type="radio"
                  value={lifecycle}
                  className="peer sr-only"
                  {...register("lifecycle", { required: "Seleziona la fase del ciclo di vita" })}
                />
                <div className="w-full py-3 px-4 text-center rounded-[6px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] transition-all peer-checked:border-[var(--color-accent-primary)] peer-checked:bg-[var(--color-accent-primary)]/10 peer-checked:text-[var(--color-accent-primary)] peer-checked:shadow-[var(--shadow-glow-primary)] hover:border-[var(--color-border-active)]">
                  <span className="text-sm font-medium">{lifecycle}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.lifecycle && <span className="text-[var(--color-accent-danger)] text-xs">{errors.lifecycle.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">OBIETTIVO DELL'IMPRENDITORE</label>
          <div className="flex flex-col gap-2">
            {[
              "Crescita organica",
              "Ricerca investitori",
              "Preparazione exit/vendita",
              "Passaggio generazionale",
              "Stabilità"
            ].map((obj) => (
              <label key={obj} className="relative cursor-pointer group flex items-center p-4 rounded-[6px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-active)] transition-colors">
                <div className="flex items-center gap-4 w-full">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <input
                      type="radio"
                      value={obj}
                      className="peer sr-only"
                      {...register("objective", { required: "Seleziona un obiettivo" })}
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-[var(--color-border-subtle)] peer-checked:border-[var(--color-accent-primary)] transition-colors" />
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-[var(--color-accent-primary)] opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[var(--color-text-primary)] font-medium text-sm transition-colors group-hover:text-[var(--color-accent-primary)]">{obj}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.objective && <span className="text-[var(--color-accent-danger)] text-xs">{errors.objective.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">ORIZZONTE TEMPORALE</label>
          <div className="flex rounded-[6px] border border-[var(--color-border-subtle)] overflow-hidden bg-[var(--color-bg-surface)]">
            {["1–2 anni", "3–5 anni", "5+ anni"].map((horizon) => (
              <label key={horizon} className="flex-1 relative cursor-pointer group">
                <input
                  type="radio"
                  value={horizon}
                  className="peer sr-only"
                  {...register("horizon", { required: "Seleziona l'orizzonte temporale" })}
                />
                <div className="w-full py-3 text-center border-r border-[var(--color-border-subtle)] last:border-r-0 peer-checked:bg-[var(--color-accent-primary)]/20 peer-checked:text-[var(--color-text-primary)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-subtle)]">
                  <span className="text-sm font-medium">{horizon}</span>
                </div>
              </label>
            ))}
          </div>
          {errors.horizon && <span className="text-[var(--color-accent-danger)] text-xs">{errors.horizon.message}</span>}
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-label text-[var(--color-text-secondary)]">ASSET DISTINTIVI (MULTICHECK)</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-[var(--color-border-subtle)] rounded-[6px] bg-[var(--color-bg-surface)]">
            {[
              "Brevetti/IP",
              "Marchio registrato",
              "Software proprietario",
              "Contratti pluriennali",
            ].map((asset) => (
              <label key={asset} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    value={asset}
                    className="peer sr-only"
                    {...register("assets")}
                  />
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[var(--color-border-subtle)] peer-checked:border-[var(--color-accent-primary)] peer-checked:bg-[var(--color-accent-primary)] transition-colors flex items-center justify-center">
                    <svg className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{asset}</span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
