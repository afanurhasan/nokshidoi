'use client';

import React, { useState } from 'react';
import Title from './Title';
import { BUSINESS_CONFIG, getWhatsAppWholesaleUrl } from '@/config/business';
import WhatsAppButton from './WhatsAppButton';
import {
  Bus,
  MapPin,
  Clock,
  AlertTriangle,
  ShieldAlert,
  Search,
  CheckCircle2,
  CalendarClock,
} from 'lucide-react';

export default function DeliveryRouteSection() {
  const [routeSearch, setRouteSearch] = useState('');
  const policy = BUSINESS_CONFIG.deliveryPolicy;
  const routes = BUSINESS_CONFIG.transportRoutes;

  const filteredRoutes = routes.filter((r) =>
    r.name.toLowerCase().includes(routeSearch.toLowerCase()) ||
    r.division.toLowerCase().includes(routeSearch.toLowerCase())
  );

  return (
    <section id="delivery-routes" className="scroll-mt-20 py-16 sm:py-24 bg-white border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title
          badge={policy.badge}
          title={policy.title}
          subtitle="বগুড়া থেকে দেশব্যাপী নির্ধারিত প্যাসেঞ্জার বাস রুটে পাইকারি পরিবহন"
          description="পণ্য সাধারণত পরবর্তী দিনে প্যাসেঞ্জার বাসের মাধ্যমে নির্ধারিত রুটে পাঠানো হয়। রুট ও বাসের সময় অনুযায়ী পণ্য দিন বা রাতে পৌঁছাতে পারে।"
        />

        {/* হোম ডেলিভারি নয় — সতর্কবার্তা কার্ড */}
        <div className="mt-8 max-w-4xl mx-auto p-5 sm:p-6 bg-red-50/90 border-2 border-red-300 rounded-3xl shadow-sm flex flex-col sm:flex-row items-start gap-4">
          <div className="p-3 bg-red-100 text-red-700 rounded-2xl shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div className="space-y-1.5 flex-1">
            <span className="text-xs font-black uppercase tracking-wider text-red-700 block">
              জরুরি ডেলিভারি শর্ত
            </span>
            <h4 className="text-base sm:text-lg font-black text-red-950">
              {policy.isNotHomeDelivery}
            </h4>
            <p className="text-xs sm:text-sm text-red-900 leading-relaxed font-medium">
              {policy.busArrivalTimeRule}
            </p>
          </div>
        </div>

        {/* অর্ডার টাইমিং ও লিড টাইম কার্ড */}
        <div className="mt-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <CalendarClock size={22} className="text-amber-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">অর্ডারের অগ্রিম সময়কাল</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {policy.leadTimeRule}
              </p>
            </div>
          </div>

          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <Clock size={22} className="text-emerald-800 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">গাড়ি ছাড়া ও পৌঁছানোর সময়</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {policy.scheduleDescription}
              </p>
            </div>
          </div>
        </div>

        {/* প্রধান প্যাসেঞ্জার বাস রুটসমূহ */}
        <div className="mt-14 bg-gradient-to-b from-amber-50/70 to-white rounded-3xl p-6 sm:p-10 border border-amber-200/80 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-amber-200/60">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider">
                <Bus size={18} />
                <span>বগুড়া টু সারাদেশ প্যাসেঞ্জার রুট</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                প্রধান প্যাসেঞ্জার বাস রুটসমূহ ({routes.length}টি প্রধান পয়েন্ট)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">
                বগুড়া থেকে নির্ধারিত প্যাসেঞ্জার বাস রুটের মাধ্যমে দেশের বিভিন্ন অঞ্চলে পাইকারি পণ্য পাঠানো হয়।
              </p>
            </div>

            {/* সার্চ বক্স */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="রুট বা জেলার নাম খুঁজুন..."
                value={routeSearch}
                onChange={(e) => setRouteSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-amber-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* রুট গ্রিড */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6">
            {filteredRoutes.map((route, i) => (
              <div
                key={i}
                className="p-3 bg-white rounded-xl border border-amber-200/90 shadow-2xs hover:border-amber-400 hover:shadow-xs transition flex items-center gap-2.5 group"
              >
                <div className="size-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-800 group-hover:text-white transition">
                  <MapPin size={14} />
                </div>
                <div className="truncate">
                  <span className="text-xs font-black text-slate-900 block truncate group-hover:text-amber-800 transition">
                    {route.name}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 block">
                    {route.division}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* রোড লিস্টের বাইরে যোগাযোগ বার্তা */}
          <div className="mt-8 pt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p className="text-slate-700 font-bold text-center sm:text-left">
              💡 {BUSINESS_CONFIG.customRouteNotice}
            </p>
            <WhatsAppButton
              size="sm"
              label="অন্যান্য রুটের ভাড়া ও শিডিউল জানুন"
              className="font-bold shrink-0"
            />
          </div>
        </div>

        {/* পরিবহনজনিত ক্ষতির দায় সংক্রান্ত ডিসক্লেইমার */}
        <div className="mt-10 p-6 bg-stone-50 border border-stone-200 rounded-2xl max-w-4xl mx-auto flex items-start gap-4">
          <ShieldAlert size={24} className="text-amber-800 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider">
              পরিবহনজনিত ক্ষতির বিষয় (স্পষ্ট নীতিমালা)
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              {policy.damageDisclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
