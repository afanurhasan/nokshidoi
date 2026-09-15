'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG, getWhatsAppOrderUrl } from '@/config/business';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { Phone, Mail, MapPin, Truck } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24 bg-gradient-to-b from-white to-amber-50/70 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title
          badge="“বিশুদ্ধতায় লক্ষ্য, তৃপ্তিতেই সন্তুষ্টি”"
          title="যোগাযোগ ও সরাসরি অর্ডার ডেস্ক"
          subtitle="সরাসরি কারখানা থেকে পাইকারি সরবরাহ, সারা বাংলাদেশে ডেলিভারি"
          description="দই, মিষ্টি, ঘি, রসমালাই ও মাঠা — যেকোনো পরিমাণ পাইকারি ও খুচরা অর্ডারে শোরুম বা কারখানা হোয়াটসঅ্যাপে সরাসরি আমাদের সাথে কথা বলুন।"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 sm:mt-16">
          {/* যোগাযোগের কার্ডসমূহ */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* কারখানা হোয়াটসঅ্যাপ কার্ড */}
            <div className="p-6 bg-white rounded-2xl border border-emerald-200/90 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={24} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">সরাসরি কারখানা</span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">কারখানা হোয়াটসঅ্যাপ অর্ডার</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    সরাসরি কারখানা থেকে পাইকারি ও রিটেইল অর্ডারের জন্য মেসেজ দিন।
                  </p>
                  <a
                    href={BUSINESS_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-black text-slate-900 hover:text-emerald-700 transition inline-block mt-2"
                  >
                    {BUSINESS_CONFIG.factoryPhone}
                  </a>
                </div>
              </div>
            </div>

            {/* শোরুম ফোন ও ইমেইল কার্ড */}
            <div className="p-6 bg-white rounded-2xl border border-amber-100/90 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">সরাসরি শোরুম</span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">শোরুম কল ও অর্ডার ডেস্ক</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">যেকোনো তথ্য ও সরাসরি কেনাকাটায় কল করুন</p>
                  <a
                    href={`tel:${BUSINESS_CONFIG.showroomPhoneRaw}`}
                    className="text-base font-black text-amber-900 hover:text-amber-950 transition block mt-1.5"
                  >
                    {BUSINESS_CONFIG.showroomPhone}
                  </a>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2">
                    <Mail size={14} className="text-amber-700 shrink-0" />
                    <a
                      href={`mailto:${BUSINESS_CONFIG.email}`}
                      className="text-xs font-bold text-slate-700 hover:text-amber-900 transition"
                    >
                      {BUSINESS_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* শোরুম ও কারখানা ঠিকানা */}
            <div className="p-6 bg-white rounded-2xl border border-amber-100/90 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="flex-1 space-y-2.5">
                  <div>
                    <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">শোরুম</span>
                    <p className="text-sm font-black text-slate-900">{BUSINESS_CONFIG.showroomAddress}</p>
                    <p className="text-xs text-slate-600 font-bold mt-0.5">ফোন: {BUSINESS_CONFIG.showroomPhone}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">কারখানা</span>
                    <p className="text-sm font-black text-slate-900">{BUSINESS_CONFIG.factoryAddress}</p>
                    <p className="text-xs text-slate-600 font-bold mt-0.5">হোয়াটসঅ্যাপ: {BUSINESS_CONFIG.factoryPhone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ডেলিভারি এলাকা ও গুগল ম্যাপ বক্স */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-amber-200/80 shadow-xs p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Truck size={16} />
                <span>সারা বাংলাদেশে পাইকারি ডেলিভারি</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                সরাসরি কারখানা থেকে পাইকারি সরবরাহ, সারা বাংলাদেশে ডেলিভারি
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                বগুড়ার ঐতিহ্যবাহী খাঁটি <strong>দই, মিষ্টি, ঘি, রসমালাই ও মাঠা</strong> — বিশেষ তাপনিয়ন্ত্রিত ও নিরাপদ প্যাকেজিংয়ের মাধ্যমে সরাসরি কারখানা থেকে সারা দেশের যেকোনো জেলায় অক্ষত ও তাজা অবস্থায় পৌঁছে দেওয়া হয়।
              </p>

              {/* গুগল ম্যাপ এমবেড */}
              <div className="mt-6 relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-amber-200/80 shadow-xs">
                <iframe
                  title="নকশী দই ভাণ্ডার গুগল ম্যাপ লোকেশন"
                  src={BUSINESS_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <a
                  href={BUSINESS_CONFIG.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-slate-900 font-bold text-xs rounded-lg shadow-md border border-slate-200 transition"
                >
                  <MapPin size={13} className="text-red-600" />
                  <span>গুগল ম্যাপে দেখুন</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <span className="font-bold text-slate-600">দেশজুড়ে নিরাপদ ও অক্ষত ডেলিভারির নিশ্চয়তা</span>
              <WhatsAppButton size="sm" label="ডেলিভারি বিষয়ে জানতে চান" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
