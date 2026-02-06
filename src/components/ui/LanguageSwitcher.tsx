import { motion } from "framer-motion";
import { LANGUAGE_OPTIONS } from "@/lib/i18n";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ scrolled = false }: { scrolled?: boolean }) {
  const { language, setLanguage } = useLanguage();

  const containerClass = cn(
    "inline-flex rounded-xl overflow-hidden border text-xs font-semibold",
    scrolled ? "bg-muted border-border" : "bg-white/10 border-white/15"
  );

  const dividerClass = scrolled ? "divide-border" : "divide-white/15";

  return (
    <div className={cn(containerClass, "divide-x", dividerClass)} role="group" aria-label="Language switcher">
      {LANGUAGE_OPTIONS.map((opt) => {
        const active = language === opt.value;
        return (
          <motion.button
            key={opt.value}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setLanguage(opt.value)}
            className={cn(
              "px-3 h-10 flex items-center justify-center transition-colors",
              scrolled ? "text-foreground/80 hover:bg-muted/80" : "text-white/80 hover:bg-white/10",
              active && (scrolled ? "bg-background text-foreground" : "bg-white/20 text-white")
            )}
            aria-pressed={active}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}

