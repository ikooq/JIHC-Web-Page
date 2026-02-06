import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { SeoHead } from "@/components/seo/SeoHead";
import { useCopy } from "@/hooks/useCopy";

const cases = [
  {
    id: "icu",
    key: "case_icu",
    category: "Healthcare",
    tags: ["React", "Node.js", "FHIR", "Real-time", "IoT"],
    color: "healthcare",
    metrics: ["1", "2", "3"],
  },
  {
    id: "halyk",
    key: "case_halyk",
    category: "FinTech",
    tags: ["React Native", "Microservices", "Security", "Kubernetes"],
    color: "fintech",
    metrics: ["1", "2", "3"],
  },
  {
    id: "telemedicine",
    key: "case_telemedicine",
    category: "Healthcare",
    tags: ["WebRTC", "AWS", "HIPAA", "EHR Integration"],
    color: "healthcare",
    metrics: ["1", "2", "3"],
  },
  {
    id: "uub",
    key: "case_uub",
    category: "FinTech",
    tags: ["Flutter", "Trading APIs", "Analytics", "AI/ML"],
    color: "fintech",
    metrics: ["1", "2", "3"],
  },
];

const CasesPage = () => {
  const { get } = useCopy();

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden">
      <SeoHead
        title={get("seo_cases_title")}
        description={get("seo_cases_description")}
      />
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
              {get("cases_page_badge")}
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              {get("cases_hero_title")}
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xl text-white/60 max-w-2xl"
            >
              {get("cases_hero_subtitle")}
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
                  <div className={`relative h-64 lg:h-auto lg:min-h-[400px] ${caseItem.color === "fintech"
                    ? "bg-gradient-to-br from-fintech/20 to-fintech/5"
                    : "bg-gradient-to-br from-healthcare/20 to-healthcare/5"
                    } ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                        className={`w-32 h-32 md:w-48 md:h-48 rounded-3xl ${caseItem.color === "fintech" ? "bg-fintech/30" : "bg-healthcare/30"
                          } blur-xl`}
                      />
                    </div>

                    {/* Category badge */}
                    <div className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-bold ${caseItem.color === "fintech"
                      ? "bg-fintech text-fintech-foreground"
                      : "bg-healthcare text-healthcare-foreground"
                      }`}>
                      {caseItem.category}
                    </div>

                    {/* Metrics */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-4 flex-wrap">
                      {caseItem.metrics.map((metricIdx) => {
                        const metricValues: Record<string, string[]> = {
                          icu: ["<100ms", "99.99%", "10,000+"],
                          halyk: ["50,000+", "2M+", "40%"],
                          telemedicine: ["500K+", "4.9/5", "<5min"],
                          uub: ["$500M+", "100K+", "300%"],
                        };
                        return (
                          <div key={metricIdx} className="bg-background/90 backdrop-blur-sm rounded-xl px-4 py-2">
                            <div className={`text-lg font-bold ${caseItem.color === "fintech" ? "text-fintech" : "text-healthcare"
                              }`}>
                              {metricValues[caseItem.id][Number(metricIdx) - 1]}
                            </div>
                            <div className="text-xs text-muted-foreground">{get(`${caseItem.key}_metric_${metricIdx}_label`)}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className={`p-8 lg:p-12 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      {get(`${caseItem.key}_title`)}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {get(`${caseItem.key}_desc`)}
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
                      {get("cases_view_full")}
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
              {get("cases_cta_title")}
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 text-lg mb-8 max-w-2xl mx-auto"
            >
              {get("cases_cta_subtitle")}
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <Link to="/#contact">
                <Button variant="cta" size="lg" className="shadow-glow">
                  {get("cases_start_project")}
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
