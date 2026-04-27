import { Slider, QualitativeScale } from "../ui";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { useLanguage } from "../../i18n";

export const Step3Questionnaire = ({ control, errors, watch }) => {
  const { t } = useLanguage();
  
  // Mock calculations for real-time preview
  const recurring = parseFloat(watch("recurringRevenue")) || 0;
  const concentration = parseFloat(watch("clientConcentration")) || 0;
  const founderDep = parseFloat(watch("founderDependency")) || 3;
  const management = parseFloat(watch("managementStructure")) || 3;
  const clientPortfolio = parseFloat(watch("clientPortfolio")) || 3;
  const digitalMaturity = parseFloat(watch("digitalMaturity")) || 3;
  const scalability = parseFloat(watch("scalability")) || 3;
  const networkStrength = parseFloat(watch("networkStrength")) || 3;

  // Simple normalization mocks for the preview bars
  const normConcentration = concentration > 70 ? 0.1 : concentration > 50 ? 0.3 : concentration > 35 ? 0.5 : concentration > 20 ? 0.8 : 1.0;
  const normRecurring = recurring < 10 ? 0.1 : recurring < 25 ? 0.3 : recurring < 50 ? 0.6 : recurring < 75 ? 0.8 : 1.0;

  const finScore = (0.25 * normRecurring + 0.20 * normConcentration + 0.30) / 0.75;
  const normFounderDep = (5 - founderDep) / 4;
  const normMgmt = (management - 1) / 4;
  const normPortfolio = (clientPortfolio - 1) / 4;
  const humScore = 0.40 * normFounderDep + 0.35 * normMgmt + 0.25 * normPortfolio;
  const normDigital = (digitalMaturity - 1) / 4;
  const normScalability = (scalability - 1) / 4;
  const techScore = (normDigital * 0.40 + normScalability * 0.25) / 0.65;
  const normNetwork = (networkStrength - 1) / 4;
  const relScore = normNetwork * 0.60 + normConcentration * 0.40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6"
    >
      {/* Left Column: Quantitative */}
      <div className="flex-1 flex flex-col gap-6 h-full">
        <div className="bento-card p-8 sm:p-10 flex flex-col gap-8 h-full">
          
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{t("s3TitleQuant")}</h2>
            <p className="text-[var(--color-text-secondary)]">{t("s3DescQuant")}</p>
          </div>

          <div className="flex flex-col gap-10 mt-4">
            <Controller
              name="recurringRevenue"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  label={t("s3RecRev")}
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="clientConcentration"
              control={control}
              defaultValue={0}
              rules={{ required: true }}
              render={({ field }) => (
                <Slider
                  label={t("s3Concentration")}
                  min={0}
                  max={100}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="mt-auto bg-[var(--color-bg-subtle)] p-6 rounded-xl border border-[var(--color-border-subtle)] flex flex-col gap-6">
            <h3 className="text-xs font-semibold text-[var(--color-text-secondary)] tracking-wider uppercase">{t("s3Preview")}</h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-text-primary)]">{t("capitalFin")}</span>
                  <span className="font-mono text-[var(--color-accent-second)]">{finScore.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[var(--color-accent-second)]" 
                    initial={{ width: 0 }} 
                    animate={{ width: `${finScore * 100}%` }} 
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-text-primary)]">{t("capitalHum")}</span>
                  <span className="font-mono text-[var(--color-accent-primary)]">{humScore.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--color-accent-primary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${humScore * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-text-primary)]">{t("capitalTech")}</span>
                  <span className="font-mono text-zinc-400">{techScore.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-zinc-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${techScore * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-[var(--color-text-primary)]">{t("capitalRel")}</span>
                  <span className="font-mono text-zinc-300">{relScore.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-bg-base)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-zinc-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${relScore * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Qualitative Scales */}
      <div className="flex-[1.5] bento-card p-8 sm:p-10 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text-primary)]">{t("s3TitleQual")}</h2>
          <p className="text-[var(--color-text-secondary)]">{t("s3DescQual")}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Controller
            name="founderDependency"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q1")}
                minLabel={t("s3Q1Min")}
                maxLabel={t("s3Q1Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="managementStructure"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q2")}
                minLabel={t("s3Q2Min")}
                maxLabel={t("s3Q2Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="digitalMaturity"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q3")}
                minLabel={t("s3Q3Min")}
                maxLabel={t("s3Q3Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="clientPortfolio"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q4")}
                minLabel={t("s3Q4Min")}
                maxLabel={t("s3Q4Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="scalability"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q5")}
                minLabel={t("s3Q5Min")}
                maxLabel={t("s3Q5Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="networkStrength"
            control={control}
            defaultValue="3"
            rules={{ required: true }}
            render={({ field }) => (
              <QualitativeScale
                label={t("s3Q6")}
                minLabel={t("s3Q6Min")}
                maxLabel={t("s3Q6Max")}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </motion.div>
  );
};
