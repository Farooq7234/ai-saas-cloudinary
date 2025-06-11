import  Header  from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { WorldMapDemo } from "@/components/WorldMap";
import { Hero } from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";


function Page() {
  return (
    <main className="bg-black text-white">
      <Header />
      <Hero/>
      <LogoTicker />
      <Features />
      <PricingSection/>
      <Testimonials />
      <WorldMapDemo />
      <CallToAction />
      <Footer />
    </main>
  );
}

export default Page;
