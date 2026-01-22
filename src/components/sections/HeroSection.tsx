import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Play } from "lucide-react";
import { fadeUpVariants, staggerContainer } from "@/lib/animations";
import { FloatingShapes } from "@/components/3d/FloatingShapes";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Link } from "react-router-dom";

const HeroSection = () => {
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
          <motion.div
            variants={fadeUpVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm mb-10 backdrop-blur-sm"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="font-medium">Trusted by FinTech & Healthcare Leaders</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-[1.05] tracking-tight"
          >
            Powered by{" "}
            <span className="text-gradient-premium">Quality</span>
            <br />
            <span className="text-white/90">Committed to </span>
            <span className="relative inline-block">
              Excellence
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
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            We build secure, compliant, and user-friendly custom software for FinTech and Healthcare industries. 
            <span className="text-white/80 font-normal"> Your vision, our expertise.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/#contact">
                <Button variant="cta" size="lg" className="group text-base px-8 py-6 shadow-2xl shadow-primary/40 hover:shadow-glow transition-all">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/cases">
                <Button variant="heroOutline" size="lg" className="text-base px-8 py-6 backdrop-blur-sm group">
                  <Play className="w-5 h-5 transition-transform group-hover:scale-110" />
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with animated counters */}
          <motion.div
            variants={fadeUpVariants}
            className="grid grid-cols-3 gap-6 md:gap-8 mt-20 pt-10 border-t border-white/10"
          >
            {[
              { value: "50+", label: "Projects Delivered", delay: 0 },
              { value: "98%", label: "Client Satisfaction", delay: 100 },
              { value: "10+", label: "Years Experience", icon: Zap, delay: 200 },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="text-center group cursor-default"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white flex items-center justify-center gap-2 group-hover:text-blue-300 transition-colors">
                  {stat.icon && <stat.icon className="w-7 h-7 text-blue-400" />}
                  <AnimatedCounter 
                    value={stat.value} 
                    duration={2000} 
                    delay={stat.delay}
                  />
                </div>
                <div className="text-sm md:text-base text-white/50 mt-2 font-medium group-hover:text-white/70 transition-colors">{stat.label}</div>
              </motion.div>
            ))}
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
    </section>
  );
};

export default HeroSection;
