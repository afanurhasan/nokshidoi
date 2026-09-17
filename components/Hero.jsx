'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Award, ShieldCheck, Check, Bus, Factory } from 'lucide-react';
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
            {/* মূল মোটো ব্যাজ */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-200/80 text-amber-900 border border-amber-300 text-xs font-black w-fit mb-3">
              <Sparkles size={14} className="text-amber-800" />
              <span>{BUSINESS_CONFIG.motto}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
              {BUSINESS_CONFIG.name} — <span className="text-amber-800">বগুড়ার ঐতিহ্যবাহী স্বাদ, পেশাদার পাইকারি সরবরাহের ঠিকানা</span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {BUSINESS_CONFIG.shortDescription}
            </p>

            {/* ৪টি মূল পণ্য বাটন */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-800">
              {[
                { name: 'দই', id: 'doi', icon: '🍶' },
                { name: 'রসমালাই', id: 'rasmalai', icon: '🥣' },
                { name: 'মিষ্টি', id: 'mishti', icon: '🍯' },
                { name: 'মাঠা ও ঘোল', id: 'matha', icon: '🥛' },
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

            {/* বিশ্বস্ততার মূল ৪টি প্রতীক */}
            <div className="mt-8 pt-6 border-t border-amber-200/70 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-800 text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-amber-800 shrink-0" />
                <span className="font-extrabold text-slate-900">BSTI ও ভ্যাট ট্যাক্স</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Factory size={16} className="text-amber-800 shrink-0" />
                <span className="font-extrabold text-slate-900">নিজস্ব দুগ্ধ কারখানা</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award size={16} className="text-amber-800 shrink-0" />
                <span className="font-extrabold text-slate-900">A & B Grade মান</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bus size={16} className="text-amber-800 shrink-0" />
                <span className="font-extrabold text-slate-900">প্যাসেঞ্জার বাস রুট</span>
              </div>
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