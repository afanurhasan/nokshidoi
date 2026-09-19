'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG, getWhatsAppOrderUrl } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import {
  MessageSquareText,
  Coins,
  Factory,
  WalletCards,
  BadgeCheck,
  Clock,
  AlertTriangle,
  FileText,
} from 'lucide-react';

const STEP_ICONS = [
  MessageSquareText,
  Coins,
  Factory,
  WalletCards,
  BadgeCheck,
];

export default function OrderProcessSection() {
  const steps = BUSINESS_CONFIG.orderSteps;

  return (
    <section id="order-process" className="scroll-mt-20 py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/40 border-t border-amber-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title
          badge="অর্ডার ও পেমেন্টের ধাপ"
          title="সহজ ৫টি ধাপে আপনার পাইকারি অর্ডার সম্পন্ন করুন"
          subtitle="স্বচ্ছ লেনদেন ও পেশাদার সরবরাহ ব্যবস্থা"
          description="অনলাইন অর্ডার শুধুমাত্র পাইকারি ক্রেতাদের জন্য। আমাদের অফিশিয়াল WhatsApp-এ নির্ধারিত নিয়মে মেসেজ পাঠিয়ে সহজেই আপনার অর্ডার কনফার্ম করতে পারেন।"
        />

        {/* সময়সীমা ও খুচরা বিক্রয় অ্যালার্ট ব্যানার */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-amber-100/70 border border-amber-300/80 rounded-2xl">
            <Clock size={22} className="text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-950">অর্ডার কনফার্মেশনের সময়সীমা</h4>
              <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                প্রতিদিন <strong>সকাল ১০টার আগে</strong> অর্ডার নিশ্চিত করার চেষ্টা করতে হবে। সকাল ১০টার পরের অর্ডার পরবর্তী কার্যদিবসে প্রস্তুত হতে পারে।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-300 rounded-2xl">
            <AlertTriangle size={22} className="text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-emerald-950">পাইকারি ও খুচরা নীতি</h4>
              <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                অনলাইন অর্ডার <strong>শুধুমাত্র পাইকারি ক্রেতাদের জন্য</strong>। খুচরা বিক্রয় আমাদের শোরুম (কলেজ রোড, শেরপুর, বগুড়া) থেকে সরাসরি করা হয়।
              </p>
            </div>
          </div>
        </div>

        {/* ৫টি ধাপের প্রসেস কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-12">
          {steps.map((item, index) => {
            const IconComp = STEP_ICONS[index] || MessageSquareText;
            const isAdvance = index === 1;
            const isFullPayment = index === 3;

            return (
              <div
                key={index}
                className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-lg ${isAdvance
                    ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/30'
                    : isFullPayment
                      ? 'bg-blue-50/70 border-blue-200 ring-2 ring-blue-300/30'
                      : 'bg-white border-amber-100 hover:border-amber-300'
                  }`}
              >
                {/* স্টেপ নম্বর ব্যাজ */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-800 text-white shadow-2xs font-mono">
                    {item.step}
                  </span>
                  <div className={`p-2 rounded-xl ${isAdvance ? 'bg-amber-200 text-amber-900' : isFullPayment ? 'bg-blue-200 text-blue-900' : 'bg-amber-100 text-amber-800'
                    }`}>
                    <IconComp size={20} />
                  </div>
                </div>

                {/* বিবরণ */}
                <div className="flex-1">
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-bold text-amber-800 mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* গুরুত্বপূর্ণ নোট বক্স */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] font-bold text-slate-700">
                  <span className="text-amber-800 block text-[10px] font-extrabold uppercase">বিশেষ নোট:</span>
                  <p className="mt-0.5 text-slate-800 font-mono">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* হোয়াটসঅ্যাপ ফরম্যাট গাইড ও পেমেন্ট নম্বর বক্স */}
        <div className="mt-12 bg-gradient-to-br from-amber-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* বাম কলাম: টেক্সট ফরম্যাট */}
            <div className="lg:col-span-7 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                <FileText size={14} />
                <span>WhatsApp অর্ডার ফরম্যাট</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                অর্ডারের জন্য নিচের ফরম্যাটে তথ্য পাঠান
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-medium">
                অর্ডারের দ্রুত প্রক্রিয়াকরণের জন্য আমাদের অফিশিয়াল হোয়াটসঅ্যাপে নিচের ক্রমানুযায়ী মেসেজ পাঠিয়ে দিন:
              </p>

              {/* ফরম্যাট কোড বক্স */}
              <div className="p-4 bg-stone-950/80 rounded-2xl border border-amber-600/40 text-xs sm:text-sm font-mono text-amber-200 leading-relaxed select-all">
                পণ্যের নাম + পরিমাণ + ক্রেতার নাম + ১১ সংখ্যার মোবাইল নম্বর + সম্পূর্ণ ঠিকানা
              </div>

              <div className="flex items-center gap-2 text-xs text-amber-300 font-bold pt-1">
                <span>💡 উদাহরণ:</span>
                <span className="text-white font-mono">স্পেশাল মিষ্টি দই + ৫০ কেজি + মোঃ রহিম + ০১৭১XXXXXXX + গাবতলী বাসস্ট্যান্ড, ঢাকা</span>
              </div>
            </div>

            {/* ডান কলাম: পেমেন্ট নম্বর ও কল টু অ্যাকশন */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 text-center flex flex-col items-center justify-center space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                পেমেন্ট নম্বরসমূহ
              </span>

              {/* অফিশিয়াল নম্বর */}
              <div className="w-full bg-stone-950/80 px-4 py-2.5 rounded-xl border border-amber-400/40 flex items-center justify-between gap-2">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-amber-300 block tracking-wide">অফিশিয়াল পেমেন্ট নম্বর</span>
                  <span className="text-lg sm:text-xl font-black text-white tracking-wider select-all font-mono">
                    {BUSINESS_CONFIG.paymentNumber}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0">
                  বিকাশ / নগদ
                </span>
              </div>

              {/* পার্সোনাল নম্বর */}
              <div className="w-full bg-stone-950/80 px-4 py-2.5 rounded-xl border border-emerald-400/40 flex items-center justify-between gap-2">
                <div className="text-left">
                  <span className="text-[10px] font-bold text-emerald-300 block tracking-wide">বিকাশ • নগদ • রকেট</span>
                  <span className="text-lg sm:text-xl font-black text-white tracking-wider select-all font-mono">
                    {BUSINESS_CONFIG.personalPaymentNumber}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">
                  পার্সোনাল
                </span>
              </div>

              <p className="text-xs text-amber-100/80 max-w-xs font-medium">
                (অগ্রিম ৩০% ও গাড়ি ছাড়ার পূর্বে বাকি ৭০% এবং প্রযোজ্য রোড ভাড়া এই নম্বরগুলোতে পরিশোধযোগ্য)
              </p>

              <WhatsAppButton
                size="lg"
                label="WhatsApp-এ অর্ডার ফরম্যাট পাঠান"
                className="w-full !bg-[#25D366] !text-white shadow-lg font-black mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
