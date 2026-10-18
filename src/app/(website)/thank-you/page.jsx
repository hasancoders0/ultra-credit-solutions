
import Hero from "@/components/thank-you/Hero";

export const metadata = {
  title: "Thank You | Ultra Credit Solutions USA",
  description:
    "Your appointment request has been received by Ultra Credit Solutions USA.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage({ searchParams }) {
  const params = await searchParams;

  const name = typeof params?.name === "string" ? params.name : "";
  const email = typeof params?.email === "string" ? params.email : "";

  return <Hero name={name} email={email} />;
}
