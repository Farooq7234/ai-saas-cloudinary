"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import {
  AudioWaveform,
  FileText,
  Music,
  Music3Icon,
  Server,
  Settings,
  Text,
  Video,
} from "lucide-react";
import LogoIcon from "@/assets/logo.svg";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function Features({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <section className="py-0 md:py-16 px-4 ">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-6xl font-medium text-center tracking-tighter">
          Elevate Your Media Optimization Efforts
        </h2>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto tracking-tight text-center mt-5">
          From small startups to large enterprises, our AI-driven tool has
          revolutionized the way businesses handle media. Effortlessly compress
          images and videos, adjust them for any social media aspect ratio.
        </p>
      </div>
      <div
        className={cn(
          "relative flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg md:shadow-xl",
          className
        )}
        ref={containerRef}
      >
        <div className="flex size-full flex-row items-stretch justify-between gap-10 px-10 max-w-lg">
          <div className="flex flex-col justify-center gap-2">
            <Circle ref={div1Ref}>
              <Icons.fileText />
            </Circle>
            <Circle ref={div2Ref}>
              <Icons.audioWaveform />
            </Circle>
            <Circle ref={div3Ref}>
              <Icons.musi3Icon />
            </Circle>
            <Circle ref={div4Ref}>
              <Icons.music />
            </Circle>
            <Circle ref={div5Ref}>
              <Icons.video />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div6Ref} className="size-16">
              <LogoIcon className="h-8 w-8 text-black" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div7Ref}>
              <Icons.server />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
        />
      </div>
    </section>
  );
}

const Icons = {
  fileText: () => <FileText className="w-10 h-10 text-black" />,
  settings: () => <LogoIcon className="h-8 w-8" />,

  video: () => <Video className="w-10 h-10 text-black" />,
  music: () => <Music className="w-10 h-10 text-black" />,
  googleDocs: () => <AudioWaveform className="w-10 h-10 text-black" />,
  audioWaveform: () => <Text className="w-10 h-10 text-black" />,
  musi3Icon: () => <Music3Icon className="w-10 h-10 text-black" />,
  server: () => <Server className="w-10 h-10 text-black" />,
};
