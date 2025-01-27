import { Hero } from "@/components/Hero";
import { Header } from "@/components/Header";
import { Testimonials } from "@/components/Testimonials";
import { LogoTicker } from "@/components/LogoTicker";
import { Features } from "@/components/Features";

function Page() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <LogoTicker />
      <Features />
      <Testimonials />
    </main>
  );
}

export default Page;
