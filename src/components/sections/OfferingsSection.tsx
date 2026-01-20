import { motion } from "framer-motion";
import { Globe, Smartphone, Lightbulb, Link, Search, BarChart3 } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";

const offerings = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Responsive web applications built with modern frameworks for optimal performance and user experience.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
  },
  {
    icon: Lightbulb,
    title: "Consulting & Strategy",
    description: "Technical consulting to help you make informed decisions about architecture and technology stack.",
  },
  {
    icon: Link,
    title: "System Integration",
    description: "Connect your systems with third-party services, APIs, and legacy infrastructure seamlessly.",
  },
  {
    icon: Search,
    title: "Market Research",
    description: "Data-driven insights to understand your market, competitors, and user needs before building.",
  },
  {
    icon: BarChart3,
    title: "Analytics & BI",
    description: "Transform your data into actionable insights with custom dashboards and reporting tools.",
  },
];

const OfferingsSection = () => {
  return (
    <section className="py-28 md:py-40 bg-background relative">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-cta/3 to-transparent" />
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
            className="inline-block px-4 py-2 rounded-full bg-cta/10 text-cta text-sm font-semibold mb-6 tracking-wide"
          >
            What We Offer
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Full-Spectrum Development Services
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            From initial concept to production deployment, we cover every aspect of your software journey.
          </motion.p>
        </motion.div>

        {/* Offerings Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {offerings.map((offering) => (
            <motion.div
              key={offering.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex gap-5 p-7 rounded-2xl bg-card border border-border hover:border-cta/30 hover:shadow-xl hover:shadow-cta/5 transition-all duration-300 cursor-pointer"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-cta/10 to-cta/20 flex items-center justify-center text-cta group-hover:from-cta group-hover:to-cta group-hover:text-cta-foreground transition-all duration-300 shadow-lg shadow-transparent group-hover:shadow-cta/20"
              >
                <offering.icon className="w-7 h-7" />
              </motion.div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2 group-hover:text-cta transition-colors">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {offering.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Market Research Benefits */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="mt-20 p-10 md:p-14 rounded-3xl bg-gradient-to-br from-accent/5 via-card to-accent/8 border border-accent/15"
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <motion.h3
              variants={fadeUpVariants}
              className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4"
            >
              Why Market Research Matters
            </motion.h3>
            <motion.p variants={fadeUpVariants} className="text-muted-foreground text-lg">
              Before writing a single line of code, we help you validate your idea with data-driven insights.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="grid md:grid-cols-5 gap-6 md:gap-8"
          >
            {[
              { num: "01", text: "Identify market opportunities and gaps" },
              { num: "02", text: "Understand user pain points" },
              { num: "03", text: "Analyze competitor strengths" },
              { num: "04", text: "Define clear product requirements" },
              { num: "05", text: "Reduce time-to-market risk" },
            ].map((item, index) => (
              <motion.div
                key={item.num}
                variants={cardVariants}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-accent-foreground font-display font-bold text-lg mb-4 shadow-lg shadow-accent/25 group-hover:shadow-xl group-hover:shadow-accent/35 transition-shadow"
                >
                  {item.num}
                </motion.div>
                <p className="text-sm text-foreground font-medium leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferingsSection;
