'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Title = ({
  title,
  subtitle = "",
  description,
  badge = "",
  visibleButton = false,
  href = '/#products',
  buttonText = 'সব দেখুন',
  align = 'center',
}) => {
  const alignClasses = {
    center: 'items-center text-center',
    left: 'items-start text-left',
  }[align] || 'items-center text-center';

  return (
    <div className={`flex flex-col ${alignClasses} max-w-3xl mx-auto`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 text-amber-950 text-xs font-black uppercase tracking-wider mb-2.5">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-amber-800 font-bold text-sm sm:text-base mt-1">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed max-w-2xl font-medium">
          {description}
        </p>
      )}
      {visibleButton && href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-bold text-sm mt-3.5 group transition-colors"
        >
          <span>{buttonText}</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default Title;