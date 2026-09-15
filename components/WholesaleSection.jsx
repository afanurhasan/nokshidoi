'use client';

import React from 'react';
import Image from 'next/image';
import { BUSINESS_CONFIG, getWhatsAppWholesaleUrl } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import { CheckCircle2 } from 'lucide-react';

export default function WholesaleSection() {
  const benefits = [
    {
      title: "বিয়ে ও মেজবানি আয়োজন",
      desc: "১০০ থেকে ৫,০০০+ মেহমানের জন্য ৫ ও ১০ কেজির সুসজ্জিত ঐতিহ্যবাহী বড় মাটির হাঁড়ি ও কাপ সরবরাহ।",
    },
    {
      title: "রেস্তোরাঁ ও মিষ্টির দোকান",
      desc: "প্রতিদিন সকালে রান্নার ঘন টক দই ও স্পেশাল মিষ্টি দইয়ের নির্ভরযোগ্য ও সুলভ পাইকারি সরবরাহ।",
    },
    {
      title: "করপোরেট উপহার ও গিফট হ্যাম্পার",
      desc: "উৎসবের শুভেচ্ছা জানাতে বিশেষ বাঁশের ডালায় বর-কনে বা প্রতিষ্ঠানের নাম খোদাই করা নকশী হাঁড়ি।",
    },
    {
      title: "সময়মতো ঠান্ডা ও অক্ষত ডেলিভারি",
      desc: "বিশেষ শক-প্রুফ খাঁচায় পরিবহনের কারণে একটি হাঁড়িও ভাঙে না এবং দই থাকে ঠান্ডা ও জমাট।",
    },
  ];

  return (
    <section id="wholesale" className="scroll-mt-20 py-14 sm:py-20 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 size-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 size-80 bg-orange-700/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* বাম কন্টেন্ট */}
            <div className="lg:col-span-7">
              <span className="inline-block px-3.5 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-black uppercase tracking-wider mb-4">
                &ldquo;{BUSINESS_CONFIG.motto}&rdquo;
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                সরাসরি কারখানা থেকে পাইকারি সরবরাহ, <span className="text-amber-400">সারা বাংলাদেশে ডেলিভারি</span>
              </h2>
              <p className="mt-4 text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {BUSINESS_CONFIG.wholesale.description}
              </p>
              <p className="mt-2 text-xs text-amber-300 font-bold">
                {BUSINESS_CONFIG.wholesale.minimumOrderNotice}
              </p>

              {/* সুবিধাসমূহ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{b.title}</h4>
                      <p className="text-[11px] sm:text-xs text-amber-200/80 mt-0.5 leading-tight">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* বাটনসমূহ */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <WhatsAppButton
                  isWholesale={true}
                  size="lg"
                  label={BUSINESS_CONFIG.wholesale.ctaText}
                  className="!bg-[#25D366] !text-white shadow-lg"
                />
              </div>
            </div>

            {/* ডানপাশের ছবি */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-4 border-amber-700/40 shadow-2xl aspect-[4/3] w-full max-w-lg mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
                  alt="বিয়ে ও মেজবানের স্পেশাল শাহী হাঁড়ি"
                  fill
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6">
                  <span className="text-amber-400 font-bold text-xs">ঐতিহ্যবাহী নকশী মাটির পাত্র</span>
                  <h4 className="text-white text-lg font-black">৫ কেজি ও ১০ কেজির মেগা হাঁড়ি</h4>
                  <p className="text-xs text-slate-300 mt-1">অনুষ্ঠানের ২৪-৪৮ ঘণ্টা পূর্বে প্রি-অর্ডারে বিশেষ সুবিধা</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
