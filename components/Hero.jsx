'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Award, ShieldCheck, Check } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';

export default function Hero() {
  return (
    <div className="mx-4 sm:mx-6 my-4 sm:my-8">
      {/* একটি সুসংহত প্রিমিয়াম হিরো কার্ড যেখানে বামে কন্টেন্ট এবং ডানে ১৬:৯ ব্যানার */}
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-amber-50 via-[#FFFBEB] to-[#FEF3C7] rounded-3xl p-6 sm:p-10 lg:p-12 border border-amber-200/80 shadow-xs relative overflow-hidden">
        {/* ব্যাকগ্রাউন্ড সফট গ্লো */}
        <div className="absolute -right-20 -top-20 size-80 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 size-72 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* বাম কলাম: টেক্সট, হাইলাইটস, বাটন ও ট্রাস্ট ব্যাজ (৭ কলাম) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              বগুড়ার শেরপুরের ঐতিহ্যবাহী খাঁটি <span className="text-amber-800">দই, মিষ্টি, রসমালাই ও মাঠা</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {BUSINESS_CONFIG.shortDescription}
            </p>

            {/* ৪টি মূল পণ্য বাটন */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-800">
              {[
                { name: 'দই', id: 'doi', icon: '🍶' },
                { name: 'মিষ্টি', id: 'mishti', icon: '🍯' },
                { name: 'রসমালাই', id: 'rasmalai', icon: '🥣' },
                { name: 'মাঠা', id: 'matha', icon: '🥛' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('select-product-category', { detail: item.id }));
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-1.5 bg-white/95 hover:bg-amber-800 hover:text-white px-3.5 py-1.5 rounded-full border border-amber-300 text-slate-800 shadow-2xs transition-all cursor-pointer font-bold"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>

            {/* বাটনসমূহ */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <WhatsAppButton
                size="lg"
                label="হোয়াটসঅ্যাপে অর্ডার করুন"
                className="!bg-[#25D366] !text-white shadow-md hover:scale-102 font-bold"
              />
              <Link
                href="#products"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
              >
                <span>সব পণ্য দেখুন</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* বিশ্বস্ততার ৩টি প্রতীক */}
            <div className="mt-8 pt-6 border-t border-amber-200/70 grid grid-cols-3 gap-3 text-slate-800 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-amber-700 shrink-0" />
                <span className="font-bold text-slate-900">১০০% খাঁটি দুধ</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-700 shrink-0" />
                <span className="font-bold text-slate-900">মাটির হাঁড়িতে জমানো</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} className="text-amber-700 shrink-0" />
                <span className="font-bold text-slate-900">পাইকারী ও খুচরা</span>
              </div>
            </div>
          </div>

          {/* ডান কলাম: ১৬:৯ অফিশিয়াল ব্যানার ইমেজ (৫ কলাম, কোনো অতিরিক্ত বক্স ছাড়া) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group hover:shadow-2xl transition-all duration-300 aspect-[16/9]">
              <img
                src="/hero.jpeg"
                alt="নকশী দই ভাণ্ডার অফিশিয়াল ব্যানার"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}