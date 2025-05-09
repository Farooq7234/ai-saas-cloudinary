import  Header  from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero";

function Page() {
  return (
    <main className="bg-black text-white">
      <Header />
      <Hero />
      <LogoTicker />
      <Features />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}

export default Page;
