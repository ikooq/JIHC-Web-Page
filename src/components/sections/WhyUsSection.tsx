import { motion } from "framer-motion";
import { Users, Zap, Shield, Clock, Award, HeartHandshake } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";

const reasons = [
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Your project gets a dedicated team of senior engineers who understand your domain.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "We build with compliance in mind — HIPAA, PCI-DSS, GDPR from day one.",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Agile methodology ensures rapid iterations and transparent progress.",
  },
  {
    icon: Clock,
    title: "On-Time, On-Budget",
    description: "98% of our projects are delivered on schedule with predictable costs.",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "10+ years of focused experience in FinTech and Healthcare sectors.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description: "We're invested in your success — ongoing support and continuous improvement.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-28 md:py-40 bg-muted/30 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}
        />
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
            Why Choose Us
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Six Reasons to Partner with Auxility
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            We don't just build software — we build lasting partnerships that drive real business outcomes.
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group relative bg-card rounded-3xl p-8 md:p-10 border border-border hover:border-accent/25 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 cursor-pointer"
            >
              {/* Number badge */}
              <div className="absolute top-8 right-8 text-7xl font-display font-bold text-muted/30 group-hover:text-accent/15 transition-colors duration-500 select-none">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-8 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-lg shadow-transparent group-hover:shadow-accent/20"
              >
                <reason.icon className="w-7 h-7" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 pr-16">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {reason.description}
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-accent/0 to-transparent group-hover:via-accent/50 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
