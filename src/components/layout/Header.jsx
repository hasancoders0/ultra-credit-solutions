import Image from "next/image";
import Link from "next/link";

import MainNav from "@/components/layout/MainNav";
import MobileNav from "@/components/layout/MobileNav";
import { ArrowRight } from "lucide-react";
import { headerActions } from "@/data/navigation";
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

        {/* Desktop Get Started Button */}
        <div className="hidden shrink-0 lg:flex lg:items-center">
          {headerActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg border border-[#2852A0] bg-[#2852A0] px-6 py-3 text-sm font-semibold !text-white shadow-sm transition-colors duration-200 hover:border-[#1E417F] hover:bg-[#1E417F] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2852A0]"
            >
              <span>{action.label}</span>

              <ArrowRight
                size={17}
                strokeWidth={2}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="flex shrink-0 items-center lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
