
import LogoIcon from "@/assets/logo.svg";
import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Header() {


  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-50 backdrop-blur  flex justify-center items-center">
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 p-2.5  rounded-xl max-w-2xl mx-auto px-10">
          <div className="border border-white/15 flex justify-center items-center h-10 w-10">
          <Image src={LogoIcon} className="bg-gray-50" alt="Logo" width={32} height={32} />

          </div>
          <div>
            <Link href="/sign-in" passHref>
              <Button>Sign in</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
