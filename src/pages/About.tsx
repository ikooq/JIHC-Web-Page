import { motion } from "framer-motion";
import { Target, Award, Heart, Zap, Shield, Clock, ArrowRight } from "lucide-react";
import { fadeUpVariants, staggerContainer, cardVariants, viewportSettings } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in everything we build, from code quality to user experience.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Security isn't an afterthought—it's built into every layer of our solutions from day one.",
  },
  {
    icon: Heart,
    title: "Client Partnership",
    description: "We treat every client relationship as a true partnership, invested in your long-term success.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions that give you competitive advantage.",
  },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "30+", label: "Team Members" },
];

const team = [
  { name: "Alex Chen", role: "CEO & Co-Founder", specialty: "FinTech Strategy" },
  { name: "Sarah Williams", role: "CTO", specialty: "Healthcare Systems" },
  { name: "Michael Park", role: "VP Engineering", specialty: "Architecture" },
  { name: "Emily Johnson", role: "Head of Design", specialty: "UX/UI" },
];

const AboutPage = () => {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <BackToTop />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[100px]"
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              variants={fadeUpVariants}
              className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6"
            >
              About Us
            </motion.span>
            <motion.h1
              variants={fadeUpVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              Building the Future of{" "}
              <span className="text-gradient-premium">Digital Health & Finance</span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="text-xl text-white/60 max-w-2xl mx-auto"
            >
              We're a team of passionate engineers, designers, and strategists dedicated to creating transformative software solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={fadeUpVariants}
                className="text-center"
              >
                <AnimatedCounter 
                  value={stat.value}
                  className="text-4xl md:text-5xl font-display font-bold text-primary mb-2"
                  duration={2000}
                  delay={index * 150}
                />
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUpVariants}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Auxility, we believe technology should empower organizations to deliver better outcomes for their customers. Our mission is to bridge the gap between innovative ideas and production-ready software.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We specialize in FinTech and Healthcare because these industries have the highest impact on people's lives. When we build a payment system that works flawlessly or a telemedicine platform that connects patients with doctors, we're not just writing code—we're improving lives.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="card-3d p-8 bg-gradient-to-br from-primary/5 to-primary/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-display font-bold text-foreground">Founded in 2014</div>
                  <div className="text-muted-foreground text-sm">Toronto, Canada</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                What started as a small team of three engineers has grown into a full-service development agency serving clients across North America, Europe, and Asia.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-3d p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-32 bg-background">
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
              Leadership Team
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Experienced leaders driving innovation and excellence
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-3d p-8 text-center"
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <div className="text-primary text-sm font-medium mb-2">{member.role}</div>
                <div className="text-muted-foreground text-sm">{member.specialty}</div>
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
              Let's Work Together
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 text-lg mb-8 max-w-2xl mx-auto"
            >
              Ready to start your next project? We'd love to hear from you and discuss how we can help.
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

export default AboutPage;
