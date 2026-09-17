'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import {
  Award,
  ShieldCheck,
  FileCheck,
  Building2,
  ThermometerSun,
  Refrigerator,
  Snowflake,
  CheckCircle2,
  Check,
  Sparkles,
} from 'lucide-react';

export default function QualityAndStandards() {
  const grades = BUSINESS_CONFIG.qualityGrades;
  const certifications = BUSINESS_CONFIG.certifications;
  const shelfLife = BUSINESS_CONFIG.shelfLifeGuide;
  const institutional = BUSINESS_CONFIG.institutionalSupply;

  return (
    <section id="quality-standards" className="scroll-mt-20 py-16 sm:py-24 bg-gradient-to-b from-white via-amber-50/30 to-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title
          badge="পণ্যের মান ও প্রাতিষ্ঠানিক মানদণ্ড"
          title="A Grade ও B Grade প্রিমিয়াম মান, BSTI ও সরকারি অনুমোদন"
          subtitle="বগুড়ার বিশ্বস্ত দুগ্ধজাত খাদ্যপণ্য উৎপাদন ও সরবরাহ"
          description="গ্রাহক ও প্রতিষ্ঠানের প্রয়োজন অনুযায়ী আমরা দুই ধরনের সুনির্দিষ্ট গ্রেডে পণ্য সরবরাহ করে থাকি। কোনো কৃত্রিম ভেজাল বা নিম্নমানের পণ্য আমরা উৎপাদন বা সরবরাহ করি না।"
        />

        {/* সেকশন ১: পণ্যের গ্রেড (A Grade vs B Grade) */}
        <div className="mt-12">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {grades.map((item, index) => {
              const isAGrade = index === 0;

              return (
                <div
                  key={index}
                  className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-xs flex flex-col justify-between ${
                    isAGrade
                      ? 'bg-gradient-to-br from-amber-500/10 via-amber-50/50 to-white border-amber-300 ring-2 ring-amber-400/20'
                      : 'bg-gradient-to-br from-blue-500/10 via-blue-50/40 to-white border-blue-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        isAGrade ? 'bg-amber-800 text-white' : 'bg-blue-800 text-white'
                      }`}>
                        {item.badge}
                      </span>
                      <Award size={24} className={isAGrade ? 'text-amber-800' : 'text-blue-800'} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                      {item.title}
                    </h3>
                    <span className="text-xs font-bold text-slate-600 block mt-0.5">
                      {item.subtitle}
                    </span>

                    <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-600">
                      {isAGrade ? '★ হোটেল, মেজবান ও বড় অনুষ্ঠানের প্রথম পছন্দ' : '★ সাশ্রয়ী বাজেটে ক্যাটারিং ও প্রাতিষ্ঠানিক সরবরাহ'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* নো লো কোয়ালিটি বার্তা */}
          <div className="mt-4 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-900 border border-red-200 text-xs font-black">
              🚫 {BUSINESS_CONFIG.lowQualityNotice}
            </span>
          </div>
        </div>

        {/* সেকশন ২: BSTI ও সরকারি অনুমোদন কার্ড */}
        <div className="mt-14 bg-gradient-to-br from-amber-950 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-800/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                <FileCheck size={14} />
                <span>সরকারি বৈধতা ও স্ট্যান্ডার্ড</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {certifications.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                {certifications.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {certifications.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-amber-200 font-bold">
                    <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center space-y-3">
              <ShieldCheck size={40} className="text-amber-400 mx-auto" />
              <h4 className="text-lg font-black text-white">১০০% বৈধ ও বিশ্বস্ত সরবরাহ</h4>
              <p className="text-xs text-amber-100/80 font-medium leading-relaxed">
                বাণিজ্যিক চালান, ভ্যাট চালান ও প্রাতিষ্ঠানিক চুক্তির মাধ্যমে নিরাপদ সরবরাহ নিশ্চিত করা হয়।
              </p>
              <WhatsAppButton
                size="md"
                label="প্রয়োজনীয় কাগজপত্র বা কোটেশন চান"
                className="!bg-[#25D366] !text-white shadow-md font-bold"
              />
            </div>
          </div>
        </div>

        {/* সেকশন ৩: পণ্যের স্থায়িত্ব (Shelf Life) গাইড */}
        <div className="mt-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {shelfLife.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              {shelfLife.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {shelfLife.durations.map((item, idx) => {
              const IconMap = [ThermometerSun, Refrigerator, Snowflake];
              const IconComp = IconMap[idx] || ThermometerSun;

              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border flex flex-col items-center text-center shadow-2xs ${item.color}`}
                >
                  <div className="p-3 rounded-full bg-white shadow-2xs mb-3">
                    <IconComp size={24} />
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                    {item.condition}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1">
                    {item.duration}
                  </span>
                  <span className="text-[11px] text-slate-600 mt-2 font-medium">
                    {idx === 0
                      ? 'স্বাভাবিক ঘরের তাপমাত্রায় সতেজতা বজায় থাকে'
                      : idx === 1
                      ? 'স্বাভাবিক ফ্রিজে মান ও স্বাদ অক্ষুণ্ণ থাকে'
                      : 'ডিপ ফ্রিজে দীর্ঘমেয়াদী সংরক্ষণে চমৎকার'}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs font-bold text-amber-900">
            ❄️ {shelfLife.storageTip}
          </p>
        </div>

        {/* সেকশন ৪: গার্মেন্টস ও প্রাতিষ্ঠানিক বাল্ক সরবরাহ */}
        <div className="mt-16 bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl p-6 sm:p-10 border border-amber-200/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-black">
                <Building2 size={14} />
                <span>{institutional.badge}</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {institutional.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {institutional.description}
              </p>

              {/* টার্গেট ক্লায়েন্ট তালিকা */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {institutional.targetClients.map((client, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Check size={14} className="text-emerald-700 shrink-0" />
                    <span>{client}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center text-center p-6 bg-white rounded-2xl border border-amber-200 shadow-2xs">
              <span className="text-xs font-black text-amber-800 uppercase tracking-wider mb-2">
                প্রাতিষ্ঠানিক চুক্তি ও সরবরাহ
              </span>
              <p className="text-xs text-slate-600 mb-4 font-medium">
                আপনার ফ্যাক্টরি বা প্রতিষ্ঠানের মাসিক/সাপ্তাহিক রিকোয়ারমেন্টের জন্য কথা বলুন।
              </p>
              <WhatsAppButton
                size="md"
                label="করপোরেট কোটেশন চান"
                className="w-full font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
