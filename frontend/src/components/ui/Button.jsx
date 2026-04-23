import { motion } from "framer-motion";

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "relative px-4 py-2 font-body font-medium rounded-[6px] transition-all duration-200 focus:outline-[var(--color-accent-primary)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--color-accent-primary)] text-black hover:shadow-[var(--shadow-glow-primary)] border border-transparent hover:border-white/20",
    secondary: "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-active)]",
    ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
