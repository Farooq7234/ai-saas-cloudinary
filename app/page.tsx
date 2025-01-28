import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { Footer } from "@/components/Footer";

function Page() {
  return (
    <main className="min-h-screen bg-black">
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
