'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import {
  ShieldCheck,
  Factory,
  Award,
  Truck,
  Coins,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

const ICON_MAP = {
  ShieldCheck,
  Factory,
  Award,
  Truck,
  Coins,
  MessageCircle,
  Sparkles,
};

export default function OurSpec() {
  const features = BUSINESS_CONFIG.features;

  return (
    <section id="why-us" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <Title
        badge="ঐতিহ্য ও পেশাদারিত্ব"
        title="কেন নকশি দই ভান্ডার বেছে নেবেন?"
        subtitle="আমাদের বিশেষত্ব ও পাইকারি সরবরাহের নির্ভরযোগ্যতা"
        description="বগুড়ার শত বছরের ঐতিহ্যবাহী রেসিপি, BSTI অনুমোদন, নিজস্ব দুগ্ধ কারখানা ও দেশব্যাপী নিরাপদ বাস রুটে পাইকারি সরবরাহ ব্যবস্থা।"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16">
        {features.map((item, index) => {
          const IconComp = ICON_MAP[item.icon] || Sparkles;

          return (
            <div
              key={item.id || index}
              className="relative p-6 sm:p-7 bg-white border border-amber-100/90 rounded-2xl shadow-xs hover:shadow-lg hover:border-amber-300 card-hover flex flex-col items-start transition-all duration-300"
            >
              {/* আইকন কন্টেইনার */}
              <div className="size-12 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 flex items-center justify-center mb-4 shadow-xs">
                <IconComp size={24} />
              </div>

              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}