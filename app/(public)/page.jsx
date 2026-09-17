'use client';

import React from 'react';
import Hero from '@/components/Hero';
import FourMainProducts from '@/components/FourMainProducts';
import ProductShowcase from '@/components/ProductShowcase';
import OrderProcessSection from '@/components/OrderProcessSection';
import DeliveryRouteSection from '@/components/DeliveryRouteSection';
import OurSpec from '@/components/OurSpec';
import ReviewMarquee from '@/components/ReviewMarquee';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ১. হিরো সেকশন */}
      <Hero />

      {/* ২. প্রধান ৪টি পণ্য (দই, রসমালাই, মিষ্টি, মাঠা ও ঘোল) */}
      <FourMainProducts />

      {/* ৩. সম্পূর্ণ পাইকারি পণ্য সম্ভার ও মূল্য */}
      <ProductShowcase />

      {/* ৪. ৫-ধাপের অর্ডার ও পেমেন্ট প্রসেস (৩০% অগ্রিম, ৭০% গাড়িতে তোলার আগে, পেমেন্ট নম্বর) */}
      <OrderProcessSection />

      {/* ৫. প্যাসেঞ্জার বাস রুট ও স্টপেজ পরিবহন ব্যবস্থা (হোম ডেলিভারি নয়) */}
      <DeliveryRouteSection />

      {/* ৬. কেন নকশি দই ভান্ডার বেছে নেবেন (বিশেষত্ব) */}
      <OurSpec />

      {/* ৭. গ্রাহক ও প্রতিষ্ঠানের রিভিউ মারকুই */}
      <ReviewMarquee />

      {/* ৮. ঐতিহ্যবাহী কারিগরির ফটো গ্যালারি */}
      <GallerySection />

      {/* ৯. প্রতিষ্ঠান পরিচিতি ও কারখানা */}
      <AboutSection />

      {/* ১০. যোগাযোগ ও শোরুম */}
      <ContactSection />
    </main>
  );
}
