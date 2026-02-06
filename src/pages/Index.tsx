import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import CasesSection from "@/components/sections/CasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import VideoTestimonialsSection from "@/components/sections/VideoTestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageLoader } from "@/components/ui/PageLoader";
import { ImpactDashboard } from "@/components/sections/ImpactDashboard";
import { SeoHead } from "@/components/seo/SeoHead";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useCopy } from "@/hooks/useCopy";

const Index = () => {
  const { get } = useCopy();

  return (
    <PageLoader minDuration={1000}>
      <SeoHead
        title={get("seo_index_title")}
        description={get("seo_index_description")}
      />
      <main id="main-content" tabIndex={-1} className="min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <BackToTop />
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ServicesSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <WhyUsSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <OfferingsSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <CasesSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TestimonialsSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <VideoTestimonialsSection />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ImpactDashboard />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ContactSection />
        </ScrollReveal>
        <Footer />
      </main>
    </PageLoader>
  );
};

export default Index;
