import { Globe, Smartphone, Lightbulb, Link, Search, BarChart3 } from "lucide-react";

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
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-cta/10 text-cta text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Full-Spectrum Development Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From initial concept to production deployment, we cover every aspect of your software journey.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map((offering, index) => (
            <div
              key={offering.title}
              className="group flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-cta/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cta/10 to-cta/20 flex items-center justify-center text-cta group-hover:from-cta group-hover:to-cta group-hover:text-cta-foreground transition-all duration-300">
                <offering.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {offering.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {offering.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Market Research Benefits */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Why Market Research Matters
            </h3>
            <p className="text-muted-foreground">
              Before writing a single line of code, we help you validate your idea with data-driven insights.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              { num: "01", text: "Identify market opportunities and gaps" },
              { num: "02", text: "Understand user pain points" },
              { num: "03", text: "Analyze competitor strengths" },
              { num: "04", text: "Define clear product requirements" },
              { num: "05", text: "Reduce time-to-market risk" },
            ].map((item) => (
              <div key={item.num} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground font-display font-bold text-lg mb-3">
                  {item.num}
                </div>
                <p className="text-sm text-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferingsSection;
