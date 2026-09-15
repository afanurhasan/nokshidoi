'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="size-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4 font-black text-2xl">
        ৪০৪
      </div>
      <h2 className="text-3xl font-black text-slate-900">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="mt-2 text-sm text-slate-600 max-w-sm font-medium">
        আপনি যে দই বা পেজটি খুঁজছেন তা বর্তমান নেই অথবা লিংক পরিবর্তন হয়েছে।
      </p>
      <Link
        href="/"
        className="mt-6 rounded-2xl bg-amber-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-900 shadow-sm"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
