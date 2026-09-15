'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function ProductCard({ product }) {
  if (!product) return null;

  const currency = BUSINESS_CONFIG.currency;
  const rating = product.rating || 5.0;
  const targetId = product.slug || product.id;

  const isWholesaleOnly = product.availability === 'wholesale';
  const isBoth = product.availability === 'both';

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-amber-100/90 shadow-xs hover:shadow-xl hover:border-amber-300 card-hover overflow-hidden transition-all duration-300">
      {/* ব্যাজসমূহ */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
        {isWholesaleOnly ? (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-600 text-white shadow-xs">
            পাইকারি স্পেশাল
          </span>
        ) : isBoth ? (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            খুচরা ও পাইকারি
          </span>
        ) : (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
            খুচরা প্যাক
          </span>
        )}

        {product.bestseller && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-600 text-white shadow-xs">
            জনপ্রিয়
          </span>
        )}
      </div>

      {/* অপ্টিমাইজড ইমেজ */}
      <Link
        href={`/product/${targetId}`}
        className="relative w-full h-52 sm:h-56 bg-amber-50/50 overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
          <span className="text-white text-xs font-bold flex items-center gap-1">
            বিস্তারিত দেখুন <ArrowRight size={13} />
          </span>
        </div>
      </Link>

      {/* কন্টেন্ট */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* সাইজ ও রেটিং */}
          <div className="flex items-center justify-between text-xs text-amber-900 font-bold mb-1">
            <span className="truncate pr-2">{product.size}</span>
            <div className="flex items-center gap-1 text-amber-600 shrink-0">
              <Star size={12} fill="currentColor" />
              <span className="text-[11px] font-extrabold text-slate-700">{rating.toFixed(1)}</span>
            </div>
          </div>

          {/* প্রোডাক্টের নাম */}
          <Link href={`/product/${targetId}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className="font-extrabold text-slate-900 text-base line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* সংক্ষিপ্ত বিবরণ */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed font-medium">
            {product.shortDescription}
          </p>
        </div>

        {/* মূল্য এবং বিস্তারিত দেখুন বাটন */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 block leading-none">
              মূল্য
            </span>
            <span className="text-lg font-black text-slate-900 leading-tight">
              {currency}{product.price}
            </span>
          </div>

          <Link
            href={`/product/${targetId}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-all hover:scale-105 active:scale-95 shadow-2xs group/btn"
          >
            <span>বিস্তারিত দেখুন</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}