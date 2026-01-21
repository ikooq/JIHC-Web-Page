import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";

const cases = [
  {
    id: "icu",
    title: "ICU Management System",
    category: "Healthcare",
    description: "Real-time patient monitoring and clinical decision support system for intensive care units. Integrated with hospital EHR systems and medical devices for comprehensive patient care.",
    tags: ["React", "Node.js", "FHIR", "Real-time", "IoT"],
    color: "healthcare",
    metrics: [
      { label: "Response Time", value: "<100ms" },
      { label: "Uptime", value: "99.99%" },
      { label: "Patients Monitored", value: "10,000+" },
    ],
  },
  {
    id: "halyk",
    title: "HALYK Bank Platform",
    category: "FinTech",
    description: "Digital banking transformation with mobile-first approach and seamless payment integrations. Complete overhaul of legacy systems to modern microservices architecture.",
    tags: ["React Native", "Microservices", "Security", "Kubernetes"],
    color: "fintech",
    metrics: [
      { label: "Transactions/sec", value: "50,000+" },
      { label: "Active Users", value: "2M+" },
      { label: "Cost Reduction", value: "40%" },
    ],
  },
  {
    id: "telemedicine",
    title: "Telemedicine Portal",
    category: "Healthcare",
    description: "HIPAA-compliant video consultation platform connecting patients with healthcare providers. Features include appointment scheduling, secure messaging, and prescription management.",
    tags: ["WebRTC", "AWS", "HIPAA", "EHR Integration"],
    color: "healthcare",
    metrics: [
      { label: "Consultations", value: "500K+" },
      { label: "Satisfaction", value: "4.9/5" },
      { label: "Wait Time", value: "<5min" },
    ],
  },
  {
    id: "uub",
    title: "UUB Investment App",
    category: "FinTech",
    description: "Retail investment platform with real-time market data and personalized portfolio management. AI-powered recommendations and automated trading capabilities.",
    tags: ["Flutter", "Trading APIs", "Analytics", "AI/ML"],
    color: "fintech",
    metrics: [
      { label: "AUM", value: "$500M+" },
      { label: "Daily Trades", value: "100K+" },
      { label: "User Growth", value: "300%" },
    ],
  },
];

const CasesPage = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <BackToTop />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        
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
              Case Studies
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              Real Results for{" "}
              <span className="text-gradient-premium">Real Clients</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xl text-white/60 max-w-2xl"
            >
              Explore how we've helped industry leaders transform their digital presence and achieve measurable business outcomes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="space-y-16"
          >
            {cases.map((caseItem, idx) => (
              <motion.div
                key={caseItem.id}
                variants={cardVariants}
                className="card-3d overflow-hidden"
              >
                <div className="grid lg:grid-cols-2">
                  {/* Image/Visual Area */}
                  <div className={`relative h-64 lg:h-auto lg:min-h-[400px] ${
                    caseItem.color === "fintech" 
                      ? "bg-gradient-to-br from-fintech/20 to-fintech/5" 
                      : "bg-gradient-to-br from-healthcare/20 to-healthcare/5"
                  } ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                        className={`w-32 h-32 md:w-48 md:h-48 rounded-3xl ${
                          caseItem.color === "fintech" ? "bg-fintech/30" : "bg-healthcare/30"
                        } blur-xl`}
                      />
                    </div>
                    
                    {/* Category badge */}
                    <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold ${
                      caseItem.color === "fintech"
                        ? "bg-fintech text-fintech-foreground"
                        : "bg-healthcare text-healthcare-foreground"
                    }`}>
                      {caseItem.category}
                    </div>

                    {/* Metrics */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-4 flex-wrap">
                      {caseItem.metrics.map((metric) => (
                        <div key={metric.label} className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2">
                          <div className={`text-lg font-bold ${
                            caseItem.color === "fintech" ? "text-fintech" : "text-healthcare"
                          }`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`p-8 lg:p-12 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      {caseItem.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {caseItem.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {caseItem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button variant="outline" className="group">
                      View Full Case Study
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </div>
                </div>
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
              Let's Create Your Success Story
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 text-lg mb-8 max-w-2xl mx-auto"
            >
              Ready to join our portfolio of successful projects? Let's discuss how we can help you achieve similar results.
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <Link to="/#contact">
                <Button variant="cta" size="lg" className="shadow-glow">
                  Start Your Project
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

export default CasesPage;
