import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Play } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import { FloatingShapes } from "@/components/3d/FloatingShapes";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Link } from "react-router-dom";
import { useGoogleSheetsByField, useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { HeroData, StatData } from "@/lib/googleSheetsCMS";
import * as LucideIcons from "lucide-react";
import { GoogleSheetsStatus } from "@/components/ui/GoogleSheetsStatus";
import { useLanguage } from "@/hooks/useLanguage";
import { pickLocalized } from "@/lib/i18n";

const HeroSection = () => {
  const { language } = useLanguage();
  // Загрузить данные Hero из Google Sheets
  const { data: heroData, loading: heroLoading, error: heroError } = useGoogleSheetsByField<HeroData>("Hero", "main");
  
  // Загрузить статистику из Google Sheets
  const { data: statsData, loading: statsLoading, error: statsError } = useGoogleSheetsData<StatData>({
    sheetName: "Stats",
  });

  // Логирование для отладки
  useEffect(() => {
    console.log('[HeroSection] Hero data:', { heroData, heroLoading, heroError });
    console.log('[HeroSection] Stats data:', { statsData, statsLoading, statsError });
  }, [heroData, heroLoading, heroError, statsData, statsLoading, statsError]);

  // Fallback данные если Google Sheets не настроен
  const defaultHero: HeroData = {
    field: "main",
    title: "Powered by Quality\nCommitted to Excellence",
    subtitle: "We build secure, compliant, and user-friendly custom software for FinTech and Healthcare industries. Your vision, our expertise.",
    cta_primary_text: "Start Your Project",
    cta_primary_link: "/#contact",
    cta_secondary_text: "View Our Work",
    cta_secondary_link: "/cases",
    badge_text: "Trusted by FinTech & Healthcare Leaders",
    stats_value_1: "50+",
    stats_label_1: "Projects Delivered",
    stats_value_2: "98%",
    stats_label_2: "Client Satisfaction",
    stats_value_3: "10+",
    stats_label_3: "Years Experience",
  };

  const defaultStats = [
    { id: "1", value: "50+", label: "Projects Delivered", icon: "", order: "1" },
    { id: "2", value: "98%", label: "Client Satisfaction", icon: "", order: "2" },
    { id: "3", value: "10+", label: "Years Experience", icon: "Zap", order: "3" },
  ];

  // Всегда мержим с defaultHero, чтобы не было undefined при неполных данных из API
  const hero: HeroData = { ...defaultHero, ...(heroData && typeof heroData === "object" ? heroData : {}) };
  const stats = (statsData && statsData.length > 0 ? statsData : defaultStats)
    .sort((a, b) => parseInt(String(a.order || "0")) - parseInt(String(b.order || "0")))
    .slice(0, 3);

  // Локализованные значения (если в Google Sheets есть колонки вида title_ru, subtitle_kk и т.д.)
  const heroTitle = pickLocalized(hero as any, "title", language, defaultHero.title);
  const heroSubtitle = pickLocalized(hero as any, "subtitle", language, defaultHero.subtitle);
  const heroBadge = pickLocalized(hero as any, "badge_text", language, defaultHero.badge_text);
  const ctaPrimaryText = pickLocalized(hero as any, "cta_primary_text", language, defaultHero.cta_primary_text);
  const ctaSecondaryText = pickLocalized(hero as any, "cta_secondary_text", language, defaultHero.cta_secondary_text);

  // Логирование используемых данных
  useEffect(() => {
    if (!heroLoading) {
      if (heroData) {
        console.log('[HeroSection] ✅ Using Hero data FROM GOOGLE SHEETS:', heroData);
      } else {
        console.warn('[HeroSection] ⚠️ Using FALLBACK Hero data (Google Sheets not configured or empty)');
      }
    }
    
    if (!statsLoading) {
      if (statsData && statsData.length > 0) {
        console.log('[HeroSection] ✅ Using Stats data FROM GOOGLE SHEETS:', statsData);
      } else {
        console.warn('[HeroSection] ⚠️ Using FALLBACK Stats data (Google Sheets not configured or empty)');
      }
    }
  }, [heroData, heroLoading, statsData, statsLoading]);

  // Парсинг заголовка (поддержка \n для переноса строки), безопасно при отсутствии поля
  const titleLines = (heroTitle || defaultHero.title).split("\\n").filter(Boolean);
  
  // Получить иконку по имени
  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || null;
  };
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for different layers
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero"
    >
      {/* 3D Floating shapes with parallax */}
      <motion.div style={{ y: floatingY }} className="absolute inset-0">
        <FloatingShapes />
      </motion.div>

      {/* Animated gradient background with parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[80px]"
        />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <motion.div 
        style={{ y: contentY, opacity }}
        className="container relative z-10 px-4 md:px-6 py-20 md:py-32"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          {heroBadge && (
            <motion.div
              variants={fadeUpVariants}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-10 backdrop-blur-sm"
            >
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="font-medium">{heroBadge}</span>
            </motion.div>
          )}

          {/* Main headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight"
          >
            {titleLines.map((line, index) => (
              <span key={index}>
                {index > 0 && <br />}
                {line.includes("Quality") || line.includes("Excellence") ? (
                  <>
                    {line.split(/(Quality|Excellence)/).map((part, i) => 
                      part === "Quality" || part === "Excellence" ? (
                        <span key={i} className="text-gradient-premium">{part}</span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </>
                ) : (
                  line
                )}
              </span>
            ))}
            {titleLines.length === 1 && (
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <motion.path
                  d="M2 8.5C50 2.5 150 2.5 198 8.5"
                  stroke="url(#blue-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
              </motion.svg>
            )}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            {(heroSubtitle ?? "").split("\\n").filter(Boolean).map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {ctaPrimaryText && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to={hero.cta_primary_link || "/#contact"}>
                  <Button variant="cta" size="lg" className="group text-base px-8 py-6 shadow-2xl shadow-primary/40 hover:shadow-glow transition-all">
                    {ctaPrimaryText}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            )}
            {ctaSecondaryText && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to={hero.cta_secondary_link || "/cases"}>
                  <Button variant="heroOutline" size="lg" className="text-base px-8 py-6 backdrop-blur-sm group">
                    <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                    {ctaSecondaryText}
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-3 gap-6 md:gap-8 mt-20 pt-10 border-t border-white/10"
          >
            {stats.map((stat, index) => {
              const IconComponent = getIcon(stat.icon);
              const statValue = pickLocalized(stat as any, "value", language, String((stat as any).value ?? ""));
              const statLabel = pickLocalized(stat as any, "label", language, String((stat as any).label ?? ""));
              return (
                <motion.div
                  key={stat.id || index}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="text-center group cursor-default"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white flex items-center justify-center gap-2 group-hover:text-blue-300 transition-colors">
                    {IconComponent && <IconComponent className="w-7 h-7 text-blue-400" />}
                    <AnimatedCounter 
                      value={statValue} 
                      duration={2000} 
                      delay={index * 100}
                    />
                  </div>
                  <div className="text-sm md:text-base text-white/50 mt-2 font-medium group-hover:text-white/70 transition-colors">{statLabel}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scaleY: [1, 0.6, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-blue-400/60 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Google Sheets Status Indicators */}
      <GoogleSheetsStatus 
        sheetName="Hero" 
        data={heroData} 
        loading={heroLoading} 
        error={heroError || null} 
      />
      <GoogleSheetsStatus 
        sheetName="Stats" 
        data={statsData} 
        loading={statsLoading} 
        error={statsError || null} 
      />
    </section>
  );
};

export default HeroSection;
