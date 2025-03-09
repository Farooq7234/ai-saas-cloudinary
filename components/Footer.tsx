import Logo from "@/assets/logo.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="py-5 border-t border-white/15 flex justify-around items-center px-4">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          <div className="flex gap-2 items-center lg:flex-1">
          <Image src={Logo}  alt="Logo" width={32} height={32} />
            
            <div className="font-medium">Quality Keeper</div>
          </div>
          <nav className="flex flex-col lg:flex-row lg:gap-7 lg:flex-1 gap-5 justify-center">
            <a
              href="#"
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Features
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Developers
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Company
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Blog
            </a>
            <a
              href="#"
              className="text-white/70 hover:text-white text-xs md:text-sm transition"
            >
              Changelog
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};
