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
import { SeoHead } from "@/components/seo/SeoHead";
import { useCopy } from "@/hooks/useCopy";

const services = [
  {
    icon: Building2,
    category: "fintech",
    key: "service_fintech",
    features: ["1", "2", "3", "4", "5", "6"],
    benefits: ["1", "2", "3", "4"]
  },
  {
    icon: Heart,
    category: "healthcare",
    key: "service_healthcare",
    features: ["1", "2", "3", "4", "5", "6"],
    benefits: ["1", "2", "3", "4"]
  },
];

const additionalServices = [
  { icon: CreditCard, key: "service_additional_payment" },
  { icon: Stethoscope, key: "service_additional_medical" },
  { icon: LineChart, key: "service_additional_analytics" },
  { icon: Shield, key: "service_additional_security" },
];

const ServicesPage = () => {
  const { get } = useCopy();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden">
      <SeoHead
        title={get("seo_services_title")}
        description={get("seo_services_description")}
      />
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
              {get("services_page_badge")}
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              {get("services_hero_title")}
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xl text-white/60 max-w-2xl"
            >
              {get("services_hero_subtitle")}
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
                key={service.key}
                variants={cardVariants}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg ${service.category === "fintech"
                    ? "bg-fintech text-fintech-foreground shadow-fintech/30"
                    : "bg-healthcare text-healthcare-foreground shadow-healthcare/30"
                    }`}>
                    <service.icon className="w-8 h-8" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {get(`${service.key}_title`)}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {get(`${service.key}_desc`)}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className={`px-4 py-2 rounded-xl text-sm font-medium ${service.category === "fintech"
                          ? "bg-fintech/10 text-fintech"
                          : "bg-healthcare/10 text-healthcare"
                          }`}
                      >
                        {get(`${service.key}_feature_${feature}`)}
                      </span>
                    ))}
                  </div>

                  <Link to="/#contact">
                    <Button variant="cta" className="group">
                      {get("nav_contact_btn")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`card-3d p-8 ${service.category === "fintech"
                    ? "bg-gradient-to-br from-fintech/5 to-fintech/10"
                    : "bg-gradient-to-br from-healthcare/5 to-healthcare/10"
                    }`}>
                    <h3 className="text-lg font-display font-bold text-foreground mb-6">{get("services_key_benefits")}</h3>
                    <div className="space-y-4">
                      {service.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${service.category === "fintech" ? "bg-fintech/20" : "bg-healthcare/20"
                            }`}>
                            <Check className={`w-4 h-4 ${service.category === "fintech" ? "text-fintech" : "text-healthcare"
                              }`} />
                          </div>
                          <span className="text-foreground">{get(`${service.key}_benefit_${benefit}`)}</span>
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
              {get("services_additional_title")}
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              {get("services_additional_subtitle")}
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
                key={service.key}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-3d p-8 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{get(service.key)}</h3>
                <p className="text-sm text-muted-foreground">{get(`${service.key}_desc`)}</p>
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
              {get("services_cta_title")}
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 text-lg mb-8 max-w-2xl mx-auto"
            >
              {get("services_cta_subtitle")}
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <Link to="/#contact">
                <Button variant="cta" size="lg" className="shadow-glow">
                  {get("nav_contact_btn")}
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
