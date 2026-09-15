'use client';

import React from 'react';
import Image from 'next/image';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
                  হাতে তৈরি ঐতিহ্যবাহী খাবার
                </span>
                <h4 className="text-xl font-black mt-1">মাটির হাঁড়িতে প্রাকৃতিক গাঁজন</h4>
                <p className="text-xs text-amber-100/90 mt-1 font-medium">
                  ছিদ্রযুক্ত পোড়ামাটির পাত্র বাড়তি পানি শুষে নিয়ে খাঁটি দুধের ঘন সর তৈরি করে।
                </p>
              </div>
            </div>

            {/* ভাসমান ব্যাজ */}
            <div className="absolute -bottom-5 -right-2 sm:right-6 bg-white border border-amber-200 rounded-2xl p-4 shadow-xl max-w-[200px] z-10 hidden sm:block">
              <div className="flex items-center gap-2 text-amber-700">
                <ShieldCheck size={20} />
                <span className="text-xs font-black text-slate-900">শূন্য কেমিক্যাল</span>
              </div>
              <p className="text-[10px] text-slate-600 mt-1 leading-tight font-medium">
                কোনো কৃত্রিম ঘনকারক, স্টার্চ বা রঙ ব্যবহার করা হয় না।
              </p>
            </div>
          </div>

          {/* ডান কলাম: বিবরণ */}
          <div className="lg:col-span-7 flex flex-col">
            <Title
              align="left"
              badge={`“${BUSINESS_CONFIG.motto}”`}
              title="বিশুদ্ধতায় লক্ষ্য, তৃপ্তিতেই সন্তুষ্টি"
              subtitle="সরাসরি কারখানা থেকে পাইকারি সরবরাহ, সারা বাংলাদেশে ডেলিভারি"
            />

            <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              <p>
                <strong>{BUSINESS_CONFIG.name}</strong>-এর মূল লক্ষ্য হলো ভেজালমুক্ত খাঁটি দুধের প্রাকৃতিক স্বাদ মানুষের ঘরে ঘরে পৌঁছে দেওয়া। বগুড়ার ঐতিহ্যবাহী রেসিপি অনুযায়ী আমরা বিশ্বাস করি, আসল স্বাদের দই কোনো কৃত্রিম শর্টকাট দিয়ে তৈরি করা যায় না।
              </p>
              <p>
                আমাদের প্রতিটি হাঁড়ি তৈরি হয় <strong>১০০% খাঁটি তরল গরুর দুধে</strong>। খাঁটি খামারি দুধ বড় কড়াইয়ে দীর্ঘক্ষণ জ্বাল দিয়ে প্রাকৃতিক সোনালী ক্যারামেল স্বাদ আনা হয়। এরপর স্বাস্থ্যসম্মতভাবে পরিচ্ছন্ন মাটির পাত্রে জমানো হয়।
              </p>
              <p>
                আপনার পারিবারিক আয়োজনে একটি ছোট মিষ্টির পাত্র হোক কিংবা শুভ বিবাহের জন্য শত শত হাঁড়ি—আমরা প্রতিটি ব্যাচ তাজা ও ঠান্ডা অবস্থায় নির্দিষ্ট সময়ে পৌঁছে দিতে দায়বদ্ধ।
              </p>
            </div>

            {/* প্রধান অঙ্গীকার */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t border-amber-100">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>প্রতিদিনের তাজা দুধের ব্যাচ</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>কঠোর স্বাস্থ্যসম্মত প্রস্তুতি</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>খুচরা হোম ডেলিভারি ও পাইকারি</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>সার্বক্ষণিক হোয়াটসঅ্যাপ সেবা</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <WhatsAppButton
                size="md"
                label="হোয়াটসঅ্যাপে আমাদের সাথে কথা বলুন"
                customText="আসসালামু আলাইকুম নকশী দই! আমি আপনাদের পণ্য ও অর্ডার সম্পর্কে বিস্তারিত জানতে চাই।"
              />
              <a
                href="#products"
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold text-sm transition"
              >
                দই তালিকা দেখুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
