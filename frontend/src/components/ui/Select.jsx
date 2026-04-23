import { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Select = forwardRef(({ label, options, value, onChange, error, placeholder = "Seleziona...", className = "" }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`flex flex-col gap-1 w-full relative ${className}`} ref={containerRef}>
      {label && <label className="text-label text-[var(--color-text-secondary)]">{label}</label>}
      <div
        className={`w-full bg-[var(--color-bg-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] rounded-[2px] px-3 py-2 flex items-center justify-between cursor-pointer transition-all duration-200 hover:border-[var(--color-border-active)] ${
          isOpen ? "border-[var(--color-accent-primary)] shadow-[var(--shadow-glow-primary)]" : ""
        } ${error ? "border-[var(--color-accent-danger)]" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          {selectedOption ? (
            <>
              {selectedOption.icon && <span className="text-[var(--color-text-secondary)]">{selectedOption.icon}</span>}
              <span>{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-[var(--color-text-muted)]">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={16} className={`text-[var(--color-text-secondary)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-10 top-[calc(100%+4px)] left-0 w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] rounded-[6px] shadow-[var(--shadow-card)] overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-colors duration-150 hover:bg-[var(--color-bg-subtle)] ${
                  opt.value === value ? "text-[var(--color-accent-primary)] bg-[var(--color-bg-subtle)]" : "text-[var(--color-text-primary)]"
                }`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                <div className="w-4 flex items-center justify-center">
                  {opt.value === value && <Check size={14} />}
                </div>
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && <span className="text-[var(--color-accent-danger)] text-xs mt-1">{error.message}</span>}
    </div>
  );
});
Select.displayName = "Select";
