'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS_CONFIG, getWhatsAppOrderUrl } from '@/config/business';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import {
  ArrowLeft,
  ShieldCheck,
  Bus,
  AlertTriangle,
  Award,
  Package,
  Scale,
  Layers,
  Coins,
  Receipt,
  Clock,
} from 'lucide-react';

export default function ProductDetailClient({ product, relatedProducts }) {
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-900">পণ্যটি পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          আপনি যে পণ্যটি খুঁজছেন সেটি বর্তমানে পরিবর্তিত হয়েছে বা সরিয়ে নেওয়া হয়েছে।
        </p>
        <Link
          href="/#products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white font-bold text-sm rounded-xl hover:bg-amber-900 transition"
        >
          <ArrowLeft size={16} />
          <span>পণ্য তালিকায় ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const isAGrade = product.grade?.includes('A Grade');

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ব্রেডক্রাম্ব নেভিগেশন */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 sm:mb-8 flex-wrap">
        <Link href="/" className="hover:text-amber-800 transition">হোম</Link>
        <span>/</span>
        <Link href="/#products" className="hover:text-amber-800 transition">পণ্য তালিকা</Link>
        <span>/</span>
        <span className="text-slate-900 font-extrabold truncate max-w-xs">{product.name}</span>
      </div>

      {/* প্রধান প্রোডাক্ট ডিটেইলস কার্ড */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* বাম কলাম: অপ্টিমাইজড ছবি ও ট্রাস্ট তথ্য */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-amber-50/50 border border-amber-100 shadow-inner">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              {product.grade && (
                <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-black shadow-md ${
                    isAGrade ? 'bg-amber-800 text-white' : 'bg-blue-800 text-white'
                  }`}>
                    {product.grade}
                  </span>
                </div>
              )}
            </div>

            {/* পাইকারি সতর্কতা বক্স */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed font-medium flex items-start gap-2.5">
              <AlertTriangle size={18} className="text-amber-800 shrink-0 mt-0.5" />
              <div>
                <strong>অনলাইন পাইকারি নীতি:</strong> অনলাইন অর্ডার শুধুমাত্র পাইকারি ক্রেতাদের জন্য। খুচরা বিক্রয় আমাদের শোরুম (কলেজ রোড, শেরপুর, বগুড়া) থেকে সরাসরি করা হয়।
              </div>
            </div>

            {/* ডেলিভারি ও অনুমোদন ট্রাস্ট বার */}
            <div className="grid grid-cols-2 gap-3 text-center text-xs text-slate-700">
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <ShieldCheck size={18} className="text-amber-700 mx-auto mb-1" />
                <span className="font-bold block">BSTI ও ভ্যাট প্রত্যয়িত</span>
              </div>
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-100">
                <Bus size={18} className="text-amber-700 mx-auto mb-1" />
                <span className="font-bold block">বাসস্টপেজে ডেলিভারি</span>
              </div>
            </div>

            {/* পণ্যের স্থায়িত্ব ও সংরক্ষণ কার্ড */}
            <div className="p-4 bg-white/95 rounded-2xl border border-amber-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
                <Clock size={16} className="text-amber-800 shrink-0" />
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                  পণ্যের স্থায়িত্ব
                </h4>
              </div>

              <p className="text-xs text-slate-600 font-medium">
                দই ও রসমালাইয়ের সাধারণ স্থায়িত্ব—
              </p>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="font-medium text-slate-700">স্বাভাবিক তাপমাত্রায়:</span>
                  <span className="font-bold text-amber-950">৩–৪ দিন</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-amber-50/70 border border-amber-100">
                  <span className="font-medium text-slate-700">ফ্রিজে:</span>
                  <span className="font-bold text-amber-950">৪–৬ দিন</span>
                </div>
                <div className="flex items-center justify-between py-1.5 px-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <span className="font-medium text-slate-700">ডিপ ফ্রিজে:</span>
                  <span className="font-bold text-emerald-800">১০ দিনের বেশি</span>
                </div>
              </div>

              <p className="text-[11px] text-amber-900 bg-amber-100/50 p-2.5 rounded-xl leading-relaxed font-medium">
                💡 পণ্যের মান ভালো রাখতে ঠান্ডা পরিবেশে সংরক্ষণ করা পরামর্শযোগ্য।
              </p>
            </div>
          </div>

          {/* ডান কলাম: ক্লায়েন্টের নির্ধারিত সুনির্দিষ্ট স্পেসিফিকেশন ও অর্ডার */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* গ্রেড ব্যাজ ও নাম */}
              {product.grade && (
                <div className="inline-block px-3 py-1 rounded-lg bg-amber-100 text-amber-950 text-xs font-black mb-2">
                  {product.grade}
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* ক্লায়েন্টের নির্দিষ্ট কাঠামো অনুযায়ী মূল স্পেসিফিকেশন কার্ড */}
              <div className="mt-6 bg-amber-50/40 border-2 border-amber-200 rounded-3xl p-5 sm:p-7 shadow-xs">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-900 mb-4 pb-2 border-b border-amber-200">
                  পণ্যের সুনির্দিষ্ট তথ্য (Product Specification)
                </h3>

                <div className="space-y-3 sm:space-y-3.5 text-sm sm:text-base">
                  {/* নিট ওজন / পাত্র ছাড়া */}
                  {product.netWeight && (
                    <div className="flex items-center justify-between py-2 border-b border-amber-100/80">
                      <span className="text-slate-600 font-bold flex items-center gap-2">
                        <Scale size={18} className="text-amber-700 shrink-0" />
                        <span>{product.netWeightLabel || 'নিট ওজন'}:</span>
                      </span>
                      <strong className="text-slate-900 font-black text-base font-mono">{product.netWeight}</strong>
                    </div>
                  )}

                  {/* মাটিসহ ওজন / পাত্রসহ */}
                  {product.grossWeight && (
                    <div className="flex items-center justify-between py-2 border-b border-amber-100/80">
                      <span className="text-slate-600 font-bold flex items-center gap-2">
                        <Layers size={18} className="text-amber-700 shrink-0" />
                        <span>{product.grossWeightLabel || 'মাটিসহ ওজন'}:</span>
                      </span>
                      <strong className="text-slate-900 font-black text-base font-mono">{product.grossWeight}</strong>
                    </div>
                  )}

                  {/* পাইকারি মূল্য */}
                  {product.wholesalePrice && (
                    <div className="flex items-center justify-between py-2.5 px-3 bg-amber-100/70 rounded-2xl border border-amber-300">
                      <span className="text-amber-950 font-black flex items-center gap-2">
                        <Coins size={20} className="text-amber-800 shrink-0" />
                        <span>পাইকারি মূল্য:</span>
                      </span>
                      <strong className="text-amber-950 font-black text-xl sm:text-2xl font-mono">
                        {product.wholesalePrice}
                      </strong>
                    </div>
                  )}

                  {/* খুচরা মূল্য */}
                  {product.retailPrice && (
                    <div className="flex items-center justify-between py-2 border-b border-amber-100/80">
                      <span className="text-slate-600 font-bold flex items-center gap-2">
                        <Receipt size={18} className="text-slate-500 shrink-0" />
                        <span>খুচরা মূল্য:</span>
                      </span>
                      <span className="text-slate-700 font-bold text-base line-through font-mono">
                        {product.retailPrice}
                      </span>
                    </div>
                  )}

                  {/* কার্টুন */}
                  {product.carton && (
                    <div className="flex items-center justify-between py-2 border-b border-amber-100/80">
                      <span className="text-slate-600 font-bold flex items-center gap-2">
                        <Package size={18} className="text-amber-700 shrink-0" />
                        <span>কার্টুন:</span>
                      </span>
                      <strong className="text-slate-900 font-black text-base font-mono">{product.carton}</strong>
                    </div>
                  )}

                  {/* Minimum Order */}
                  {product.minOrder && (
                    <div className="flex items-center justify-between py-2.5 px-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <span className="text-emerald-950 font-black flex items-center gap-2">
                        <Clock size={18} className="text-emerald-700 shrink-0" />
                        <span>{product.minOrderLabel || 'সর্বনিম্ন অর্ডার'}:</span>
                      </span>
                      <strong className="text-emerald-900 font-black text-base sm:text-lg font-mono">
                        {product.minOrder}
                      </strong>
                    </div>
                  )}

                  {/* কার্টন মিক্সিং সংক্ষিপ্ত প্রম্পট */}
                  <div className="pt-2 text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                    <span>📦 ১টি কার্টনে সর্বোচ্চ ৩টি ভিন্ন আইটেম মিলিয়ে নেওয়ার সুবিধা রয়েছে।</span>
                  </div>
                </div>
              </div>
            </div>

            {/* বাটনসমূহ ও WhatsApp অর্ডার */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
              <WhatsAppButton
                product={product}
                size="lg"
                label="WhatsApp-এ পাইকারি অর্ডার পাঠান"
                className="w-full !bg-[#25D366] !text-white shadow-md font-black text-base py-4"
              />

              <div className="p-3 bg-stone-900 text-amber-200 rounded-xl text-xs font-mono leading-relaxed text-center">
                অর্ডার ফরম্যাট: {product.name} + পরিমাণ + ক্রেতার নাম + ১১ সংখ্যার মোবাইল নম্বর + সম্পূর্ণ ঠিকানা
              </div>

              <p className="text-xs text-slate-500 text-center font-medium">
                💡 প্রতিদিন সকাল ১০টার আগে অর্ডার নিশ্চিত করুন। ৩০% অগ্রিম সাপেক্ষে নিজস্ব কারখানায় প্রস্তুত করা হবে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* পাইকারি কার্টন মিক্সিং ও পেমেন্ট সংক্রান্ত জরুরি নির্দেশিকা */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* কার্ড ১: এক কার্টনে ৩ আইটেম মিক্স করার নিয়ম */}
        <div className="bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border border-amber-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-200/80 text-amber-900 border border-amber-300">
                <Package size={14} className="text-amber-800" />
                <span>{BUSINESS_CONFIG.cartonMixPolicy.badge}</span>
              </span>
              <span className="text-[11px] font-bold text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                পাইকারি সুবিধা
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {BUSINESS_CONFIG.cartonMixPolicy.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
              {BUSINESS_CONFIG.cartonMixPolicy.ruleSummary}
            </p>

            {/* শর্ত বক্স */}
            <div className="mt-4 p-3.5 bg-amber-100/70 rounded-2xl border border-amber-300 text-xs text-amber-950 font-bold leading-relaxed shadow-2xs">
              <p>📌 {BUSINESS_CONFIG.cartonMixPolicy.condition}</p>
            </div>

            {/* স্পষ্টীকরণ বক্স */}
            <div className="mt-4 p-3.5 bg-white rounded-2xl border border-amber-200/80 text-xs text-slate-700 leading-relaxed font-medium shadow-2xs">
              <p className="text-slate-800">
                <strong className="text-amber-900">💡 নিয়মাবলি: </strong>
                {BUSINESS_CONFIG.cartonMixPolicy.clarification}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-amber-200/60 text-[11px] text-slate-500 font-medium text-center">
            * অর্ডার করার সময় হোয়াটসঅ্যাপে পছন্দের ৩টি আইটেম ও অনুপাত উল্লেখ করুন।
          </div>
        </div>

        {/* কার্ড ২: অর্ডার ও পেমেন্ট সংক্রান্ত জরুরি নোটিশ */}
        <div className="bg-gradient-to-b from-rose-50/70 via-white to-amber-50/40 rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-900 border border-rose-200">
                <AlertTriangle size={14} className="text-rose-700" />
                <span>{BUSINESS_CONFIG.orderPaymentNotice.badge}</span>
              </span>
              <span className="text-[11px] font-bold text-rose-800 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                জরুরি নোটিশ
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {BUSINESS_CONFIG.orderPaymentNotice.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed font-medium">
              {BUSINESS_CONFIG.orderPaymentNotice.ruleDescription}
            </p>

            {/* বাতিল ও সমন্বয় সতর্কতা বক্স */}
            <div className="mt-4 p-4 bg-rose-50 rounded-2xl border border-rose-300 text-xs text-rose-950 font-bold leading-relaxed shadow-2xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle size={18} className="text-rose-700 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.orderPaymentNotice.forfeitDisclaimer}</span>
              </div>
            </div>

            {/* পেমেন্ট সময়ানুবর্তিতা নোট */}
            <div className="mt-4 p-3.5 bg-white rounded-2xl border border-rose-200/80 text-xs text-slate-700 leading-relaxed shadow-2xs">
              <span className="font-extrabold text-rose-900 block mb-1">⏰ পেমেন্ট ও ডেলিভারি সময়বিধি:</span>
              <p className="text-slate-600 font-medium">
                অর্ডার নিশ্চিত করার পর পরবর্তী দিন গাড়ি ছাড়ার পূর্বে নির্ধারিত অবশিষ্ট ৭০% ও রোড ভাড়া পরিশোধ সম্পন্ন করুন।
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-rose-200/60 text-[11px] text-slate-500 font-medium text-center">
            * পণ্য প্রস্তুতি ও তাজা সরবরাহ নিশ্চিত করার স্বার্থে এই নিয়ম প্রযোজ্য।
          </div>
        </div>
      </div>

      {/* সম্পর্কিত অন্যান্য পণ্য */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                সম্পর্কিত অন্যান্য পাইকারি পণ্য
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                একই ক্যাটাগরির সুনির্দিষ্ট স্পেসিফিকেশনের পণ্যসমূহ
              </p>
            </div>
            <Link
              href="/#products"
              className="text-xs font-extrabold text-amber-800 hover:text-amber-950 transition"
            >
              সম্পূর্ণ তালিকা &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
