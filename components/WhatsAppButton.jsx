'use client';

import React from 'react';
import { getWhatsAppOrderUrl, getWhatsAppWholesaleUrl } from '@/config/business';

export const WhatsAppIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.031 2C6.512 2 2.023 6.48 2.023 11.988c0 1.99.588 3.86 1.611 5.437L2 22l4.757-1.57a9.923 9.923 0 0 0 5.274 1.488h.005c5.517 0 10.007-4.48 10.007-9.988 0-2.668-1.04-5.176-2.93-7.06A9.914 9.914 0 0 0 12.031 2zm0 18.257a8.27 8.27 0 0 1-4.226-1.154l-.303-.18-3.136 1.034 1.049-3.05-.198-.315A8.252 8.252 0 0 1 3.76 11.988c0-4.555 3.71-8.26 8.273-8.26 2.21 0 4.288.86 5.852 2.42a8.212 8.212 0 0 1 2.426 5.845c0 4.557-3.71 8.264-8.28 8.264zm4.536-6.19c-.248-.124-1.468-.724-1.696-.807-.227-.083-.393-.124-.559.124-.165.248-.641.807-.786.973-.145.166-.29.186-.538.062a6.79 6.79 0 0 1-1.997-1.232 7.485 7.485 0 0 1-1.382-1.72c-.145-.248-.016-.383.108-.506.112-.112.248-.29.373-.435.124-.145.165-.248.248-.414.083-.165.042-.31-.02-.435-.063-.124-.559-1.348-.766-1.846-.201-.485-.407-.42-.559-.427h-.477c-.165 0-.435.062-.662.31-.228.249-.87 0.85-.87 2.073 0 1.223.89 2.406 1.014 2.571.124.166 1.752 2.673 4.243 3.75 2.49 1.076 2.49.718 2.936.677.445-.041 1.438-.588 1.64-1.158.203-.57.203-1.057.142-1.159-.06-.103-.225-.165-.473-.29z" />
  </svg>
);

export default function WhatsAppButton({
  product = null,
  isWholesale = false,
  customText = "",
  label = "হোয়াটসঅ্যাপে অর্ডার করুন",
  size = "md",
  className = "",
  showIcon = true,
}) {
  const url = isWholesale
    ? getWhatsAppWholesaleUrl(customText)
    : getWhatsAppOrderUrl(product, customText);

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 rounded-lg",
    md: "px-5 py-2.5 text-sm gap-2 rounded-xl",
    lg: "px-8 py-3.5 text-base gap-2.5 rounded-2xl",
  }[size] || "px-5 py-2.5 text-sm gap-2 rounded-xl";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center font-bold text-white bg-[#25D366] hover:bg-[#20ba59] active:scale-98 transition-all duration-200 shadow-sm hover:shadow-md ${sizeClasses} ${className}`}
    >
      {showIcon && <WhatsAppIcon size={size === 'lg' ? 22 : size === 'sm' ? 15 : 18} />}
      <span>{label}</span>
    </a>
  );
}
