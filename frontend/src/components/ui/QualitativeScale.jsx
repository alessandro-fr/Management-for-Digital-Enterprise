import { forwardRef } from "react";

export const QualitativeScale = forwardRef(({ label, minLabel, maxLabel, error, className = "", value, onChange, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-3 w-full p-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-[6px] transition-colors hover:border-[var(--color-border-active)] ${className}`}>
      {label && <label className="text-[var(--color-text-primary)] font-medium text-sm">{label}</label>}
      <div className="flex flex-col gap-2">
        <div className="relative flex justify-between items-center w-full px-2">
          {/* Track background */}
          <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-[var(--color-bg-subtle)] -translate-y-1/2 z-0" />
          
          {[1, 2, 3, 4, 5].map((val) => {
            const isSelected = String(value) === String(val);
            return (
              <label key={val} className="relative z-10 flex flex-col items-center cursor-pointer group">
                <input
                  type="radio"
                  ref={ref}
                  value={val}
                  checked={isSelected}
                  onChange={onChange}
                  className="sr-only"
                  {...props}
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)] shadow-[var(--shadow-glow-primary)] scale-125"
                      : "border-[var(--color-text-muted)] bg-[var(--color-bg-surface)] group-hover:border-[var(--color-text-secondary)]"
                  }`}
                />
                <span className={`mt-2 text-xs font-mono transition-colors ${isSelected ? "text-[var(--color-accent-primary)]" : "text-[var(--color-text-muted)]"}`}>{val}</span>
              </label>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
          <span className="w-1/3 text-left">{minLabel}</span>
          <span className="w-1/3 text-right">{maxLabel}</span>
        </div>
      </div>
      {error && <span className="text-[var(--color-accent-danger)] text-xs mt-1">{error.message}</span>}
    </div>
  );
});
QualitativeScale.displayName = "QualitativeScale";
