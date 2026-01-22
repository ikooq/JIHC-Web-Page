import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyUsSection from "@/components/sections/WhyUsSection";
import OfferingsSection from "@/components/sections/OfferingsSection";
import CasesSection from "@/components/sections/CasesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { BackToTop } from "@/components/ui/BackToTop";
import { PageLoader } from "@/components/ui/PageLoader";

const Index = () => {
  return (
    <PageLoader minDuration={1000}>
      <main className="min-h-screen overflow-x-hidden">
        <ScrollProgress />
        <Navbar />
        <BackToTop />
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <OfferingsSection />
        <CasesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </main>
    </PageLoader>
  );
};

export default Index;
