'use client';

import { assets } from '@/assets/assets';
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import CategoriesMarquee from './CategoriesMarquee';
import { useQuery } from '@apollo/client/react';
import { GET_LANDING_PAGE } from '@/lib/graphql/queries';
import { getStrapiMedia } from '@/lib/media';

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳';
    const { data } = useQuery(GET_LANDING_PAGE, { errorPolicy: 'ignore' });
    const lp = data?.landingPage;

    // Strapi CMS data managed by user
    const heroBadge = lp?.heroBadge || '🔥 Fast Delivery Across Bangladesh';
    const heroTitle = lp?.heroTitle || "Gadgets & lifestyle products you'll love at trusted prices.";
    const heroPrice = lp?.heroPriceStart != null ? lp.heroPriceStart : '299';
    const heroButtonText = lp?.heroButtonText || 'SHOP NOW';
    const heroBg = lp?.heroBgColor || '#dcfce7';
    const heroImgUrl = (lp?.heroImage?.url ? getStrapiMedia(lp.heroImage) : null) || assets.hero_model_img;
    const heroProductLink = (lp?.heroProduct ? `/product/${lp.heroProduct.documentId || lp.heroProduct.slug}` : '/shop');

    const banner1Title = lp?.banner1Title || 'Top Gadgets';
    const banner1Subtitle = lp?.banner1Subtitle || 'Shop Now';
    const banner1Bg = lp?.banner1BgColor || '#fed7aa';
    const banner1ImgUrl = (lp?.banner1Image?.url ? getStrapiMedia(lp.banner1Image) : null) || assets.hero_product_img1;
    const banner1Link = (lp?.banner1Product ? `/product/${lp.banner1Product.documentId || lp.banner1Product.slug}` : '/shop');

    const banner2Title = lp?.banner2Title || 'Up to 30% Off';
    const banner2Subtitle = lp?.banner2Subtitle || 'Limited Deals';
    const banner2Bg = lp?.banner2BgColor || '#bfdbfe';
    const banner2ImgUrl = (lp?.banner2Image?.url ? getStrapiMedia(lp.banner2Image) : null) || assets.hero_product_img2;
    const banner2Link = (lp?.banner2Product ? `/product/${lp.banner2Product.documentId || lp.banner2Product.slug}` : '/shop');

    return (
        <div className='mx-4 sm:mx-6'>
            <div className='flex max-xl:flex-col gap-6 sm:gap-8 max-w-7xl mx-auto my-6 sm:my-10'>
                {/* Hero Grid Item 1: Main Banner */}
                <div
                    style={{ backgroundColor: heroBg }}
                    className='relative flex-1 flex flex-col rounded-3xl xl:min-h-100 group transition-all duration-300 overflow-hidden shadow-xs'
                >
                    <div className='p-6 sm:p-12 md:p-16 z-10'>
                        <div className='inline-flex items-center gap-2 sm:gap-3 bg-white/60 text-slate-800 pr-3 sm:pr-4 p-1 rounded-full text-xs sm:text-sm backdrop-blur-xs shadow-xs'>
                            <span className='bg-emerald-600 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider'>NEWS</span>
                            <span className='truncate max-w-[220px] sm:max-w-none'>{heroBadge}</span>
                            <ChevronRightIcon className='group-hover:ml-1 sm:group-hover:ml-2 transition-all flex-shrink-0' size={16} />
                        </div>
                        <h2 className='text-2xl sm:text-4xl lg:text-5xl leading-[1.2] my-3 sm:my-4 font-bold text-slate-900 max-w-xs sm:max-w-md'>
                            {heroTitle}
                        </h2>
                        <div className='text-slate-800 text-sm font-medium mt-3 sm:mt-6'>
                            <p className='text-slate-600 text-xs sm:text-sm'>Starts from</p>
                            <p className='text-2xl sm:text-3xl font-bold text-slate-900'>{currency} {heroPrice}</p>
                        </div>
                        <Link href={heroProductLink}>
                            <button className='bg-slate-900 text-white text-xs sm:text-sm py-3 px-8 sm:py-4 sm:px-10 mt-5 sm:mt-8 rounded-xl hover:bg-black hover:scale-102 active:scale-95 transition-all cursor-pointer shadow-md font-semibold'>
                                {heroButtonText}
                            </button>
                        </Link>
                    </div>
                    {typeof heroImgUrl === 'string' ? (
                        <img
                            className='sm:absolute bottom-0 right-0 md:right-8 w-full sm:max-w-sm lg:max-w-md object-contain max-h-72 sm:max-h-96 pointer-events-none'
                            src={heroImgUrl}
                            alt="Hero Banner"
                        />
                    ) : (
                        <Image
                            className='sm:absolute bottom-0 right-0 md:right-8 w-full sm:max-w-sm lg:max-w-md pointer-events-none'
                            src={heroImgUrl}
                            alt=""
                        />
                    )}
                </div>

                {/* Hero Grid Items 2 & 3: Side Banners */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-4 sm:gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    {/* Hero Grid Item 2 */}
                    <Link
                        href={banner1Link}
                        style={{ backgroundColor: banner1Bg }}
                        className='flex-1 flex items-center justify-between w-full rounded-3xl p-5 sm:p-6 px-6 sm:px-8 group transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden'
                    >
                        <div className='z-10'>
                            <p className='text-xl sm:text-2xl font-bold text-slate-900 max-w-36 leading-tight'>
                                {banner1Title}
                            </p>
                            <p className='flex items-center gap-1 mt-3 sm:mt-4 text-slate-800 text-xs sm:text-sm font-semibold'>
                                {banner1Subtitle} <ArrowRightIcon className='group-hover:translate-x-1.5 transition-transform' size={16} />
                            </p>
                        </div>
                        {typeof banner1ImgUrl === 'string' ? (
                            <img className='w-24 sm:w-32 h-24 sm:h-32 object-contain group-hover:scale-105 transition-transform duration-300' src={banner1ImgUrl} alt="" />
                        ) : (
                            <Image className='w-24 sm:w-32 group-hover:scale-105 transition-transform duration-300' src={banner1ImgUrl} alt="" />
                        )}
                    </Link>

                    {/* Hero Grid Item 3 */}
                    <Link
                        href={banner2Link}
                        style={{ backgroundColor: banner2Bg }}
                        className='flex-1 flex items-center justify-between w-full rounded-3xl p-5 sm:p-6 px-6 sm:px-8 group transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden'
                    >
                        <div className='z-10'>
                            <p className='text-xl sm:text-2xl font-bold text-slate-900 max-w-36 leading-tight'>
                                {banner2Title}
                            </p>
                            <p className='flex items-center gap-1 mt-3 sm:mt-4 text-slate-800 text-xs sm:text-sm font-semibold'>
                                {banner2Subtitle} <ArrowRightIcon className='group-hover:translate-x-1.5 transition-transform' size={16} />
                            </p>
                        </div>
                        {typeof banner2ImgUrl === 'string' ? (
                            <img className='w-24 sm:w-32 h-24 sm:h-32 object-contain group-hover:scale-105 transition-transform duration-300' src={banner2ImgUrl} alt="" />
                        ) : (
                            <Image className='w-24 sm:w-32 group-hover:scale-105 transition-transform duration-300' src={banner2ImgUrl} alt="" />
                        )}
                    </Link>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    );
};

export default Hero;