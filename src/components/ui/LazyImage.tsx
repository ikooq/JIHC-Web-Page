import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
  blurDataUrl?: string;
  aspectRatio?: string;
}

const LazyImage = ({
  src,
  alt,
  className,
  placeholderColor = "bg-muted",
  blurDataUrl,
  aspectRatio = "aspect-video",
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
    }
  }, [isInView, src]);

  return (
    <div
      ref={imgRef}
      className={cn("relative overflow-hidden", aspectRatio, className)}
    >
      {/* Placeholder with blur effect */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "absolute inset-0",
          placeholderColor
        )}
      >
        {/* Blur placeholder */}
        {blurDataUrl && (
          <img
            src={blurDataUrl}
            alt=""
            className="w-full h-full object-cover blur-xl scale-110"
            aria-hidden="true"
          />
        )}
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
          />
        </div>

        {/* Pulse dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-accent/50"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Actual image */}
      <AnimatePresence>
        {imageSrc && (
          <motion.img
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src={imageSrc}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LazyImage;
