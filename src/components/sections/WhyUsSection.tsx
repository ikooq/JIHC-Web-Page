import { motion } from "framer-motion";
import { Users, Zap, Shield, Clock, Award, HeartHandshake } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";

const reasons = [
  { icon: Users, title: "Dedicated Team", description: "Your project gets a dedicated team of senior engineers who understand your domain." },
  { icon: Shield, title: "Security First", description: "We build with compliance in mind — HIPAA, PCI-DSS, GDPR from day one." },
  { icon: Zap, title: "Fast Delivery", description: "Agile methodology ensures rapid iterations and transparent progress." },
  { icon: Clock, title: "On-Time, On-Budget", description: "98% of our projects are delivered on schedule with predictable costs." },
  { icon: Award, title: "Industry Expertise", description: "10+ years of focused experience in FinTech and Healthcare sectors." },
  { icon: HeartHandshake, title: "Long-Term Partnership", description: "We're invested in your success — ongoing support and continuous improvement." },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="py-28 md:py-40 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span variants={fadeUpVariants} className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            Why Choose Us
          </motion.span>
          <motion.h2 variants={fadeUpVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Six Reasons to Partner with Auxility
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-muted-foreground text-lg md:text-xl">
            We don't just build software — we build lasting partnerships that drive real business outcomes.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportSettings} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div key={reason.title} variants={cardVariants} whileHover={{ y: -6 }} className="card-3d p-8 md:p-10 relative">
              <div className="absolute top-8 right-8 text-7xl font-display font-bold text-muted/20 select-none">
                {String(index + 1).padStart(2, "0")}
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-8">
                <reason.icon className="w-7 h-7" />
              </motion.div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 pr-16">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
