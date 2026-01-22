import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";

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

// Individual case card with parallax
const CaseCard = ({ caseItem, index }: { caseItem: typeof cases[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Different parallax speeds for odd/even cards
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    index % 2 === 0 ? [60, -60] : [40, -40]
  );
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -2]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale, rotateX }}
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer perspective-1000 ${
        caseItem.color === "fintech"
          ? "bg-gradient-to-br from-card via-card to-fintech/5 border-fintech/15 hover:border-fintech/35 hover:shadow-2xl hover:shadow-fintech/10"
          : "bg-gradient-to-br from-card via-card to-healthcare/5 border-healthcare/15 hover:border-healthcare/35 hover:shadow-2xl hover:shadow-healthcare/10"
      }`}
    >
      {/* Image placeholder area with parallax internal elements */}
      <div className={`h-52 md:h-64 relative overflow-hidden ${
        caseItem.color === "fintech" ? "bg-gradient-to-br from-fintech/10 to-fintech/5" : "bg-gradient-to-br from-healthcare/10 to-healthcare/5"
      }`}>
        {/* Abstract pattern with parallax */}
        <div className="absolute inset-0 opacity-40">
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [20, -20])
            }}
            className={`absolute top-1/4 -left-10 w-48 h-48 rounded-full blur-[60px] ${
              caseItem.color === "fintech" ? "bg-fintech" : "bg-healthcare"
            }`}
          />
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0, 1], [-20, 20])
            }}
            className={`absolute bottom-1/4 -right-10 w-36 h-36 rounded-full blur-[50px] ${
              caseItem.color === "fintech" ? "bg-fintech" : "bg-healthcare"
            }`}
          />
        </div>
        
        {/* Category badge */}
        <div className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide ${
          caseItem.color === "fintech"
            ? "bg-fintech text-fintech-foreground shadow-lg shadow-fintech/30"
            : "bg-healthcare text-healthcare-foreground shadow-lg shadow-healthcare/30"
        }`}>
          {caseItem.category}
        </div>

        {/* Arrow icon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
        >
          <ArrowUpRight className="w-5 h-5 text-foreground" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {caseItem.title}
        </h3>
        <p className="text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
          {caseItem.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {caseItem.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-lg bg-muted/80 text-muted-foreground text-xs font-medium border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const CasesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section 
      ref={sectionRef}
      id="cases" 
      className="py-28 md:py-40 bg-muted/30 relative overflow-hidden"
    >
      {/* Background accent with parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -left-64 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px]" />
      </motion.div>

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
            Our Work
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Prominent Case Studies
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            Real results for real clients. Here's how we've helped industry leaders transform their digital presence.
          </motion.p>
        </motion.div>

        {/* Cases Grid with parallax cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {cases.map((caseItem, index) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CasesSection;
