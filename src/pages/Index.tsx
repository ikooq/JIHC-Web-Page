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

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <OfferingsSection />
      <CasesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
