'use client';

import React from 'react';
import Image from 'next/image';
import { BUSINESS_CONFIG, getWhatsAppWholesaleUrl } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import { CheckCircle2, Clock, Truck, Award, Building2 } from 'lucide-react';

export default function WholesaleSection() {
  const benefits = [
    {
      title: "হোটেল, রেস্তোরাঁ ও সুপারশপ",
      desc: "প্রতিদিন রান্নার ঘন টক দই, মিষ্টি দই ও রসমালাইয়ের নিয়মিত ও নির্ভরযোগ্য পাইকারি সরবরাহ।",
    },
    {
      title: "গার্মেন্টস ফ্যাক্টরি ও করপোরেট ইভেন্ট",
      desc: "শতাধিক থেকে হাজার হাজার কর্মীর জন্য স্বাস্থ্যসম্মত ও পরিচ্ছন্ন পরিবেশে বিশেষ ব্যাচ উৎপাদন।",
    },
    {
      title: "বিয়ে, মেজবান ও সামাজিক উৎসব",
      desc: "১০০ থেকে ৫,০০০+ মেহমানের জন্য ৫ ও ১০ কেজির মাটির হাঁড়ি, কাপ দই ও স্পেশাল মিষ্টির ডালি।",
    },
    {
      title: "রিসেলার ও অনলাইন ব্যবসা",
      desc: "নিজস্ব শপ বা অনলাইন ডেলিভারি বিজনেসের জন্য বগুড়ার আসল স্বাদের দুগ্ধজাত পণ্যের নিয়মিত জোগান।",
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
                দেশব্যাপী পাইকারি সরবরাহ, <span className="text-amber-400">সরাসরি বগুড়ার কারখানা থেকে</span>
              </h2>
              <p className="mt-4 text-amber-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                {BUSINESS_CONFIG.wholesale.description}
              </p>

              {/* লিড টাইম নোটিশ বক্স */}
              <div className="mt-4 p-3.5 bg-amber-950/70 border border-amber-500/40 rounded-xl max-w-xl flex items-start gap-2.5">
                <Clock size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200 leading-relaxed font-bold">
                  {BUSINESS_CONFIG.wholesale.minimumOrderNotice}
                </p>
              </div>

              {/* সুবিধাসমূহ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
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
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <WhatsAppButton
                  isWholesale={true}
                  size="lg"
                  label={BUSINESS_CONFIG.wholesale.ctaText}
                  className="!bg-[#25D366] !text-white shadow-lg font-bold"
                />
                <a
                  href="#delivery-routes"
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition"
                >
                  বাস রুটসমূহ দেখুন
                </a>
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
                  <span className="text-amber-400 font-bold text-xs">ঐতিহ্যবাহী বগুড়ার মাটির হাঁড়ি</span>
                  <h4 className="text-white text-lg font-black">A Grade ও B Grade স্পেশাল বাল্ক হাঁড়ি</h4>
                  <p className="text-xs text-slate-300 mt-1">ব্যবসায়ী, গার্মেন্টস ও বড় প্রতিষ্ঠানের জন্য প্রতিদিনের তাজা ব্যাচ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
