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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-glow opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 tracking-wide"
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
              whileHover={{ y: -8 }}
              className={`card-3d p-10 md:p-12 ${
                service.category === "fintech"
                  ? "bg-gradient-to-br from-fintech/5 via-card to-fintech/10"
                  : "bg-gradient-to-br from-healthcare/5 via-card to-healthcare/10"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 shadow-lg ${
                  service.category === "fintech"
                    ? "bg-fintech text-fintech-foreground shadow-fintech/30"
                    : "bg-healthcare text-healthcare-foreground shadow-healthcare/30"
                }`}
              >
                <service.icon className="w-8 h-8" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      service.category === "fintech"
                        ? "bg-fintech/10 text-fintech"
                        : "bg-healthcare/10 text-healthcare"
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              className="card-3d flex flex-col items-center justify-center p-8"
            >
              <service.icon className="w-10 h-10 text-primary mb-4" />
              <span className="text-sm font-semibold text-foreground text-center">{service.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
