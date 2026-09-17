'use client';

import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/config/business';
import { Phone, MapPin, Bus, ShieldCheck } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4405F">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689-.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000000">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF0000">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinksList = [
    { name: 'ফেসবুক', icon: FacebookIcon, url: BUSINESS_CONFIG.socialLinks.facebook },
    { name: 'ইনস্টাগ্রাম', icon: InstagramIcon, url: BUSINESS_CONFIG.socialLinks.instagram },
    { name: 'টিকটক', icon: TikTokIcon, url: BUSINESS_CONFIG.socialLinks.tiktok },
    { name: 'ইউটিউব', icon: YouTubeIcon, url: BUSINESS_CONFIG.socialLinks.youtube },
  ];

  return (
    <footer className="bg-stone-950 text-slate-400 text-xs border-t border-stone-800">
      {/* মূল ফুটার অংশ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-800/80">
          {/* কলাম ১: ব্র্যান্ড বিবরণ (৫ কলাম) */}
          <div className="md:col-span-5 space-y-3">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="bg-white p-2 rounded-xl shadow-md inline-flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="নকশি দই ভান্ডার লোগো"
                  className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-black text-white tracking-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="text-[10px] text-amber-400 font-bold">
                  “{BUSINESS_CONFIG.motto}”
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-stone-400 font-medium">
              {BUSINESS_CONFIG.shortDescription}
            </p>

            <div className="flex items-center gap-2 pt-1 text-amber-300 text-xs font-bold">
              <ShieldCheck size={16} />
              <span>BSTI অনুমোদিত ও সরকারি ভ্যাট-ট্যাক্স প্রত্যয়িত</span>
            </div>
          </div>

          {/* কলাম ২: প্রয়োজনীয় লিংক (৩ কলাম) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">গুরুত্বপূর্ণ তথ্য</h4>
            <ul className="space-y-2 text-stone-400 font-medium">
              <li><Link href="/#products" className="hover:text-amber-400 transition">আমাদের পণ্য সম্ভার</Link></li>
              <li><Link href="/#order-process" className="hover:text-amber-400 transition">৫-ধাপের অর্ডার প্রসেস</Link></li>
              <li><Link href="/#delivery-routes" className="hover:text-amber-400 transition">প্যাসেঞ্জার বাস রুটসমূহ</Link></li>
              <li><Link href="/#contact" className="hover:text-amber-400 transition">যোগাযোগ ও শোরুম</Link></li>
            </ul>
          </div>

          {/* কলাম ৩: ঠিকানা ও সোশ্যাল (৪ কলাম) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">যোগাযোগ ও শোরুম</h4>
            <p className="text-stone-400 flex items-start gap-2">
              <MapPin size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <span>{BUSINESS_CONFIG.showroomAddress} (খুচরা বিক্রয় শুধুমাত্র শোরুমে)</span>
            </p>
            <p className="text-stone-400 flex items-center gap-2">
              <Phone size={15} className="text-amber-400 shrink-0" />
              <span>পাইকারি WhatsApp: <strong className="text-white font-mono">{BUSINESS_CONFIG.whatsappNumberDisplay}</strong></span>
            </p>
            <p className="text-stone-400 flex items-center gap-2">
              <Bus size={15} className="text-amber-400 shrink-0" />
              <span>প্যাসেঞ্জার বাসে দেশব্যাপী নির্ধারিত স্টপেজে সরবরাহ</span>
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-stone-400 block mb-2">সোশ্যাল মিডিয়া:</span>
              <div className="flex items-center gap-2.5">
                {socialLinksList.map((item, i) => (
                  <a
                    key={i}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={item.name}
                    className="size-9 rounded-xl bg-white hover:bg-amber-50 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                  >
                    <item.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* কপিরাইট */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400 text-center sm:text-left font-medium">
          <p>
            &copy; {currentYear} <strong>{BUSINESS_CONFIG.name}</strong>। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <p>
            {BUSINESS_CONFIG.motto}
          </p>
        </div>
      </div>
    </footer>
  );
}