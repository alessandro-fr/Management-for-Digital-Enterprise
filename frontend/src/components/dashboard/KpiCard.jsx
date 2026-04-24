import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const KpiCard = ({ title, value, subtitle, footer, delay = 0, variant = "primary" }) => {
  const [count, setCount] = useState(0);
  // Numeric extraction for animating if value is a string like "€ 1.96M"
  const numericMatch = typeof value === "string" ? value.match(/^([^0-9]*)(-?[0-9]*\.?[0-9]+)(.*)$/) : null;
  const isNumericStr = numericMatch !== null;
  const numToAnimate = isNumericStr ? parseFloat(numericMatch[2]) : typeof value === "number" ? value : null;
  const prefix = isNumericStr ? numericMatch[1] : "";
  const suffix = isNumericStr ? numericMatch[3] : "";
  // Preserve the exact decimal places of the target value throughout the animation
  const decimals = numericMatch?.[2].includes(".") ? numericMatch[2].split(".")[1].length : 0;

  useEffect(() => {
    if (numToAnimate === null) return;
    const end = numToAnimate;
    const duration = 1000;
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const t = setTimeout(() => requestAnimationFrame(animate), delay * 1000 + 100);
    return () => clearTimeout(t);
  }, [numToAnimate, delay]);

  const displayValue = numToAnimate !== null
    ? `${prefix}${count.toFixed(decimals)}${suffix}`
    : value;

  const colorVariants = {
    primary: "text-[var(--color-accent-primary)]",
    secondary: "text-[var(--color-accent-second)]",
    warning: "text-[var(--color-accent-warn)]",
    danger: "text-[var(--color-accent-danger)]",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-[var(--color-bg-elevated)] backdrop-blur-md p-6 rounded-md border border-[var(--color-border-subtle)] shadow-[var(--shadow-card)] flex flex-col gap-2 hover:border-[var(--color-border-active)] transition-colors"
    >
      <h3 className="text-label text-[var(--color-text-secondary)]">{title}</h3>
      <div className={`font-mono text-3xl font-bold ${colorVariants[variant]}`}>
        {displayValue}
      </div>
      {subtitle && <p className="text-sm text-[var(--color-text-primary)] mt-1">{subtitle}</p>}
      {footer && <p className="text-xs text-[var(--color-text-muted)] mt-1">{footer}</p>}
    </motion.div>
  );
};
