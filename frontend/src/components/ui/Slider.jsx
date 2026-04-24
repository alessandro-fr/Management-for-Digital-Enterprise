import { forwardRef } from "react";

export const Slider = forwardRef(({ label, error, min = 0, max = 100, step = 1, showValue = true, unit = "%", className = "", ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-label text-[var(--color-text-secondary)]">{label}</label>
          {showValue && <span className="font-mono text-sm text-[var(--color-accent-primary)]">{props.value || 0}{unit}</span>}
        </div>
      )}
      <input
        type="range"
        ref={ref}
        min={min}
        max={max}
        step={step}
        className="w-full h-1 bg-[var(--color-border-subtle)] rounded appearance-none cursor-pointer accent-[var(--color-accent-primary)] hover:accent-[var(--color-accent-second)] transition-all duration-200"
        {...props}
      />
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--color-accent-primary);
          box-shadow: var(--shadow-glow-primary);
          cursor: pointer;
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
      `}</style>
      {error && <span className="text-[var(--color-accent-danger)] text-xs">{error.message}</span>}
    </div>
  );
});
Slider.displayName = "Slider";
