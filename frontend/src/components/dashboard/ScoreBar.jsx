import { motion } from "framer-motion";
import { useLanguage } from "../../i18n";

export const ScoreBar = ({ capital, actual, benchmark, gap }) => {
  const isPositive = gap >= 0;
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center text-sm">
        <span className="font-semibold text-[var(--color-text-primary)]">{capital}</span>
        <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded-md ${isPositive ? "bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)]" : "bg-red-50 text-red-600"}`}>
          {isPositive ? "+" : ""}{(gap * 100).toFixed(1)}% vs Bench
        </span>
      </div>
      
      <div className="relative h-2 w-full bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--color-accent-primary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${actual * 100}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-border-active)] z-10 rounded-full"
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: `${benchmark * 100}%`, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="absolute -top-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-border-active)]" />
        </motion.div>
      </div>
    </div>
  );
};
