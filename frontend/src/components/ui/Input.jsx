import { forwardRef } from "react";

export const Input = forwardRef(({ label, error, className = "", rightIcon, ...props }, ref) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className="text-label text-[var(--color-text-secondary)]">{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={`w-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] rounded-md px-3 py-2 font-mono text-sm transition-all duration-200 input-glow placeholder-[var(--color-text-muted)] ${
            error ? "border-[var(--color-accent-danger)]" : ""
          } ${rightIcon ? "pr-10" : ""}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-[var(--color-accent-danger)] text-xs mt-1">{error.message}</span>}
    </div>
  );
});
Input.displayName = "Input";
