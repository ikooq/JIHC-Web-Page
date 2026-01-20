import { motion } from "framer-motion";
import { Building2, Heart, CreditCard, Stethoscope, LineChart, Shield } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";

const services = [
  {
    icon: Building2,
    category: "fintech",
    title: "FinTech Solutions",
    description: "Banking platforms, payment gateways, and investment tools built with security-first architecture.",
    features: ["Payment Processing", "Regulatory Compliance", "Real-time Analytics", "Fraud Detection"],
  },
  {
    icon: Heart,
    category: "healthcare",
    title: "Healthcare Systems",
    description: "HIPAA-compliant telemedicine, EHR integrations, and patient management solutions.",
    features: ["Telemedicine Platforms", "EHR Integration", "Patient Portals", "Clinical Workflows"],
  },
];

const additionalServices = [
  { icon: CreditCard, label: "Payment Systems" },
  { icon: Stethoscope, label: "Medical Devices" },
  { icon: LineChart, label: "Analytics Dashboards" },
  { icon: Shield, label: "Security Audits" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-28 md:py-40 bg-background relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-accent/3 to-transparent" />
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
            Our Expertise
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Specialized in{" "}
            <span className="text-fintech">FinTech</span> &{" "}
            <span className="text-healthcare">Healthcare</span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            We understand the unique challenges of regulated industries and deliver solutions that meet the highest standards.
          </motion.p>
        </motion.div>

        {/* Main Services Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`group relative rounded-3xl p-10 md:p-12 transition-all duration-500 cursor-pointer ${
                service.category === "fintech"
                  ? "bg-gradient-to-br from-fintech/5 via-card to-fintech/8 border border-fintech/15 hover:border-fintech/30 hover:shadow-2xl hover:shadow-fintech/10"
                  : "bg-gradient-to-br from-healthcare/5 via-card to-healthcare/8 border border-healthcare/15 hover:border-healthcare/30 hover:shadow-2xl hover:shadow-healthcare/10"
              }`}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 shadow-lg ${
                  service.category === "fintech"
                    ? "bg-fintech text-fintech-foreground shadow-fintech/25"
                    : "bg-healthcare text-healthcare-foreground shadow-healthcare/25"
                }`}
              >
                <service.icon className="w-8 h-8" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-3">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      service.category === "fintech"
                        ? "bg-fintech/10 text-fintech group-hover:bg-fintech/15"
                        : "bg-healthcare/10 text-healthcare group-hover:bg-healthcare/15"
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover decoration */}
              <div
                className={`absolute top-6 right-6 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
                  service.category === "fintech" ? "bg-fintech/15" : "bg-healthcare/15"
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {additionalServices.map((service) => (
            <motion.div
              key={service.label}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <service.icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors duration-300 mb-4" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground text-center">{service.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
