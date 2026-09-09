'use client';

import React, { useState, useEffect } from 'react';
import Title from './Title';
import {
  Truck,
  CreditCard,
  ShieldCheck,
  Users,
  Clock,
  Headphones,
  Sparkles,
} from 'lucide-react';

const ICON_MAP = {
  Truck,
  CreditCard,
  ShieldCheck,
  Users,
  Clock,
  Headphones,
};

const DEFAULT_SPECS = [
  {
    id: 'tb_1',
    icon: 'Truck',
    title: 'Fast Delivery Across Bangladesh',
    description: 'Inside Dhaka 24-48 hrs, Outside Dhaka 2-4 days. Doorstep delivery with care.',
    accent: '#05DF72',
    enabled: true,
  },
  {
    id: 'tb_2',
    icon: 'CreditCard',
    title: '100% Secured Payment & COD',
    description: 'bKash, Nagad, Cards or Cash on Delivery available at your convenience.',
    accent: '#FF8904',
    enabled: true,
  },
  {
    id: 'tb_3',
    icon: 'Users',
    title: 'Trusted by 10,000+ Happy Customers',
    description: 'Original warranty-backed products with dedicated after-sales support.',
    accent: '#A684FF',
    enabled: true,
  },
];

const OurSpecs = () => {
  const specs = DEFAULT_SPECS;

  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title
        visibleButton={false}
        title="Our Specifications"
        description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-12 mt-16">
        {specs.map((spec, index) => {
          const IconComp = ICON_MAP[spec.icon] || Sparkles;
          const accentColor = spec.accent || '#05DF72';

          return (
            <div
              key={spec.id || index}
              className="relative min-h-44 p-6 flex flex-col items-center justify-center w-full text-center border rounded-2xl group transition-all duration-300 hover:shadow-md"
              style={{
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}35`,
              }}
            >
              <div
                className="absolute -top-6 text-white size-12 flex items-center justify-center rounded-xl shadow-md group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: accentColor }}
              >
                <IconComp size={24} />
              </div>
              <h3 className="text-slate-800 font-bold text-base mt-3">{spec.title}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{spec.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurSpecs;