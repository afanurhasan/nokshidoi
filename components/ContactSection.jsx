'use client';

import React from 'react';
import Title from './Title';
import { BUSINESS_CONFIG } from '@/config/business';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { Phone, Mail, MapPin, Bus, CreditCard, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 py-16 sm:py-24 bg-gradient-to-b from-white to-amber-50/70 border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title
          badge={`“${BUSINESS_CONFIG.motto}”`}
          title="যোগাযোগ, পাইকারি অর্ডার ও পেমেন্ট ডেস্ক"
          subtitle="বগুড়ার ঐতিহ্যবাহী স্বাদ, পেশাদার পাইকারি সরবরাহের ঠিকানা"
          description="অনলাইন অর্ডার শুধুমাত্র পাইকারি ক্রেতাদের জন্য। খুচরা বিক্রয় আমাদের শোরুম থেকে করা হয়। যেকোনো পাইকারি অর্ডারে আমাদের অফিশিয়াল হোয়াটসঅ্যাপে যোগাযোগ করুন।"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 sm:mt-16">
          {/* যোগাযোগের কার্ডসমূহ (৫ কলাম) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* অফিসিয়াল হোয়াটসঅ্যাপ ও পাইকারি অর্ডার কার্ড */}
            <div className="p-6 bg-white rounded-2xl border border-emerald-300 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-emerald-50 text-[#25D366] flex items-center justify-center shrink-0">
                  <WhatsAppIcon size={24} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">অফিশিয়াল পাইকারি ডেস্ক</span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">পাইকারি অর্ডার ও WhatsApp</h4>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    সরাসরি পাইকারি অর্ডার, দরদাম ও রুট ভাড়া জানতে মেসেজ দিন।
                  </p>
                  <a
                    href="https://wa.me/8801778306512"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-black text-emerald-800 hover:text-emerald-950 transition inline-block mt-2 font-mono"
                  >
                    {BUSINESS_CONFIG.whatsappNumberDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* পেমেন্ট নম্বর কার্ড */}
            <div className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <CreditCard size={22} />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">অফিশিয়াল পেমেন্ট নম্বর</span>
                  <h4 className="text-base font-black text-slate-900 mt-0.5">বিকাশ / নগদ পেমেন্ট</h4>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium">
                    অর্ডারের ৩০% অগ্রিম ও বাকি ৭০% + বাস ভাড়া গাড়িতে তোলার আগে পরিশোধযোগ্য:
                  </p>
                  <span className="text-lg font-black text-slate-900 block mt-1.5 font-mono">
                    {BUSINESS_CONFIG.paymentNumber}
                  </span>
                  <p className="text-[11px] text-amber-900 mt-1 font-bold">
                    * পেমেন্টের পর স্ক্রিনশট বা শেষ ৪ ডিজিট WhatsApp-এ পাঠান।
                  </p>
                </div>
              </div>
            </div>

            {/* শোরুম ঠিকানা (খুচরা ক্রেতাদের জন্য) */}
            <div className="p-6 bg-white rounded-2xl border border-amber-200/90 shadow-xs hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">খুচরা বিক্রয় শোরুম</span>
                    <h4 className="text-base font-black text-slate-900 mt-0.5">{BUSINESS_CONFIG.showroomAddress}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium">
                      {BUSINESS_CONFIG.retailNotice}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider block">কারখানা</span>
                    <p className="text-xs font-bold text-slate-800">{BUSINESS_CONFIG.factoryAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ডেলিভারি নীতি ও গুগল ম্যাপ বক্স (৭ কলাম) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-amber-200/80 shadow-xs p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-2">
                <Bus size={16} />
                <span>প্যাসেঞ্জার বাসস্টপেজ সংগ্রহ</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                বগুড়া থেকে দেশব্যাপী নির্ধারিত বাসস্টপেজে সরবরাহ
              </h3>
              <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium space-y-1">
                <p><strong>• সতর্কতা:</strong> এটি হোম ডেলিভারি নয়। নির্ধারিত বাসস্টপেজ থেকে ক্রেতাকে সংগ্রহ করতে হবে।</p>
                <p><strong>• বাস সময়:</strong> বাসের আনুমানিক সময়ের ১০–১৫ মিনিট আগে স্টপেজে উপস্থিত থাকতে হবে।</p>
                <p><strong>• রুট ভাড়া:</strong> রোড লিস্টের বাইরে কোনো রুটের ভাড়া জানতে অফিশিয়াল WhatsApp-এ যোগাযোগ করুন।</p>
              </div>

              {/* গুগল ম্যাপ এমবেড */}
              <div className="mt-6 relative w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-amber-200/80 shadow-xs">
                <iframe
                  title="নকশি দই ভান্ডার গুগল ম্যাপ লোকেশন"
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
                  <span>গুগল ম্যাপে শোরুম দেখুন</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
