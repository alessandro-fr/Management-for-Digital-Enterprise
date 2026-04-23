import { motion } from "framer-motion";

export const ActionCard = ({ index, action, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-elevated)] hover:border-[var(--color-border-active)] transition-all group flex flex-col gap-3 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-accent-second)] opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3">
          <span className="font-mono font-bold text-[var(--color-text-muted)] text-xl leading-none pt-0.5">
            {String(index).padStart(2, "0")}
          </span>
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-[var(--color-text-primary)] text-md">{action.title}</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{action.desc}</p>
          </div>
        </div>
        
        <div className="px-2 py-1 rounded bg-[var(--color-accent-second)]/20 border border-[var(--color-accent-second)]/30 text-[var(--color-accent-second)] font-mono text-sm font-bold whitespace-nowrap shadow-[var(--shadow-glow-success)]">
          +{action.impact}% V
        </div>
      </div>
      
      <div className="pl-10 mt-1 flex flex-wrap items-center gap-4 text-xs text-[var(--color-text-muted)]">
        <span className="font-mono">{action.horizon}</span>
        <span>&bull;</span>
        <span className="font-mono text-[var(--color-accent-primary)]">{action.sqf_delta}</span>
        <span>&bull;</span>
        <span className="uppercase tracking-wider">{action.capital} Capital</span>
      </div>
    </motion.div>
  );
};
