"use client";
import { Spotlight } from "../components/ui/Spotlight";
import { Button } from "@/components/ui/moving-border";
import { FastForward, Shield, ShieldIcon, Upload } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { useTheme } from "next-themes";
import { Splash } from "next/font/google";

function HeroSection() {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen">
      <Spotlight className="top-10 left-0 md:left-60 md:-top-20" fill="white" />
      <div className=" relative h-full  w-full text-center">
        <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col gap-4 items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
            Compress Anything with Ease
          </p>
          <p className="text-base sm:text-xl  relative z-20 pb-4 w-[80%]">
            Store and compress any type of file with ease in our secure cloud
            storage, saving storage space and reducing upload times.
          </p>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800 "
          >
            <Upload className="mr-4" /> Upload Files
          </Button>
        </div>
        <section className="p-10 bg-gray-900">
          <p className="text-3xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-5">
            OUR SERVICES
          </p>
          <div
            className={
              "flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row"
            }
          >
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-xl shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className="flex flex-col justify-center items-center gap-4">
                <Upload />
                <p>Secure Cloud Storage</p>
              </div>
            </MagicCard>
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-xl shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className="flex flex-col justify-center items-center gap-4">
                <FastForward />
                <p>Efficient File Compression</p>
              </div>
            </MagicCard>
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-xl shadow-2xl"
              gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
            >
              <div className="flex flex-col justify-center items-center gap-4">
                <ShieldIcon />
                <p>Advanced Security</p>
              </div>
            </MagicCard>
          </div>
        </section>
      </div>
    </main>
  );
}

export default HeroSection;
