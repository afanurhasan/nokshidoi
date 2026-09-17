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
  title: `${BUSINESS_CONFIG.name} — ${BUSINESS_CONFIG.motto}`,
  description: `${BUSINESS_CONFIG.name} — বগুড়াভিত্তিক একটি দুগ্ধজাত খাদ্য উৎপাদন ও পাইকারি সরবরাহকারী প্রতিষ্ঠান। নিজস্ব কারখানায় দই, মিষ্টি, রসমালাই, মাঠা, ঘোল ও খাঁটি গাওয়া ঘিসহ বিভিন্ন খাদ্যপণ্য উৎপাদন ও দেশব্যাপী পাইকারি সরবরাহ করা হয়।`,
  keywords: [
    "নকশি দই ভান্ডার",
    "বগুড়ার দই পাইকারি",
    "দই পাইকারি সরবরাহ",
    "রসমালাই পাইকারি",
    "BSTI অনুমোদিত দই",
    "গার্মেন্টস ফ্যাক্টরি খাদ্য সরবরাহ",
    "হোটেল রেস্টুরেন্ট দই মিষ্টি",
    "মাঠা ও ঘোল পাইকারি",
    "খাঁটি গাওয়া ঘি বগুড়া",
    "A Grade দই",
    "B Grade দই",
  ],
  authors: [{ name: "নকশি দই ভান্ডার" }],
  openGraph: {
    title: `${BUSINESS_CONFIG.name} — ${BUSINESS_CONFIG.motto}`,
    description: "বগুড়ার ঐতিহ্যবাহী স্বাদ, পেশাদার পাইকারি সরবরাহের ঠিকানা। নিজস্ব কারখানায় উৎপাদন ও দেশব্যাপী বাস রুটে পাইকারি ডেলিভারি।",
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
