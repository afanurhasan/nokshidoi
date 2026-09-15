'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleCategoryEvent = (e) => {
      if (e.detail) {
        setActiveItem(e.detail);
      }
    };
    window.addEventListener('select-product-category', handleCategoryEvent);
    return () => window.removeEventListener('select-product-category', handleCategoryEvent);
  }, []);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'দই', href: '/#products', catId: 'doi' },
    { name: 'মিষ্টি', href: '/#products', catId: 'mishti' },
    { name: 'রসমালাই', href: '/#products', catId: 'rasmalai' },
    { name: 'মাঠা', href: '/#products', catId: 'matha' },
    { name: 'পাইকারি অর্ডার', href: '/#wholesale' },
    { name: 'যোগাযোগ', href: '/#contact' },
  ];

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);
    if (typeof window === 'undefined') return;

    if (link.catId) {
      setActiveItem(link.catId);
      sessionStorage.setItem('selected-category', link.catId);
    } else {
      setActiveItem(link.href);
    }

    const isHome = window.location.pathname === '/';

    if (isHome) {
      if (link.href === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      } else if (link.href.startsWith('/#')) {
        e.preventDefault();
        const targetId = link.href.replace('/#', '');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', link.href);
        }
        if (link.catId) {
          window.dispatchEvent(new CustomEvent('select-product-category', { detail: link.catId }));
        }
      }
    }
  };

  return (
    <>
      {/* শীর্ষ নোটিফিকেশন বার */}
      <div className="bg-amber-950 text-amber-50 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="font-medium tracking-wide">
            🍶 <span className="font-bold text-amber-300">নকশী দই ভাণ্ডার:</span> &ldquo;{BUSINESS_CONFIG.motto}&rdquo; | সারা বাংলাদেশে পাইকারি ডেলিভারি
          </p>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <a
              href={`tel:${BUSINESS_CONFIG.showroomPhoneRaw}`}
              className="hover:text-amber-200 text-amber-300 transition font-bold"
            >
              শোরুম: {BUSINESS_CONFIG.showroomPhone}
            </a>
          </div>
        </div>
      </div>

      {/* মূল নেভিগেশন বার */}
      <nav
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-amber-200/60 shadow-sm py-2' : 'border-slate-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* ব্র্যান্ড অফিশিয়াল লোগো */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 sm:h-14 w-auto flex items-center">
              <img
                src="/logo.png"
                alt="নকশী দই ভাণ্ডার লোগো"
                className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 leading-none">
                নকশী দই ভাণ্ডার
              </span>
              <span className="text-[10px] tracking-wide text-amber-800 font-bold mt-1">
                “বিশুদ্ধতায় লক্ষ্য, তৃপ্তিতেই সন্তুষ্টি”
              </span>
            </div>
          </Link>

          {/* ডেক্সটপ মেনু লিংক */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-bold text-slate-700">
            {navLinks.map((link, idx) => {
              const isActive = activeItem === (link.catId || link.href);
              return (
                <Link
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`transition-colors py-1 relative ${
                    isActive ? 'text-amber-800 font-extrabold' : 'hover:text-amber-700'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-800 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ডেক্সটপ ডানপাশের বাটন */}
          <div className="hidden sm:flex items-center gap-3">
            <WhatsAppButton
              size="md"
              label="হোয়াটসঅ্যাপে অর্ডার করুন"
              className="rounded-full shadow-xs font-bold"
            />
          </div>

          {/* মোবাইল মেনু টগল বাটন */}
          <div className="flex items-center gap-2 sm:hidden">
            <WhatsAppButton
              size="sm"
              label="অর্ডার"
              className="rounded-full !px-3 font-bold"
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
              aria-label="মেনু খুলুন"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* মোবাইল মেনু ড্রয়ার */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-amber-100 px-6 py-5 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3 text-sm font-bold text-slate-800">
              {navLinks.map((link, idx) => {
                const isActive = activeItem === (link.catId || link.href);
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`py-2 border-b border-slate-50 transition-all ${
                      isActive
                        ? 'text-amber-800 font-black pl-2 bg-amber-50/70 rounded-lg'
                        : 'hover:text-amber-700 hover:pl-1'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <WhatsAppButton
                size="md"
                label="সরাসরি হোয়াটসঅ্যাপ অর্ডার"
                className="w-full text-center"
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}