'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { PRODUCTS } from '@/data/products';
import { BUSINESS_CONFIG } from '@/config/business';
import { Search, Filter, ChevronDown } from 'lucide-react';

export default function ProductShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = BUSINESS_CONFIG.categories;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCat = sessionStorage.getItem('selected-category');
      if (savedCat) {
        setSelectedCategory(savedCat);
        sessionStorage.removeItem('selected-category');
      }
    }

    const handleCategoryEvent = (e) => {
      if (e.detail) {
        setSelectedCategory(e.detail);
        setVisibleCount(12);
      }
    };
    window.addEventListener('select-product-category', handleCategoryEvent);
    return () => window.removeEventListener('select-product-category', handleCategoryEvent);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.grade?.toLowerCase().includes(q) ||
          p.netWeight?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.size?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [selectedCategory, searchQuery]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="products" className="scroll-mt-20 pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Title
        badge="দেশব্যাপী পাইকারি সরবরাহ"
        title="আমাদের পাইকারি খাদ্যপণ্য সম্ভার"
        subtitle="A Grade (High Quality) • B Grade (Medium Quality)"
        description="অনলাইন অর্ডার শুধুমাত্র পাইকারি ক্রেতাদের জন্য। খুচরা বিক্রয় আমাদের শোরুম (কলেজ রোড, শেরপুর, বগুড়া) থেকে করা হয়। বিভিন্ন পণ্যের প্যাকেজিং ও মূল্যতালিকা নিচে উল্লেখ রয়েছে।"
      />

      {/* ফিল্টার এবং সার্চ বার */}
      <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-4 sm:p-6 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* সার্চ ইনপুট */}
          <div className="relative w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="দই, মিষ্টি, রসমালাই, ঘি বা মাঠার নাম দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                মুছুন
              </button>
            )}
          </div>
        </div>

        {/* ৪টি মূল ক্যাটাগরি পিলস */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(12);
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('select-product-category', { detail: cat.id }));
                }
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-xs scale-102'
                  : 'bg-slate-50 text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  selectedCategory === cat.id
                    ? 'bg-amber-950 text-amber-200'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {categoryCounts[cat.id] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ফলাফল সারসংক্ষেপ */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
        <span>
          মোট <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong>টি পণ্যের মধ্যে{' '}
          <strong className="text-slate-900 font-mono">{displayedProducts.length}</strong>টি প্রদর্শিত হচ্ছে
        </span>
        {searchQuery && (
          <span>
            অনুসন্ধান: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>

      {/* প্রোডাক্ট গ্রিড */}
      {displayedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-amber-300 mt-6 p-8">
          <div className="size-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-3">
            <Filter size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">আপনার খোঁজার সাথে কোনো পণ্য মেলেনি</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            বানান ঠিক করে আবার চেষ্টা করুন অথবা উপরের অন্য কোনো ক্যাটাগরি নির্বাচন করুন।
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 text-xs font-bold text-amber-900 bg-amber-100 rounded-xl hover:bg-amber-200 transition"
          >
            সব ফিল্টার রিসেট করুন
          </button>
        </div>
      )}

      {/* বাকি পণ্য দেখুন বাটন */}
      {visibleCount < filteredProducts.length && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisibleCount(filteredProducts.length)}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-amber-300 hover:border-amber-400 text-slate-900 hover:bg-amber-50 rounded-2xl font-black text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>বাকি পণ্য দেখুন</span>
            <ChevronDown size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
