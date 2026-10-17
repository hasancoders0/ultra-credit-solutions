
import Hero from "@/components/thank-you/Hero";

export const metadata = {
  title: "Thank You",
  description:
    "Thank you for contacting Ultra Credit Solutions USA. Your inquiry has been received.",
  alternates: {
    canonical: "/thank-you",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ThankYouPage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
