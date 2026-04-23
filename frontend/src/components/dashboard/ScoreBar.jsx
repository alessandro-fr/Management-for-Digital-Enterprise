import { motion } from "framer-motion";

export const ScoreBar = ({ capital, actual, benchmark, gap }) => {
  const isPositive = gap >= 0;
  
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-end">
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{capital}</span>
        <span className={`font-mono text-xs ${isPositive ? "text-[var(--color-accent-second)]" : "text-[var(--color-accent-danger)]"}`}>
          {isPositive ? "+" : ""}{(gap * 100).toFixed(1)}% vs Bench
        </span>
      </div>
      
      <div className="relative h-4 w-full bg-[var(--color-bg-subtle)] rounded-sm overflow-hidden">
        {/* Actual Bar */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-[var(--color-accent-primary)] opacity-80"
          initial={{ width: 0 }}
          animate={{ width: `${actual * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Benchmark Marker */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-[var(--color-text-primary)] z-10"
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: `${benchmark * 100}%`, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="absolute -top-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)]" />
        </motion.div>
      </div>
    </div>
  );
};
