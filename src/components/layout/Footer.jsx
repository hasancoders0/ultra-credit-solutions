import Image from "next/image";
import Link from "next/link";

import { footerContent, siteInfo, siteSettings } from "@/data/site";

import { Mail, MapPin, ArrowUpRight } from "lucide-react";

import { FaFacebookF, FaInstagram } from "react-icons/fa";

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
  {
    name: "Facebook",
    href: siteInfo.socialLinks.facebook,
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: siteInfo.socialLinks.instagram,
    icon: FaInstagram,
  },
].filter((social) => social.href);

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const exploreColumn = footerContent.columns.find(
    (column) => column.title === "Explore",
  );

  const supportColumn = footerContent.columns.find(
    (column) => column.title === "Support",
  );

  return (
    <footer className="mt-auto bg-[#081828] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:gap-10 lg:py-14 xl:gap-16">
          {/* Brand & Social Media */}
          <div className="min-w-0">
            <Link
              href="/"
              aria-label={`${siteInfo.name} home`}
              className="inline-flex shrink-0"
            >
              <Image
                src={siteSettings.footerLogo}
                alt="Ultra Credit Solutions USA"
                width={220}
                height={70}
                priority
                className="h-auto w-[180px] object-contain sm:w-[200px]"
              />
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#AAB7C8]">
              {footerContent.description}
            </p>

            {/* Social Media */}
            {socialLinks.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#B8C4D5]">
                  Follow Us
                </p>

                <div className="flex items-center gap-3">
                  {socialLinks.map(({ name, href, icon: Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${name} profile`}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-[#B8C4D5] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF6B81]/50 hover:bg-[#FF6B81] hover:text-[#081828]"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Explore Menu */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              {exploreColumn?.title || "Explore"}
            </h2>

            <div className="mt-3 h-0.5 w-8 rounded-full bg-[#FF6B81]" />

            <ul className="mt-5 space-y-3">
              {exploreColumn?.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#AAB7C8] transition-colors duration-200 hover:text-white"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Menu */}
          <div>
            <h2 className="text-sm font-semibold text-white">
              {supportColumn?.title || "Support"}
            </h2>

            <div className="mt-3 h-0.5 w-8 rounded-full bg-[#FF6B81]" />

            <ul className="mt-5 space-y-3">
              {supportColumn?.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#AAB7C8] transition-colors duration-200 hover:text-white"
                  >
                    <span>{link.label}</span>

                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="min-w-0">
            <h2 className="text-sm font-semibold text-white">
              {footerContent.contact.title}
            </h2>

            <div className="mt-3 h-0.5 w-8 rounded-full bg-[#FF6B81]" />

            <div className="mt-5 space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                  <MapPin
                    aria-hidden="true"
                    className="h-[18px] w-[18px] text-[#FF8294]"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-sm font-medium text-white">
                    Our Address
                  </h3>

                  <p className="mt-1.5 break-words text-sm leading-6 text-[#AAB7C8]">
                    {footerContent.contact.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.05]">
                  <Mail
                    aria-hidden="true"
                    className="h-[18px] w-[18px] text-[#FF8294]"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-sm font-medium text-white">
                    Email Address
                  </h3>

                  <a
                    href={`mailto:${footerContent.contact.email}`}
                    className="mt-1.5 inline-block break-all text-sm leading-6 text-[#AAB7C8] transition-colors duration-200 hover:text-white"
                  >
                    {footerContent.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="group mt-6 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#FF6B81] px-4 py-2.5 text-sm font-semibold !text-[#081828] transition-colors duration-200 hover:bg-[#FF8294] hover:!text-[#081828]"
            >
              <span>Contact Us</span>

              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-6 text-[#AAB7C8] sm:text-sm">
              © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
            </p>

            <Link
              href="/privacy-policy"
              className="text-xs text-[#AAB7C8] transition-colors duration-200 hover:text-white sm:text-sm"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
