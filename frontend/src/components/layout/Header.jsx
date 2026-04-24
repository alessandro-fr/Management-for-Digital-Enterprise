import { StepIndicator } from "./StepIndicator";

export const Header = ({ currentStep }) => {
  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        background: "rgba(249, 250, 251, 0.30)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow:
          "0 1px 0 0 rgba(0,0,0,0.06), inset 0 1px 0 0 rgba(255,255,255,0.8)",
      }}
    >
      {/* subtle top shimmer line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0.9) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col">
            <h1 className="font-display font-bold text-2xl tracking-wide text-[var(--color-accent-primary)]">
              VALUE INTELLIGENCE
            </h1>
            <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-mono mt-0.5">
              Platform
            </span>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <StepIndicator currentStep={currentStep} />
          </div>
        </div>
      </div>
    </header>
  );
};
