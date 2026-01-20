import { Users, Zap, Shield, Clock, Award, HeartHandshake } from "lucide-react";

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
    <section id="why-us" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Six Reasons to Partner with Auxility
          </h2>
          <p className="text-muted-foreground text-lg">
            We don't just build software — we build lasting partnerships that drive real business outcomes.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number badge */}
              <div className="absolute top-6 right-6 text-6xl font-display font-bold text-muted/50 group-hover:text-accent/20 transition-colors">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                <reason.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-display font-bold text-foreground mb-3 pr-12">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
