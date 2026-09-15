'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Title from './Title';

export default function GallerySection() {
  const [filter, setFilter] = useState('all');

  const galleryItems = [
    {
      id: 1,
      category: 'craft',
      title: 'মাটির হাঁড়িতে দই সেট হওয়া',
      caption: 'ছিদ্রযুক্ত মাটির পাত্র প্রাকৃতিক উপায়ে অতিরিক্ত জলীয় অংশ শোষণ করে',
      image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      category: 'product',
      title: 'বগুড়ার রাজকীয় মিষ্টি মাটির হাঁড়ি দই',
      caption: 'ঘন ক্যারামেল সর ও প্রাকৃতিক সোনালী আভা',
      image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      category: 'events',
      title: 'বিয়ে ও মেজবানের সাজানো বড় হাঁড়ি',
      caption: 'রাজকীয় মেহমানদারির জন্য লাল-সোনালী কাপড়ে সাজানো বিশেষ হাঁড়ি',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      category: 'product',
      title: 'খাঁটি প্রোবায়োটিক টক দই',
      caption: 'রান্না ও হজমের জন্য সুষম অম্লতার মসৃণ টক দই',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      category: 'craft',
      title: 'খাঁটি গরুর দুধ সংগ্রহ ও জ্বাল',
      caption: 'কোনো ভেজাল ছাড়া বড় কড়াইয়ে খাঁটি আখের চিনিতে দুধ ঘন করা',
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      category: 'product',
      title: 'শাহী ক্ষীরসা ও ফলের সুস্বাদু দই',
      caption: 'এলাচ, পেস্তাবাদাম ও তাজা আমের সুস্বাদু ফিউশন',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filteredItems = filter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Title
        badge="ছবির গ্যালারি"
        title="আমাদের ঐতিহ্য ও ডেইরি গ্যালারি"
        subtitle="মাটির হাঁড়ির কারুকাজ ও ঐতিহ্যের প্রতিচ্ছবি"
        description="আমাদের দুধের খাঁটি উৎস, মাটির পাত্রের বিশেষ প্রস্তুতি, বিয়ের স্পেশাল মেগা হাঁড়ি ও আকর্ষণীয় পরিবেশনের এক ঝলক।"
      />

      {/* ফিল্টার ট্যাব */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
        {[
          { id: 'all', label: 'সব ছবি' },
          { id: 'product', label: 'সিগনেচার দই' },
          { id: 'craft', label: 'ঐতিহ্যবাহী কারুকাজ' },
          { id: 'events', label: 'বিয়ে ও মেহমানদারি' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer ${
              filter === tab.id
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-amber-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-[4/3] shadow-xs hover:shadow-xl border border-amber-100 transition-all duration-300"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
              <h4 className="font-bold text-base leading-snug">{item.title}</h4>
              <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
