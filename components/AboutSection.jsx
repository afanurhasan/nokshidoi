'use client';

import React from 'react';
import Image from 'next/image';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import { ShieldCheck, CheckCircle2, Factory, Award, Building } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* বাম কলাম: ছবির শোকেস */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-amber-200/80 shadow-2xl aspect-[4/5] max-w-md mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80"
                alt="মাটির হাঁড়িতে খাঁটি দই তৈরি"
                fill
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-amber-400 text-xs font-black uppercase tracking-wider">
                  নিজস্ব কারখানায় স্বাস্থ্যসম্মত উৎপাদন
                </span>
                <h4 className="text-xl font-black mt-1">ঐতিহ্যবাহী বগুড়ার আসল কারিগরি</h4>
                <p className="text-xs text-amber-100/90 mt-1 font-medium">
                  পোড়ামাটির ছিদ্রযুক্ত পাত্র ও খাঁটি তরল দুধে প্রাকৃতিকভাবে জমানো ঘন সুস্বাদু দই।
                </p>
              </div>
            </div>

            {/* ভাসমান ব্যাজ */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-white border border-amber-200 rounded-2xl p-4 shadow-xl max-w-[210px] z-10 hidden sm:block">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldCheck size={20} />
                <span className="text-xs font-black text-slate-900">BSTI ও ভ্যাট নিবন্ধিত</span>
              </div>
              <p className="text-[10px] text-slate-600 mt-1 leading-tight font-medium">
                প্রয়োজনীয় সরকারি অনুমোদন ও কাগজপত্রসহ শতভাগ নিরাপদ ও বিশ্বস্ত।
              </p>
            </div>
          </div>

          {/* ডান কলাম: বিবরণ */}
          <div className="lg:col-span-7 flex flex-col">
            <Title
              align="left"
              badge={`“${BUSINESS_CONFIG.motto}”`}
              title="বগুড়ার ঐতিহ্যবাহী স্বাদ, পেশাদার পাইকারি সরবরাহের ঠিকানা"
              subtitle="বগুড়াভিত্তিক দুগ্ধজাত খাদ্য উৎপাদন ও সরবরাহকারী প্রতিষ্ঠান"
            />

            <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <p>
                <strong>{BUSINESS_CONFIG.name}</strong> বগুড়াভিত্তিক একটি প্রতিষ্ঠিত দুগ্ধজাত খাদ্য উৎপাদন ও পাইকারি সরবরাহকারী প্রতিষ্ঠান। নিজস্ব কারখানায় প্রতিদিনের তাজা দুধে তৈরি হয় দই, মিষ্টি, রসমালাই, মাঠা, ঘোল ও খাঁটি গাওয়া ঘিসহ ঐতিহ্যবাহী খাদ্যপণ্য।
              </p>
              <p>
                দেশব্যাপী ব্যবসায়ী, হোটেল, রেস্টুরেন্ট, সুপারশপ, ক্যাটারিং, রিসেলার, অনলাইন ব্যবসা, গার্মেন্টস ফ্যাক্টরি ও বিভিন্ন করপোরেট প্রতিষ্ঠানে আমরা নিয়মিত বিশ্বস্ততার সাথে পাইকারি সরবরাহ পরিচালনা করি।
              </p>
              <p>
                গ্রাহক ও প্রতিষ্ঠানের নির্দিষ্ট চাহিদা ও বাজেটের কথা বিবেচনা করে আমাদের পণ্য <strong>A Grade (High Quality)</strong> ও <strong>B Grade (Medium Quality)</strong>-তে সরবরাহ করা হয়। <em>আমরা কোনো প্রকার Low Quality পণ্য নিয়মিত পণ্যমান হিসেবে রাখি না।</em>
              </p>
            </div>

            {/* প্রধান ৪টি অঙ্গীকার */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t border-amber-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>BSTI ও সরকারি ভ্যাট-ট্যাক্স প্রত্যয়িত</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>নিজস্ব দুগ্ধ কারখানায় হাইজিন উৎপাদন</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>দেশব্যাপী নির্ধারিত প্যাসেঞ্জার বাস রুট</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>গার্মেন্টস ও প্রতিষ্ঠানে বাল্ক সরবরাহ</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WhatsAppButton
                size="md"
                label="অফিশিয়াল WhatsApp-এ যোগাযোগ করুন"
                customText="আসসালামু আলাইকুম নকশি দই ভান্ডার! আমি আপনাদের পণ্য উৎপাদন ও পাইকারি সরবরাহ সম্পর্কে বিস্তারিত জানতে চাই।"
              />
              <a
                href="#order-process"
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-xs sm:text-sm transition"
              >
                অর্ডার ও পেমেন্ট ধাপ
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
