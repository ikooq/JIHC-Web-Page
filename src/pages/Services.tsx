import { motion } from "framer-motion";
import { Building2, Heart, CreditCard, Stethoscope, LineChart, Shield, ArrowRight, Check } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { GlowingOrb } from "@/components/3d/GlowingOrb";

const services = [
  {
    icon: Building2,
    category: "fintech",
    title: "FinTech Solutions",
    description: "Banking platforms, payment gateways, and investment tools built with security-first architecture.",
    features: ["Payment Processing", "Regulatory Compliance", "Real-time Analytics", "Fraud Detection", "KYC/AML Integration", "Multi-currency Support"],
    benefits: [
      "PCI-DSS compliant infrastructure",
      "99.99% uptime guarantee",
      "Real-time transaction processing",
      "Advanced security protocols"
    ]
  },
  {
    icon: Heart,
    category: "healthcare",
    title: "Healthcare Systems",
    description: "HIPAA-compliant telemedicine, EHR integrations, and patient management solutions.",
    features: ["Telemedicine Platforms", "EHR Integration", "Patient Portals", "Clinical Workflows", "Remote Monitoring", "Health Analytics"],
    benefits: [
      "Full HIPAA compliance",
      "HL7/FHIR standards support",
      "Secure patient data handling",
      "Seamless EHR integration"
    ]
  },
];

const additionalServices = [
  { icon: CreditCard, label: "Payment Systems", description: "Secure payment processing solutions" },
  { icon: Stethoscope, label: "Medical Devices", description: "IoT healthcare device integration" },
  { icon: LineChart, label: "Analytics Dashboards", description: "Real-time data visualization" },
  { icon: Shield, label: "Security Audits", description: "Comprehensive security assessments" },
];

const ServicesPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <BackToTop />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] -translate-y-1/2 translate-x-1/2">
          <GlowingOrb className="w-full h-full" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.span
              variants={fadeUpVariants}
              className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6"
            >
              Our Services
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              Enterprise Solutions for{" "}
              <span className="text-gradient-premium">Regulated Industries</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xl text-white/60 max-w-2xl"
            >
              We specialize in building secure, compliant software for FinTech and Healthcare sectors with deep domain expertise.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="space-y-16"
          >
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${
                    service.category === "fintech"
                      ? "bg-fintech text-fintech-foreground shadow-fintech/30"
                      : "bg-healthcare text-healthcare-foreground shadow-healthcare/30"
                  }`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${
                          service.category === "fintech"
                            ? "bg-fintech/10 text-fintech"
                            : "bg-healthcare/10 text-healthcare"
                        }`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Link to="/#contact">
                    <Button variant="cta" className="group">
                      Get Started
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`card-3d p-8 ${
                    service.category === "fintech"
                      ? "bg-gradient-to-br from-fintech/5 to-fintech/10"
                      : "bg-gradient-to-br from-healthcare/5 to-healthcare/10"
                  }`}>
                    <h3 className="text-lg font-display font-bold text-foreground mb-6">Key Benefits</h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            service.category === "fintech" ? "bg-fintech/20" : "bg-healthcare/20"
                          }`}>
                            <Check className={`w-4 h-4 ${
                              service.category === "fintech" ? "text-fintech" : "text-healthcare"
                            }`} />
                          </div>
                          <span className="text-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
            >
              Additional Capabilities
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Complementary services to support your complete digital transformation
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {additionalServices.map((service) => (
              <motion.div
                key={service.label}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-3d p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{service.label}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-hero">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeUpVariants}
              className="text-3xl md:text-5xl font-display font-bold text-white mb-6"
            >
              Ready to Start Your Project?
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 text-lg mb-8 max-w-2xl mx-auto"
            >
              Let's discuss how we can help transform your business with our expertise in FinTech and Healthcare software development.
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <Link to="/#contact">
                <Button variant="cta" size="lg" className="shadow-glow">
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServicesPage;
