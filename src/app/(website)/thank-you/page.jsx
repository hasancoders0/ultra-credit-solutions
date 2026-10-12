import Hero from "@/components/thank-you/Hero";

export const metadata = {
  title: "Thank You | Ultra Credit Solutions Inc.",
  description:
    "Thank you for contacting Ultra Credit Solutions. Your inquiry has been submitted successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <main>
      <Hero />
    </main>
  );
}