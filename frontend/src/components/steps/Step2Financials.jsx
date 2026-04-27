import { Input, Slider } from "../ui";
import { motion } from "framer-motion";
import { Controller } from "react-hook-form";
import { useLanguage } from "../../i18n";

export const Step2Financials = ({ register, control, errors, watch }) => {
  const { t } = useLanguage();
  
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6"
    >
      {/* Left Column: Form Inputs */}
      <div className="flex flex-col gap-8 bento-card p-8 sm:p-10">
        
        <div className="flex flex-col gap-2 mb-2">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{t("s2Title")}</h2>
          <p className="text-[var(--color-text-secondary)]">{t("s2Desc")}</p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            label={t("s2Rev1")}
            type="number"
            placeholder="0"
            rightIcon={<span className="text-[var(--color-text-muted)] text-sm">€</span>}
            error={errors.revenueY1}
            {...register("revenueY1", { required: t("s2Req"), min: { value: 1, message: t("s2Min") } })}
          />
          <Input
            label={t("s2Rev2")}
            type="number"
            placeholder="0"
            rightIcon={<span className="text-[var(--color-text-muted)] text-sm">€</span>}
            error={errors.revenueY2}
            {...register("revenueY2", { required: t("s2Req"), min: { value: 1, message: t("s2Min") } })}
          />
          <Input
            label={t("s2Rev3")}
            type="number"
            placeholder="0"
            rightIcon={<span className="text-[var(--color-text-muted)] text-sm">€</span>}
            error={errors.revenueY3}
            {...register("revenueY3", { required: t("s2Req"), min: { value: 1, message: t("s2Min") } })}
          />
          <Input
            label={t("s2Ebitda")}
            type="number"
            placeholder="0"
            rightIcon={<span className="text-[var(--color-text-muted)] text-sm">€</span>}
            error={errors.ebitda}
            {...register("ebitda", { required: t("s2Req") })}
          />
        </div>
      </div>

      {/* Right Column: Preview & Slider */}
      <div className="flex flex-col gap-6">
        <div className="bento-card p-8 flex flex-col gap-8">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">{t("s2Preview")}</h3>
          
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-4">
              <span className="text-[var(--color-text-primary)] font-medium">EBITDA Margin</span>
              <span className="font-mono text-3xl font-bold tracking-tighter text-[var(--color-text-primary)]">{margin.toFixed(1)}<span className="text-lg text-[var(--color-text-muted)]">%</span></span>
            </div>
            
            <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-4">
              <span className="text-[var(--color-text-primary)] font-medium">Revenue CAGR</span>
              <span className="font-mono text-3xl font-bold tracking-tighter text-[var(--color-text-primary)]">{cagr.toFixed(1)}<span className="text-lg text-[var(--color-text-muted)]">%</span></span>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-bg-subtle)] rounded-xl text-center">
            <p className="text-xs text-[var(--color-text-secondary)]">
              {t("s2PreviewDesc")}
            </p>
          </div>
        </div>

        <div className="bento-card p-8 flex flex-col gap-6">
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">{t("s2Hybrid")}</h3>
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
          <p className="text-xs text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
            {t("s2HybridDesc")}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
