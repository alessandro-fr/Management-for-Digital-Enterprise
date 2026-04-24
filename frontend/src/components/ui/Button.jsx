import { motion } from "framer-motion";

export const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "relative px-4 py-2 font-body font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";
  
  const variants = {
    primary: "bg-white/40 backdrop-blur-md border border-white/80 border-b-black/10 text-[var(--color-accent-primary)] shadow-sm hover:bg-white/60 hover:shadow hover:border-black/10",
    secondary: "bg-black/5 backdrop-blur-md border border-black/5 text-[var(--color-text-primary)] shadow-sm hover:bg-black/10 hover:border-black/10",
    ghost: "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
