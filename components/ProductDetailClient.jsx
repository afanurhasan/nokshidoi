'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS_CONFIG, getWhatsAppWholesaleUrl } from '@/config/business';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductCard from '@/components/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowLeft,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export default function ProductDetailClient({ product, relatedProducts }) {
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-slate-900">দইটি পাওয়া যায়নি</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-md">
          আপনি যে দইটি খুঁজছেন সেটি বর্তমানে পরিবর্তিত হয়েছে বা সরিয়ে নেওয়া হয়েছে।
        </p>
        <Link
          href="/#products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-amber-800 text-white font-bold text-sm rounded-xl hover:bg-amber-900 transition"
        >
          <ArrowLeft size={16} />
          <span>দই তালিকায় ফিরে যান</span>
        </Link>
      </div>
    );
  }

  const currency = BUSINESS_CONFIG.currency;
  const rating = product.rating || 5.0;
  const isWholesaleEligible = product.availability === 'wholesale' || product.availability === 'both';

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ব্রেডক্রাম্ব নেভিগেশন */}
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6 sm:mb-8 flex-wrap">
        <Link href="/" className="hover:text-amber-800 transition">হোম</Link>
        <span>/</span>
        <Link href="/#products" className="hover:text-amber-800 transition">দই তালিকা</Link>
        <span>/</span>
        <span className="text-slate-900 font-extrabold truncate max-w-xs">{product.name}</span>
      </div>

      {/* প্রধান প্রোডাক্ট ডিটেইলস কার্ড */}
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xs p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* বামপাশ: বড় অপ্টিমাইজড ছবি */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50/50 border border-amber-100 shadow-inner">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 z-10 flex gap-2">
                {product.availability === 'wholesale' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-orange-600 text-white shadow-xs">
                    পাইকারি বাল্ক প্যাক
                  </span>
                ) : product.availability === 'both' ? (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                    খুচরা ও পাইকারি
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    খুচরা প্যাক
                  </span>
                )}

                {product.bestseller && (
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-xs">
                    জনপ্রিয়
                  </span>
                )}
              </div>
            </div>

            {/* কোয়ালিটি গ্যারান্টি বার */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs text-slate-700">
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                <ShieldCheck size={18} className="text-amber-700 mx-auto mb-1" />
                <span className="font-bold block">১০০% খাঁটি দুধ</span>
              </div>
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                <Sparkles size={18} className="text-amber-700 mx-auto mb-1" />
                <span className="font-bold block">মাটির হাঁড়ির স্বাদ</span>
              </div>
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                <Truck size={18} className="text-amber-700 mx-auto mb-1" />
                <span className="font-bold block">ঠান্ডা ডেলিভারি</span>
              </div>
            </div>
          </div>

          {/* ডানপাশ: তথ্য, মূল্য এবং অর্ডার */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* সাইজ ও রেটিং */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-3 py-1 bg-amber-100 text-amber-950 text-xs font-black rounded-lg inline-block">
                  প্যাকেজ সাইজ: {product.size}
                </span>
                <div className="flex items-center gap-1 text-amber-600">
                  {Array(5).fill('').map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      fill={rating >= idx + 1 ? 'currentColor' : 'none'}
                      className={rating >= idx + 1 ? 'text-amber-500' : 'text-slate-300'}
                    />
                  ))}
                  <span className="text-xs font-black text-slate-800 ml-1">
                    {rating.toFixed(1)} / ৫.০
                  </span>
                </div>
              </div>

              {/* নাম */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* মূল্য প্রদর্শন */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-xs font-bold text-slate-500 block">
                  খুচরা মূল্য
                </span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-black text-slate-900">
                    {currency}{product.price}
                  </span>
                  <span className="text-xs text-slate-600 font-bold">/ প্রতি {product.size}</span>
                </div>
              </div>

              {/* বিবরণ */}
              <div className="mt-6">
                <h4 className="text-xs font-black text-slate-500 tracking-wider">
                  প্রোডাক্টের বিবরণ
                </h4>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium">
                  {product.description}
                </p>
              </div>

              {/* উপাদান ও মেয়াদ */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2.5 text-xs">
                {product.ingredients && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">উপাদানসমূহ:</strong>{' '}
                      <span className="text-slate-700 font-medium">{product.ingredients}</span>
                    </div>
                  </div>
                )}
                {product.shelfLife && (
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">সংরক্ষণ ও মেয়াদের তথ্য:</strong>{' '}
                      <span className="text-slate-700 font-medium">{product.shelfLife}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* বাটনসমূহ */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
              <WhatsAppButton
                product={product}
                size="lg"
                label="হোয়াটসঅ্যাপে এটি অর্ডার করুন"
                className="flex-1 shadow-md font-bold"
              />
              {isWholesaleEligible && (
                <a
                  href={getWhatsAppWholesaleUrl(`${product.name} (${product.size}) এর পাইকারি/অনুষ্ঠান অর্ডারের তথ্য`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-sm transition text-center"
                >
                  পাইকারি কোটেশন চান
                </a>
              )}
            </div>

            <p className="text-[11px] text-slate-500 text-center sm:text-left mt-3 font-medium">
              💡 আমাদের অটোমেটেড হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করে মুহূর্তেই অর্ডার কনফার্ম করুন।
            </p>
          </div>
        </div>
      </div>

      {/* সম্পর্কিত অন্যান্য দই */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                সম্পর্কিত অন্যান্য দই
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                একই ক্যাটাগরির আরও খাঁটি দইয়ের পছন্দ
              </p>
            </div>
            <Link
              href="/#products"
              className="text-xs font-extrabold text-amber-800 hover:text-amber-950 transition"
            >
              সম্পূর্ণ দই তালিকা &rarr;
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
