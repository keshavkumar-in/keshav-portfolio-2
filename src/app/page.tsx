// src/app/page.tsx
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Proof from "@/components/home/Proof";
import SelectedWork from "@/components/home/SelectedWork";
import Services from "@/components/home/Services";
import Writing from "@/components/home/Writing";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Services />
        <Proof />
        <About />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
