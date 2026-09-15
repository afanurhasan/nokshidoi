import { Hind_Siliguri, Outfit } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG } from "@/config/business";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-bengali",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-outfit",
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: `${BUSINESS_CONFIG.name} | বগুড়ার ঐতিহ্যবাহী খাঁটি মাটির হাঁড়ির দই`,
  description: `${BUSINESS_CONFIG.tagline}। ${BUSINESS_CONFIG.shortDescription}`,
  keywords: [
    "নকশী দই",
    "বগুড়ার মিষ্টি দই",
    "মাটির হাঁড়ির দই",
    "খাঁটি টক দই",
    "শাহী ক্ষীর দই",
    "বিয়ে ও মেজবানের দই",
    "খাঁটি গরুর দুধের দই",
    "ঢাকা দই হোম ডেলিভারি",
    "পাইকারি দই",
  ],
  authors: [{ name: "নকশী দই" }],
  openGraph: {
    title: `${BUSINESS_CONFIG.name} | বগুড়ার ঐতিহ্যবাহী খাঁটি মাটির হাঁড়ির দই`,
    description: BUSINESS_CONFIG.tagline,
    url: "https://nokshidoi.com",
    siteName: BUSINESS_CONFIG.name,
    locale: "bn_BD",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className={`${hindSiliguri.className} antialiased min-h-screen flex flex-col bg-[#FFFDF7] text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
