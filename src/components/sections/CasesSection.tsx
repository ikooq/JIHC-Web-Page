import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: "icu",
    title: "ICU Management System",
    category: "Healthcare",
    description: "Real-time patient monitoring and clinical decision support system for intensive care units.",
    tags: ["React", "Node.js", "FHIR", "Real-time"],
    color: "healthcare",
  },
  {
    id: "halyk",
    title: "HALYK Bank Platform",
    category: "FinTech",
    description: "Digital banking transformation with mobile-first approach and seamless payment integrations.",
    tags: ["React Native", "Microservices", "Security"],
    color: "fintech",
  },
  {
    id: "telemedicine",
    title: "Telemedicine Portal",
    category: "Healthcare",
    description: "HIPAA-compliant video consultation platform connecting patients with healthcare providers.",
    tags: ["WebRTC", "AWS", "HIPAA", "EHR Integration"],
    color: "healthcare",
  },
  {
    id: "uub",
    title: "UUB Investment App",
    category: "FinTech",
    description: "Retail investment platform with real-time market data and personalized portfolio management.",
    tags: ["Flutter", "Trading APIs", "Analytics"],
    color: "fintech",
  },
];

const CasesSection = () => {
  return (
    <section id="cases" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Prominent Case Studies
          </h2>
          <p className="text-muted-foreground text-lg">
            Real results for real clients. Here's how we've helped industry leaders transform their digital presence.
          </p>
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {cases.map((caseItem, index) => (
            <div
              key={caseItem.id}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                caseItem.color === "fintech"
                  ? "bg-gradient-to-br from-fintech/5 via-card to-fintech/10 border-fintech/20 hover:border-fintech/40"
                  : "bg-gradient-to-br from-healthcare/5 via-card to-healthcare/10 border-healthcare/20 hover:border-healthcare/40"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image placeholder area */}
              <div className={`h-48 md:h-56 relative overflow-hidden ${
                caseItem.color === "fintech" ? "bg-fintech/10" : "bg-healthcare/10"
              }`}>
                {/* Abstract pattern */}
                <div className="absolute inset-0 opacity-30">
                  <div className={`absolute top-1/4 -left-10 w-40 h-40 rounded-full blur-3xl ${
                    caseItem.color === "fintech" ? "bg-fintech" : "bg-healthcare"
                  }`} />
                  <div className={`absolute bottom-1/4 -right-10 w-32 h-32 rounded-full blur-2xl ${
                    caseItem.color === "fintech" ? "bg-fintech" : "bg-healthcare"
                  }`} />
                </div>
                
                {/* Category badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  caseItem.color === "fintech"
                    ? "bg-fintech text-fintech-foreground"
                    : "bg-healthcare text-healthcare-foreground"
                }`}>
                  {caseItem.category}
                </div>

                {/* Arrow icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5 text-foreground" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {caseItem.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {caseItem.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {caseItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
