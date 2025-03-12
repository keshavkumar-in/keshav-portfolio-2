// src/app/page.tsx
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import StatsSection from "@/components/StatsSection/StatsSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection/PortfolioSection.";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
    </main>
  );
}
