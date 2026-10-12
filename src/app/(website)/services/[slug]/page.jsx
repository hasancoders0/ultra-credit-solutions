import { notFound } from "next/navigation";
import { services } from "@/data/services";
import Hero from "@/components/services/SingleHero";
import Content from "@/components/services/SingleContent";
import CTA from "@/components/services/SingleCTA";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Ultra Credit Solutions Inc.",
    };
  }

  return {
    title: `${service.title} | Ultra Credit Solutions Inc.`,
    description: service.description,
  };
}

export default async function SingleServicePage({ params }) {
  const { slug } = await params;

  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <Hero service={service} />
      <Content service={service} />
      <CTA />
    </main>
  );
}