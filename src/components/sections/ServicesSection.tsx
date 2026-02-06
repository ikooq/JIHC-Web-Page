import { useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Heart, CreditCard, Stethoscope, LineChart, Shield } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";
import { useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { useCopy } from "@/hooks/useCopy";
import { useLanguage } from "@/hooks/useLanguage";
import { ServiceData } from "@/lib/googleSheetsCMS";
import * as LucideIcons from "lucide-react";
import { pickLocalized } from "@/lib/i18n";

const additionalServices = [
  { icon: CreditCard, key: "service_additional_payment" },
  { icon: Stethoscope, key: "service_additional_medical" },
  { icon: LineChart, key: "service_additional_analytics" },
  { icon: Shield, key: "service_additional_security" },
];

const ServicesSection = () => {
  const { get } = useCopy();
  const { language } = useLanguage();
  const { data: servicesData, loading, error } = useGoogleSheetsData<ServiceData>({
    sheetName: "Services",
  });

  // Логирование для отладки
  useEffect(() => {
    console.log('[ServicesSection] Services data:', { servicesData, loading, error });
    console.log('[ServicesSection] Using data:', servicesData && servicesData.length > 0 ? 'FROM GOOGLE SHEETS ✅' : 'FALLBACK DATA ⚠️');
  }, [servicesData, loading, error]);

  // Fallback данные
  const defaultServices: ServiceData[] = [
    {
      id: "1",
      category: "fintech",
      title: "FinTech Solutions",
      description: "Banking platforms, payment gateways, and investment tools built with security-first architecture.",
      feature_1: "Payment Processing",
      feature_2: "Regulatory Compliance",
      feature_3: "Real-time Analytics",
      feature_4: "Fraud Detection",
      icon: "Building2",
    },
    {
      id: "2",
      category: "healthcare",
      title: "Healthcare Systems",
      description: "HIPAA-compliant telemedicine, EHR integrations, and patient management solutions.",
      feature_1: "Telemedicine Platforms",
      feature_2: "EHR Integration",
      feature_3: "Patient Portals",
      feature_4: "Clinical Workflows",
      icon: "Heart",
    },
  ];

  const services = (servicesData && servicesData.length > 0 ? servicesData : defaultServices).map((service) => {
    const features = ["feature_1", "feature_2", "feature_3", "feature_4"]
      .map((f) => pickLocalized(service as any, f, language, String((service as any)[f] ?? "")))
      .filter(Boolean);
    return {
      ...service,
      title: pickLocalized(service as any, "title", language, service.title),
      description: pickLocalized(service as any, "description", language, service.description),
      icon: (LucideIcons as any)[service.icon] || Building2,
      features,
    };
  });
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
            {get("services_badge")}
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            {get("services_heading")}
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            {get("services_subheading")}
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
              className={`card-3d p-10 md:p-12 ${service.category === "fintech"
                  ? "bg-gradient-to-br from-fintech/5 via-card to-fintech/10"
                  : "bg-gradient-to-br from-healthcare/5 via-card to-healthcare/10"
                }`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 shadow-lg ${service.category === "fintech"
                    ? "bg-fintech text-fintech-foreground shadow-fintech/30"
                    : "bg-healthcare text-healthcare-foreground shadow-healthcare/30"
                  }`}
              >
                {typeof service.icon === 'function' ? (
                  <service.icon className="w-8 h-8" />
                ) : (
                  <Building2 className="w-8 h-8" />
                )}
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {(Array.isArray(service.features) ? service.features : []).map((feature, idx) => (
                  <span
                    key={feature || idx}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${service.category === "fintech"
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
              key={service.key}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="card-3d flex flex-col items-center justify-center p-8"
            >
              <service.icon className="w-10 h-10 text-primary mb-4" />
              <span className="text-sm font-semibold text-foreground text-center">{get(service.key)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
