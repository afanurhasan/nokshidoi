'use client';

import React from 'react';
import { Quote, Star } from 'lucide-react';
import Title from './Title';

export default function ReviewMarquee({ customReviewsRow1 = [], customReviewsRow2 = [] }) {
  // প্রাথমিক রিভিউ ডাটা (ইউজারের স্ক্রিনশট অনুযায়ী সহজে আপডেটযোগ্য)
  const defaultRow1 = [
    {
      id: 1,
      quote: "বগুড়ার আসল দইয়ের যে স্বাদ ও নিখুঁত পুরু সর, নকশী দই ভাণ্ডারে সেটাই পেয়েছি। পরিবারের সবাই খেয়ে অত্যন্ত প্রশংসা করেছে।",
      author: "তানভীর আহমেদ",
      role: "নিয়মিত ক্রেতা, ঢাকা",
      rating: 5,
    },
    {
      id: 2,
      quote: "মেয়ের বিয়ের অনুষ্ঠানের জন্য ২০ হাঁড়ি দই নিয়েছিলাম। প্রতিটি হাঁড়ি ঠান্ডা ও অক্ষত ছিল। মেহমানরা দইয়ের স্বাদের ভূয়সী প্রশংসা করেছে।",
      author: "আলহাজ্ব রফিকুল ইসলাম",
      role: "পারিবারিক অনুষ্ঠান",
      rating: 5,
    },
    {
      id: 3,
      quote: "শেরপুরের বিখ্যাত শাহী রসমালাই সত্যিই অসাধারণ! মালাইয়ের ঘন ভাব ও ছানার নরম গুটি মুখে দিলেই গলে যায়।",
      author: "নাজমুল হাসান",
      role: "উত্তরা, ঢাকা",
      rating: 5,
    },
    {
      id: 4,
      quote: "খাঁটি মাঠা এত সুস্বাদু হতে পারে এদেরটা না খেলে বুঝতাম না। বিরিয়ানি বা ভারী খাবারের পর এক গ্লাস মাঠা এককথায় অমৃত।",
      author: "ফারহানা পারভীন",
      role: "গৃহিণী",
      rating: 5,
    },
    {
      id: 5,
      quote: "অনলাইনে অর্ডার করে এত দ্রুত শেরপুর থেকে তাজা মিষ্টি ও চমচম পাব আশা করিনি। খাঁটি ছানার মিষ্টির আসল স্বাদ!",
      author: "সাকিব মাহমুদ",
      role: "বনানী, ঢাকা",
      rating: 5,
    },
  ];

  const defaultRow2 = [
    {
      id: 6,
      quote: "আমাদের রেস্তোরাঁর জন্য নিয়মিত দই ও মিষ্টি নেই। কোয়ালিটি সবসময় এক থাকে এবং কোনো ভেজাল ছাড়া খাঁটি দুধের স্বাদ পাই।",
      author: "রেদওয়ানুল করিম",
      role: "রেস্তোরাঁ স্বত্বাধিকারী",
      rating: 5,
    },
    {
      id: 7,
      quote: "“বিশুদ্ধতায় লক্ষ্য, তৃপ্তিতেই সন্তুষ্টি” — এদের কথার সাথে কাজের শতভাগ মিল। মাটির পাত্রে জমানো দইয়ের তুলনাই হয় না।",
      author: "মো: আরিফুল ইসলাম",
      role: "ব্যাংকার, বগুড়া",
      rating: 5,
    },
    {
      id: 8,
      quote: "স্পেশাল চমচম আর কালোজাম দুইটাই মুখে লেগে থাকার মতো। প্যাকেজিং অত্যন্ত নিরাপদ ছিল, এতটুকুও রস নষ্ট হয়নি।",
      author: "জান্নাতুল ফেরদৌস",
      role: "মিরপুর, ঢাকা",
      rating: 5,
    },
    {
      id: 9,
      quote: "বগুড়ায় বেড়াতে গিয়ে এদের শোরুম থেকে দই নিয়ে এসেছিলাম। এখন ঢাকা থেকেই সরাসরি অর্ডার করি, স্বাদ সবসময় সেরা।",
      author: "ইশতিয়াক চৌধুরী",
      role: "গুলশান, ঢাকা",
      rating: 5,
    },
    {
      id: 10,
      quote: "অফিসের বাৎসরিক মেজবানে ৫০ কেজি মিষ্টি দই ও ১০০ লিটার মাঠা অর্ডার করেছিলাম। সময়মতো ডেলিভারি ও চমৎকার স্বাদ!",
      author: "মাহমুদুর রহমান",
      role: "করপোরেট ক্লায়েন্ট",
      rating: 5,
    },
  ];

  const row1 = customReviewsRow1.length > 0 ? customReviewsRow1 : defaultRow1;
  const row2 = customReviewsRow2.length > 0 ? customReviewsRow2 : defaultRow2;

  // ইনফিনিট লুপের জন্য ডুপ্লিকেট
  const list1 = [...row1, ...row1];
  const list2 = [...row2, ...row2];

  const ReviewCard = ({ item }) => (
    <div className="w-[300px] sm:w-[380px] bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between shrink-0 select-none">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="size-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Quote size={20} className="rotate-180 fill-emerald-600" />
          </div>
          <div className="flex items-center gap-0.5 text-amber-500">
            {[...Array(item.rating || 5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100">
        <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
          {item.author}
        </h4>
        {item.role && (
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
            {item.role}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-amber-50/40 to-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14">
        <Title
          badge="গ্রাহকদের সন্তুষ্টি"
          title="গ্রাহকদের ভালোবাসা ও মতামত"
          subtitle="“বিশুদ্ধতায় লক্ষ্য, তৃপ্তিতেই সন্তুষ্টি”"
          description="আমাদের খাঁটি দই, মিষ্টি, রসমালাই ও মাঠা খেয়ে সারা দেশের সম্মানিত গ্রাহকদের বাস্তব অভিজ্ঞতা ও মূল্যায়ন।"
        />
      </div>

      {/* দুই লাইনের দ্বিমুখী ইনফিনিট স্লাইডার */}
      <div className="relative w-full space-y-6">
        {/* দুই পাশে ফেইড ইফেক্ট */}
        <div className="absolute left-0 top-0 h-full w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-r from-[#FFFDF7] to-transparent" />
        <div className="absolute right-0 top-0 h-full w-16 sm:w-32 z-20 pointer-events-none bg-gradient-to-l from-[#FFFDF7] to-transparent" />

        {/* লাইন ১: ডান থেকে বামে যাবে */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-left flex gap-5">
            {list1.map((item, idx) => (
              <ReviewCard key={`r1-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* লাইন ২: বাম থেকে ডানে যাবে */}
        <div className="overflow-hidden flex">
          <div className="animate-marquee-right flex gap-5">
            {list2.map((item, idx) => (
              <ReviewCard key={`r2-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
