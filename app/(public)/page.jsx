'use client';

import React from 'react';
import Hero from '@/components/Hero';
import FourMainProducts from '@/components/FourMainProducts';
import ProductShowcase from '@/components/ProductShowcase';
import OurSpec from '@/components/OurSpec';
import WholesaleSection from '@/components/WholesaleSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import ReviewMarquee from '@/components/ReviewMarquee';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Four Main Products Showcase (দই, মিষ্টি, রসমালাই, মাঠা) */}
      <FourMainProducts />

      {/* 3. Products Showcase */}
      <ProductShowcase />

      {/* 5. Why Choose Us (Purity, Clay Pot, Hygiene, Delivery) */}
      <OurSpec />

      {/* 6. Dedicated Wholesale Section (Weddings, Catering, B2B) */}
      <WholesaleSection />

      {/* 7. Two-way Customer Reviews Marquee */}
      <ReviewMarquee />

      {/* 8. Visual Gallery (Clay pot craft, products, festive handis) */}
      <GallerySection />

      {/* 9. About Us Section (Story, Freshness, Purity) */}
      <AboutSection />

      {/* 8. Contact & Delivery Section */}
      <ContactSection />
    </main>
  );
}
