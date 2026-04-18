import Navbar from "@/components/ui/Navbar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import Vision from "@/components/sections/Vision";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import WhoWeAre from "@/components/sections/WhoWeAre";
import ServicesGrid from "@/components/sections/ServicesGrid";
import VideoShowcase from "@/components/sections/VideoShowcase";
import SelectedWorks from "@/components/sections/SelectedWorks";
import Testimonials from "@/components/sections/Testimonials";
import Clients from "@/components/sections/Clients";
import Founders from "@/components/sections/Founders";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative bg-canvas flex flex-col">
      <NoiseOverlay opacity={0.04} />
      <Navbar />
      {/* SECTION 01 — HERO */}
      <Hero />
      {/* SECTION 02 — STATS BAR */}
      <StatsBar />
      {/* SECTION 03 — VISION */}
      <Vision />
      {/* SECTION 04 — SERVICES MARQUEE */}
      <ServiceMarquee />
      {/* SECTION 05 — WHO WE ARE */}
      <WhoWeAre />
      {/* SECTION 06 — SERVICES DEEP DIVE */}
      <ServicesGrid />
      {/* SECTION 07 — VIDEO SHOWCASE */}
      <VideoShowcase />
      {/* SECTION 08 — SELECTED WORKS */}
      <SelectedWorks />
      {/* SECTION 09 — TESTIMONIALS */}
      <Testimonials />
      {/* SECTION 10 — CLIENTS */}
      <Clients />
      {/* SECTION 11 — FOUNDERS */}
      <Founders />
      {/* SECTION 12 — CONTACT / CTA */}
      <Contact />
      {/* SECTION 13 — FOOTER */}
      <Footer />
    </main>
  );
}
