import { motion } from "framer-motion";
import { useCountUp, parseStatValue } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export const AnimatedCounter = ({ 
  value, 
  className = "", 
  duration = 2000,
  delay = 0 
}: AnimatedCounterProps) => {
  const { number, suffix, prefix } = parseStatValue(value);
  const { ref, displayValue } = useCountUp({
    end: number,
    duration,
    delay,
    suffix,
    prefix,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {displayValue}
    </motion.div>
  );
};
