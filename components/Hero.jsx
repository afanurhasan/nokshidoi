'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  return (
    <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 mb-2 sm:mb-4">
      {/* একটি সুসংহত প্রিমিয়াম হিরো কার্ড যেখানে বামে কন্টেন্ট এবং ডানে ১৬:৯ ব্যানার */}
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-amber-50 via-[#FFFBEB] to-[#FEF3C7] rounded-3xl p-6 sm:p-10 lg:p-12 border border-amber-200/80 shadow-xs relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড সফট গ্লো */}
        <div className="absolute -right-20 -top-20 size-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 size-72 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* বাম কলাম: টেক্সট, হাইলাইটস ও বাটন (৭ কলাম) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* মূল মোটো ব্যাজ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300 text-xs font-black w-fit mb-3">
              <Sparkles size={14} className="text-amber-800" />
              <span>{BUSINESS_CONFIG.motto}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              {BUSINESS_CONFIG.name}
            </h1>

            {/* পূর্বে “দই ভান্ডার” পরিচিতি ব্যাজ */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 border border-amber-300 text-xs font-bold w-fit shadow-2xs">
              <span>🏷️ পূর্বের নাম: “দই ভান্ডার”</span>
              <span className="text-amber-500 font-black">•</span>
              <span>সরকারি নিবন্ধনে এখন “নকশি দই ভান্ডার”</span>
            </div>

            <div className="mt-5 space-y-3 text-base sm:text-lg text-slate-800 leading-relaxed font-medium text-justify">
              <p>
                নকশি দই ভান্ডার বগুড়াভিত্তিক একটি দুগ্ধজাত খাদ্য উৎপাদন ও পাইকারি সরবরাহকারী প্রতিষ্ঠান। নিজস্ব কারখানায় দই, মিষ্টি, রসমালাই, মাঠা, ঘোল ও খাঁটি গাওয়া ঘিসহ বিভিন্ন খাদ্যপণ্য উৎপাদন করা হয়।
              </p>
              <p>
                দেশব্যাপী ব্যবসায়ী, হোটেল, রেস্টুরেন্ট, সুপারশপ, ক্যাটারিং, রিসেলার, অনলাইন ব্যবসা, গার্মেন্টস ফ্যাক্টরি ও বিভিন্ন প্রতিষ্ঠানে নিয়মিত পাইকারি সরবরাহ করা হয়।
              </p>
            </div>

            {/* মূল পণ্য তালিকা */}
            <div className="mt-5 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 px-4 py-2 rounded-xl bg-amber-100/70 border border-amber-200/80 text-xs sm:text-sm font-bold text-amber-950 w-fit">
              {[
                { name: 'দই', id: 'doi' },
                { name: 'রসমালাই', id: 'rasmalai' },
                { name: 'বিভিন্ন ধরনের মিষ্টি', id: 'mishti' },
                { name: 'মাঠা', id: 'matha' },
                { name: 'ঘোল', id: 'matha' },
                { name: 'খাঁটি গাওয়া ঘি', id: 'all' },
              ].map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        if (item.id !== 'all') {
                          window.dispatchEvent(new CustomEvent('select-product-category', { detail: item.id }));
                        }
                        const el = document.getElementById('products');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-amber-700 hover:underline transition-all cursor-pointer"
                  >
                    {item.name}
                  </button>
                  {idx < arr.length - 1 && <span className="text-amber-500 font-black select-none">•</span>}
                </React.Fragment>
              ))}
            </div>

            {/* বাটনসমূহ */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <WhatsAppButton
                size="lg"
                label="পাইকারি অর্ডারের জন্য WhatsApp"
                className="!bg-[#25D366] !text-white shadow-md hover:scale-102 font-bold"
              />
              <Link
                href="#order-process"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95"
              >
                <span>৫-ধাপের অর্ডার প্রসেস</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* ডান কলাম: ১৬:৯ অফিশিয়াল ব্যানার ইমেজ */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group hover:shadow-2xl transition-all duration-300 aspect-[16/9]">
              <img
                src="/hero.jpeg"
                alt="নকশি দই ভান্ডার অফিশিয়াল ব্যানার"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}