'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import { WhatsAppIcon } from './WhatsAppButton';
import {
  Tag,
  ShieldAlert,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  MessageSquareWarning,
} from 'lucide-react';

export default function NoticeAndSupportSection() {
  const brand = BUSINESS_CONFIG.brandIdentity;
  const fraud = BUSINESS_CONFIG.fraudWarning;
  const complaint = BUSINESS_CONFIG.complaintPolicy;

  return (
    <section id="notices" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20">
      <Title
        badge="জরুরি তথ্য ও গ্রাহক সেবা"
        title="ব্র্যান্ড পরিচিতি, নিরাপত্তা ও গ্রাহক সহযোগিতা"
        subtitle="স্বচ্ছ ও বিশ্বস্ত পাইকারি সেবার নির্ভরযোগ্য নিশ্চয়তা"
        description="আমাদের ব্র্যান্ডের পূর্বের পরিচিতি, প্রতারণা থেকে সুরক্ষা এবং পণ্য গ্রহণ পরবর্তী জরুরি অভিযোগ ও সহায়তা সংক্রান্ত অফিশিয়াল নীতিমালা।"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
        {/* কার্ড ১: ব্র্যান্ড পরিচিতি */}
        <div className="bg-gradient-to-b from-amber-50/80 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-200/80 text-amber-900 border border-amber-300/80">
                <Tag size={13} className="text-amber-800" />
                <span>{brand.badge}</span>
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                সরকারি নিবন্ধন
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              পূর্বের নাম ছিল <span className="text-amber-800 font-extrabold underline decoration-amber-400">“{brand.previousName}”</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
              {brand.description}
            </p>

            {/* বিশেষ ক্ল্যারিফিকেশন বক্স */}
            <div className="mt-4 p-3.5 bg-amber-100/70 rounded-2xl border border-amber-300/80 text-xs text-amber-950 font-bold leading-relaxed shadow-2xs">
              <p>💡 {brand.clarification}</p>
            </div>

            {/* ৪টি নিশ্চয়তা পয়েন্ট */}
            <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-bold">
              {brand.guarantees.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-200/60 text-[11px] text-slate-500 font-medium text-center">
            * ঐতিহ্য ও গুণগত মানে কোনো আপস নেই।
          </div>
        </div>

        {/* কার্ড ২: প্রতারণা থেকে সতর্কীকরণ */}
        <div className="bg-gradient-to-b from-rose-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-200">
                <AlertTriangle size={13} className="text-rose-700" />
                <span>{fraud.badge}</span>
              </span>
              <span className="text-[11px] font-bold text-rose-800 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                সতর্কতা
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {fraud.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
              {fraud.description}
            </p>

            {/* সতর্কবার্তা হাইলাইট বক্স */}
            <div className="mt-4 p-3.5 bg-rose-50 rounded-2xl border border-rose-300 text-xs text-rose-950 font-bold leading-relaxed shadow-2xs">
              <div className="flex items-start gap-2">
                <ShieldAlert size={17} className="text-rose-700 shrink-0 mt-0.5" />
                <span>{fraud.accountVerificationNote}</span>
              </div>
            </div>

            {/* অফিশিয়াল নম্বর নিশ্চিতকরণ */}
            <div className="mt-5 p-3.5 bg-white rounded-2xl border border-rose-200/80 shadow-2xs space-y-1.5">
              <span className="text-[11px] font-extrabold text-slate-600 block uppercase tracking-wider">
                অনুমোদিত অফিশিয়াল WhatsApp:
              </span>
              <span className="text-lg font-black text-emerald-800 font-mono tracking-wider block select-all">
                {BUSINESS_CONFIG.whatsappNumberDisplay}
              </span>
              <p className="text-[11px] text-slate-500 font-medium">
                অর্ডার ও লেনদেনের পূর্বে এই নম্বরে যোগাযোগ নিশ্চিত করুন।
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-200/60">
            <a
              href={fraud.officialWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <WhatsAppIcon size={16} />
              <span>অফিশিয়াল WhatsApp-এ যাচাই করুন</span>
            </a>
          </div>
        </div>

        {/* কার্ড ৩: অভিযোগ ও সহযোগিতা */}
        <div className="bg-gradient-to-b from-blue-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border border-blue-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-900 border border-blue-200">
                <PhoneCall size={13} className="text-blue-700" />
                <span>{complaint.badge}</span>
              </span>
              <span className="text-[11px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                গ্রাহক সহায়তা
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {complaint.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
              {complaint.description}
            </p>

            {/* ৫টি নীতিমালার তালিকা */}
            <div className="mt-4 space-y-2">
              {complaint.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-blue-100 shadow-2xs"
                >
                  <span className="size-5 rounded-full bg-blue-100 text-blue-900 text-[10px] font-black font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-800 font-bold leading-snug">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-200/60">
            <a
              href="https://wa.me/8801778306512?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%A1%E0%A6%BE%E0%A6%B0%20%E0%A6%AC%E0%A6%BE%20%E0%A6%AA%E0%A6%A3%E0%A7%8D%E0%A6%AF%20%E0%A6%B8%E0%A6%82%E0%A6%95%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%A8%E0%A7%8D%E0%A6%A4%20%E0%A6%B8%E0%A6%B9%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BF%E0%A6%A4%E0%A6%BE%E0%A6%B0%20%E0%A6%9C%E0%A6%A8%E0%A7%8D%E0%A6%AF%20%E0%A6%AF%E0%A7%8B%E0%A6%97%E0%A6%BE%E0%A6%AF%E0%A7%8B%E0%A6%97%20%E0%A6%95%E0%A6%B0%E0%A6%9B%E0%A6%BF%E0%A5%A4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              <HelpCircle size={16} />
              <span>সহায়তার জন্য মেসেজ দিন</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
