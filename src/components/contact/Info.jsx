import { MapPin, Mail, ArrowUpRight } from "lucide-react";
import { siteInfo } from "@/data/site";

const contactItems = [
  {
    id: "address",
    title: "Our Office",
    value: siteInfo.address,
    icon: MapPin,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteInfo.address
    )}`,
  },
  {
    id: "email",
    title: "Email Us",
    value: siteInfo.email,
    icon: Mail,
    href: `mailto:${siteInfo.email}`,
  },
];

export default function Info() {
  return (
    <section className="px-5 py-10 sm:py-14">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "address" ? "_blank" : undefined}
              rel={item.id === "address" ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-5 rounded-xl border border-[#EEEEEE] bg-white p-6 shadow-[0_4px_24px_rgba(8,24,40,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2852A0]/20 hover:shadow-lg sm:p-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FF6B81]/10 text-[#FF6B81]">
                <Icon size={23} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-[#081828]">
                  {item.title}
                </h2>

                <p className="mt-2 break-words text-sm leading-6 text-[#666666]">
                  {item.value}
                </p>
              </div>

              <ArrowUpRight
                size={18}
                className="shrink-0 text-[#888888] transition-colors group-hover:text-[#2852A0]"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}