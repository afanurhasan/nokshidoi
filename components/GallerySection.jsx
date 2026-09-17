'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Title from './Title';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '@/data/gallery';

export default function GallerySection() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const galleryItems = GALLERY_IMAGES;

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = useCallback(() => {
    setActiveImageIndex(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);

  const showPrev = useCallback((e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  }, [galleryItems.length]);

  const showNext = useCallback((e) => {
    e?.stopPropagation();
    setActiveImageIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  }, [galleryItems.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, closeLightbox, showPrev, showNext]);

  const activeItem = activeImageIndex !== null ? galleryItems[activeImageIndex] : null;

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Title
        badge="ছবির গ্যালারি"
        title="আমাদের ঐতিহ্য ও ডেইরি গ্যালারি"
        subtitle="মাটির হাঁড়ির কারুকাজ ও ঐতিহ্যের প্রতিচ্ছবি"
        description="আমাদের দুধের খাঁটি উৎস, মাটির পাত্রের বিশেষ প্রস্তুতি, বিয়ের স্পেশাল মেগা হাঁড়ি ও আকর্ষণীয় পরিবেশনের এক ঝলক।"
      />

      {/* গ্যালারি গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openLightbox(index)}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-xs hover:shadow-2xl border border-amber-100 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={item.image}
              alt="গ্যালারি ছবি"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-108 transition-transform duration-500"
            />

            {/* হোভার জুম আইকন */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3.5 rounded-full bg-white/25 backdrop-blur-md text-white shadow-lg group-hover:scale-110 transition-transform">
                <ZoomIn size={28} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* লাইটবক্স ফুলস্ক্রিন ভিউ */}
      {activeItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* ক্লোজ বাটন */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="বন্ধ করুন"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-60 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <X size={24} />
          </button>

          {/* পূর্ববর্তী ছবি বাটন */}
          <button
            type="button"
            onClick={showPrev}
            aria-label="পূর্ববর্তী ছবি"
            className="absolute left-3 sm:left-6 z-60 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          {/* পরবর্তী ছবি বাটন */}
          <button
            type="button"
            onClick={showNext}
            aria-label="পরবর্তী ছবি"
            className="absolute right-3 sm:right-6 z-60 p-2.5 sm:p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
          >
            <ChevronRight size={24} />
          </button>

          {/* ইমেজ কন্টেইনার (সম্পূর্ণ বড় স্ক্রিনে শুধু ছবি) */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl max-h-[92vh] w-full flex items-center justify-center"
          >
            <div className="relative w-full h-[78vh] sm:h-[88vh] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeItem.image}
                alt="গ্যালারি ছবি বড় ভিউ"
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1536px) 100vw, 1400px"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
