import Image from "next/image";
import Link from "next/link";

import MainNav from "@/components/layout/MainNav";
import MobileNav from "@/components/layout/MobileNav";
import { siteSettings } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E8EDF5] bg-white">
      <div className="mx-auto flex min-h-[76px] w-full max-w-[1440px] items-center justify-between gap-5 px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ultra Credit Solutions USA - Home"
          className="shrink-0"
        >
          <Image
            src={siteSettings.logo}
            alt="Ultra Credit Solutions USA"
            width={200}
            height={65}
            priority
            className="h-auto w-[150px] object-contain sm:w-[175px] lg:w-[190px]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <MainNav />
        </div>

        {/* Desktop Client Login */}
        <div className="hidden shrink-0 lg:flex lg:items-center">
          <a
            href="https://www.secureclientaccess.com/login"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-sm font-semibold text-[#2852A0] transition-colors duration-200 hover:text-[#FF6B81] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
          >
            Already a client? Login
          </a>
        </div>

        {/* Mobile Navigation */}
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}