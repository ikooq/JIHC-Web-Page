import { Building2, Heart, CreditCard, Stethoscope, LineChart, Shield } from "lucide-react";

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
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Specialized in{" "}
            <span className="text-fintech">FinTech</span> &{" "}
            <span className="text-healthcare">Healthcare</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We understand the unique challenges of regulated industries and deliver solutions that meet the highest standards.
          </p>
        </div>

        {/* Main Services Cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl p-8 md:p-10 transition-all duration-500 hover:scale-[1.02] ${
                service.category === "fintech"
                  ? "bg-gradient-to-br from-fintech/5 to-fintech/10 border border-fintech/20 hover:shadow-xl hover:shadow-fintech/10"
                  : "bg-gradient-to-br from-healthcare/5 to-healthcare/10 border border-healthcare/20 hover:shadow-xl hover:shadow-healthcare/10"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${
                  service.category === "fintech"
                    ? "bg-fintech text-fintech-foreground"
                    : "bg-healthcare text-healthcare-foreground"
                }`}
              >
                <service.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      service.category === "fintech"
                        ? "bg-fintech/10 text-fintech"
                        : "bg-healthcare/10 text-healthcare"
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Hover decoration */}
              <div
                className={`absolute top-4 right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  service.category === "fintech" ? "bg-fintech/20" : "bg-healthcare/20"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {additionalServices.map((service, index) => (
            <div
              key={service.label}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <service.icon className="w-8 h-8 text-muted-foreground group-hover:text-accent transition-colors mb-3" />
              <span className="text-sm font-medium text-foreground text-center">{service.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
