// src/app/page.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection.";
import SkillsSection from "@/components/SkillsSection";
import TimelineSection from "@/components/TimelineSection";
import TestimonialsSection from "@/components/TestimonialsSection";
// import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import FreelanceSection from "@/components/FreelanceSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <SkillsSection />
      <TimelineSection />
      <TestimonialsSection />
      {/* <ContactSection /> */}
      <BlogSection />
      <FreelanceSection />
      <FooterSection />
    </main>
  );
}
