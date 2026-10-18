import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ultracreditsolutions.net/"),
  title: {
    default: "Ultra Credit Solutions USA",
    template: "%s | Ultra Credit Solutions USA",
  },
  description:
    "Learn about Ultra Credit Solutions USA and explore our services, educational resources, and available support options.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}

        <Toaster position="top-right" richColors closeButton duration={4000} />
      </body>
    </html>
  );
}
