import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
}

export const useCountUp = ({
  end,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
}: UseCountUpOptions) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const tick = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }

      if (now >= endTime) {
        setCount(end);
        return;
      }

      const progress = (now - startTime) / duration;
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easedProgress * end));
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, end, duration, delay]);

  const displayValue = `${prefix}${count}${suffix}`;

  return { ref, displayValue, count };
};

// Parse stat values like "50+", "98%", "10+"
export const parseStatValue = (value: string): { number: number; suffix: string; prefix: string } => {
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);
  if (match) {
    return {
      prefix: match[1] || "",
      number: parseInt(match[2], 10),
      suffix: match[3] || "",
    };
  }
  return { number: 0, suffix: "", prefix: "" };
};
