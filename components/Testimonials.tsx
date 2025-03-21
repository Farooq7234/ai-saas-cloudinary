"use client";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "“This AI tool has made resizing and compressing images for social media effortless and accurate!”",
    name: "Sophia Perez",
    title: "Content Manager @ Quantum",
    avatarImg: avatar1,
  },
  {
    text: "“We’ve saved countless hours by using the automated video compression and optimization features.”",
    name: "Jamie Lee",
    title: "Founder @ Pulse",
    avatarImg: avatar2,
  },
  {
    text: "“The intelligent cropping feature ensures that the most important parts of the image always stay in focus.”",
    name: "Alisa Hester",
    title: "Photographer @ Innovate",
    avatarImg: avatar3,
  },
  {
    text: "“Our team's productivity has increased significantly since we started using this tool”",
    name: "Alec Whitten",
    title: "CTO @ Tech Solutions",
    avatarImg: avatar4,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h2 className="text-5xl md:text-6xl text-center tracking-tighter">
          Beyond Expectations
        </h2>
        <p className="text-white/70 text-lg md:text-xl text-center mt-5 tracking-tight max-w-sm mx-auto">
          Our revolutionary AI SAAS tools have transformed our clients
          strategies
        </p>
        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: "-50%" }}
            animate={{ translateX: "0" }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            className="flex gap-5 pr-5 flex-none"
          >
           {[...testimonials, ...testimonials].map((testimonial, index) => (
  <div
    key={`${testimonial.name}-${index}`} // Unique key by appending index
    className="border border-white/15 p-6 md:p-10 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-md flex-none"
  >
    <div className="text-lg tracking-tight md:text-2xl">
      {testimonial.text}
    </div>
    <div className="flex gap-3 items-center mt-5">
      <div className="relative after:content-[''] after:absolute after:inset-0 after:bg-[#8C45F4] after:mix-blend-soft-light before:absolute before:content-[''] before:inset-0 before:border-white/30 before:z-10 before:rounded-lg">
        <Image
          src={testimonial.avatarImg}
          alt={`Avatar for ${testimonial.name}`}
          className="w-11 h-11 rounded-lg grayscale"
        />
      </div>
      <div>
        <div>{testimonial.name}</div>
        <div className="text-white/50 text-sm">{testimonial.title}</div>
      </div>
    </div>
  </div>
))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
