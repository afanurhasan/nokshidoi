'use client';

import React from 'react';
import Image from 'next/image';
import { BUSINESS_CONFIG } from '@/config/business';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function FourMainProducts({ onSelectCategory }) {
  const products = BUSINESS_CONFIG.fourMainProducts;

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('select-product-category', { detail: catId }));
    }
    const targetElement = document.getElementById('products');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const images = {
    doi: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80",
    mishti: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    rasmalai: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80",
    matha: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-950 text-xs font-black tracking-wide mb-3 shadow-2xs">
          <Sparkles size={14} className="text-amber-700" />
          <span>নকশী দই ভাণ্ডারের বিশেষত্ব</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          আমাদের ৪টি মূল ঐতিহ্যবাহী পণ্য
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
          নিজস্ব কারখানায় শতভাগ খাঁটি তরল গরুর দুধে স্বাস্থ্যসম্মত উপায়ে প্রস্তুত। পছন্দের পণ্যে ক্লিক করে সম্পূর্ণ সম্ভার ও মূল্যতালিকা দেখুন।
        </p>
      </div>

      {/* ৪টি মূল কার্ডের গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCategoryClick(item.id)}
            className="group relative flex flex-col bg-white rounded-3xl border border-amber-200/90 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden cursor-pointer card-hover"
          >
            {/* ছবির অংশ */}
            <div className="relative w-full h-48 sm:h-52 bg-amber-100/40 overflow-hidden">
              <Image
                src={images[item.id] || images.doi}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* টপ ব্যাজ */}
              <div className="absolute top-3 left-3 z-10">
                <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-amber-500 text-white shadow-md">
                  {item.tag}
                </span>
              </div>

              {/* ছবির নিচের টাইটেল */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-xl font-black tracking-tight drop-shadow-xs">
                    {item.name}
                  </h3>
                </div>
              </div>
            </div>

            {/* টেক্সট ও হাইলাইটস অংশ */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-amber-900 leading-snug">
                  {item.subtitle}
                </h4>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-medium">
                  {item.description}
                </p>

                {/* ৩টি হাইলাইটস */}
                <div className="mt-4 pt-3 border-t border-amber-100/80 space-y-1.5">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-900 group-hover:text-amber-700 transition-colors">
                <span>{item.name}র তালিকা দেখুন</span>
                <span className="size-7 rounded-full bg-amber-100 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                  <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
