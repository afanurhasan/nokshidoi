'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Package, Scale, Layers, ShoppingBag } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';

export default function ProductCard({ product }) {
  if (!product) return null;

  const targetId = product.slug || product.id;
  const isAGrade = product.grade?.includes('A Grade');

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl border border-amber-200/90 shadow-xs hover:shadow-xl hover:border-amber-400 card-hover overflow-hidden transition-all duration-300">
      {/* ইমেজ ও গ্রেড ব্যাজ */}
      <div className="relative w-full h-48 sm:h-52 bg-amber-50/60 overflow-hidden block">
        <Link href={`/product/${targetId}`} className="w-full h-full block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            className="object-cover group-hover:scale-106 transition-transform duration-500"
          />
        </Link>

        {/* গ্রেড ব্যাজ */}
        {product.grade && (
          <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
            <span className={`px-3 py-1 rounded-full text-[11px] font-black shadow-md ${
              isAGrade ? 'bg-amber-800 text-white' : 'bg-blue-800 text-white'
            }`}>
              {product.grade}
            </span>
          </div>
        )}
      </div>

      {/* কন্টেন্ট: ক্লায়েন্টের নির্ধারিত সুনির্দিষ্ট কাঠামোর বিবরণ */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div>
          {/* নাম */}
          <Link href={`/product/${targetId}`} className="block group-hover:text-amber-800 transition-colors">
            <h3 className="font-black text-slate-900 text-lg leading-tight">
              {product.name}
            </h3>
          </Link>
          {product.grade && (
            <span className="text-[11px] font-bold text-amber-900 block mt-0.5">
              {product.grade}
            </span>
          )}

          {/* ক্লায়েন্টের স্পেসিফিকেশন টেবিল/লিস্ট */}
          {(product.netWeight || product.grossWeight || product.carton || product.minOrder) && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs font-medium">
              {product.netWeight && (
                <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                  <span className="text-[10px] font-extrabold text-slate-500 block truncate">
                    {product.netWeightLabel || 'নিট ওজন'}
                  </span>
                  <span className="text-xs font-black text-slate-900">{product.netWeight}</span>
                </div>
              )}
              {product.grossWeight && (
                <div className="bg-amber-50/60 p-2 rounded-xl border border-amber-100">
                  <span className="text-[10px] font-extrabold text-slate-500 block truncate">
                    {product.grossWeightLabel || 'মাটিসহ ওজন'}
                  </span>
                  <span className="text-xs font-black text-slate-900">{product.grossWeight}</span>
                </div>
              )}
              {product.carton && (
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold text-slate-500 block truncate">কার্টুন</span>
                  <span className="text-xs font-black text-slate-900">{product.carton}</span>
                </div>
              )}
              {product.minOrder && (
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <span className="text-[10px] font-extrabold text-slate-500 block truncate">
                    {product.minOrderLabel || 'সর্বনিম্ন অর্ডার'}
                  </span>
                  <span className="text-xs font-black text-amber-800">{product.minOrder}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* মূল্য এবং বাটন অংশ */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            {product.wholesalePrice && (
              <div>
                <span className="text-[10px] font-extrabold text-slate-500 block uppercase">
                  পাইকারি মূল্য
                </span>
                <span className="text-xl font-black text-amber-900 leading-none font-mono">
                  {product.wholesalePrice}
                </span>
              </div>
            )}
            {product.retailPrice && (
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 block uppercase">
                  খুচরা মূল্য
                </span>
                <span className="text-xs font-black text-slate-600 line-through">
                  {product.retailPrice}
                </span>
              </div>
            )}
          </div>

          <Link
            href={`/product/${targetId}`}
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black bg-amber-800 hover:bg-amber-900 text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <span>বিস্তারিত ও অর্ডার</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}