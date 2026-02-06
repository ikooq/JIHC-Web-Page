import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { fadeUpVariants, staggerContainer, viewportSettings } from "@/lib/animations";
import { useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { useCopy } from "@/hooks/useCopy";
import { useLanguage } from "@/hooks/useLanguage";
import { TestimonialData } from "@/lib/googleSheetsCMS";
import { pickLocalized } from "@/lib/i18n";

const defaultTestimonials: TestimonialData[] = [
  {
    id: "1",
    quote: "Auxility delivered our banking platform ahead of schedule with exceptional attention to security. Their FinTech expertise saved us months of development time.",
    author: "Sarah Chen",
    role: "CTO, Digital Banking Startup",
    company: "FinanceFlow",
    active: "TRUE",
  },
  {
    id: "2",
    quote: "The telemedicine solution they built has transformed how we deliver care. Patient satisfaction increased by 40% within the first quarter.",
    author: "Dr. Michael Roberts",
    role: "Chief Medical Officer",
    company: "Regional Health Network",
    active: "TRUE",
  },
  {
    id: "3",
    quote: "Working with Auxility felt like having an in-house team. They understood our compliance requirements from day one and delivered a HIPAA-compliant solution.",
    author: "Emily Watson",
    role: "VP of Technology",
    company: "MedTech Solutions",
    active: "TRUE",
  },
];

const TestimonialsSection = () => {
  const { get } = useCopy();
  const { language } = useLanguage();
  const { data: testimonialsData, loading, error } = useGoogleSheetsData<TestimonialData>({
    sheetName: "Testimonials",
  });

  // Логирование для отладки
  useEffect(() => {
    console.log('[TestimonialsSection] Testimonials data:', { testimonialsData, loading, error });
    console.log('[TestimonialsSection] Using data:', testimonialsData && testimonialsData.length > 0 ? 'FROM GOOGLE SHEETS ✅' : 'FALLBACK DATA ⚠️');
  }, [testimonialsData, loading, error]);

  // Фильтровать только активные отзывы
  const testimonials = (
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData.filter((t) => t.active === "TRUE" || t.active === "true" || t.active === "1")
      : defaultTestimonials.filter((t) => t.active === "TRUE")
  ).map((t) => ({
    ...t,
    quote: pickLocalized(t as any, "quote", language, t.quote),
    role: pickLocalized(t as any, "role", language, t.role),
    company: pickLocalized(t as any, "company", language, t.company),
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-accent/5 to-transparent rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 tracking-wide"
          >
            {get("testimonials_badge")}
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            {get("testimonials_heading")}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            {get("testimonials_subheading")}
          </motion.p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-card rounded-3xl border border-border p-10 md:p-14 shadow-2xl shadow-accent/5">
            {/* Quote icon */}
            <div className="absolute top-8 right-8 md:top-10 md:right-10">
              <Quote className="w-14 h-14 md:w-20 md:h-20 text-accent/10" />
            </div>

            {/* Testimonial content */}
            {testimonials.length > 0 && (
              <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <p className="text-xl md:text-2xl lg:text-3xl text-foreground font-medium leading-relaxed mb-10 pr-12">
                      "{testimonials[activeIndex]?.quote || ""}"
                    </p>

                    <div className="flex items-center gap-5">
                      {/* Avatar */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center text-accent-foreground font-display font-bold text-xl shadow-lg shadow-accent/25"
                      >
                        {testimonials[activeIndex]?.author?.split(" ").map((n: string) => n[0]).join("") || ""}
                      </motion.div>
                      
                      <div>
                        <div className="font-display font-bold text-foreground text-lg">
                          {testimonials[activeIndex]?.author || ""}
                        </div>
                        <div className="text-muted-foreground">
                          {testimonials[activeIndex]?.role || ""}, {testimonials[activeIndex]?.company || ""}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-10 bg-accent"
                        : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToPrevious}
                  className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goToNext}
                  className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
