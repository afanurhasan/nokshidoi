'use client';

import { assets } from '@/assets/assets';
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CategoriesMarquee from './CategoriesMarquee';
import { useQuery } from '@apollo/client/react';
import { GET_LANDING_PAGE } from '@/lib/graphql/queries';
import { getStrapiMedia } from '@/lib/media';

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const { data } = useQuery(GET_LANDING_PAGE, { errorPolicy: 'ignore' });

    const lp = data?.landingPage;

    const heroBadge = lp?.heroBadge || 'Free Shipping on Orders Above $50!';
    const heroTitle = lp?.heroTitle || "Gadgets you'll love. Prices you'll trust.";
    const heroPrice = lp?.heroPriceStart != null ? lp.heroPriceStart : '4.90';
    const heroButtonText = lp?.heroButtonText || 'LEARN MORE';
    const heroBg = lp?.heroBgColor || '#bbf7d0';
    const heroImgUrl = (lp?.heroImage?.url ? getStrapiMedia(lp.heroImage) : null) || assets.hero_model_img;
    const heroProductLink = lp?.heroProduct ? `/product/${lp.heroProduct.documentId || lp.heroProduct.slug}` : '/shop';

    const banner1Title = lp?.banner1Title || 'Best products';
    const banner1Subtitle = lp?.banner1Subtitle || 'View more';
    const banner1Bg = lp?.banner1BgColor || '#fed7aa';
    const banner1ImgUrl = (lp?.banner1Image?.url ? getStrapiMedia(lp.banner1Image) : null) || assets.hero_product_img1;
    const banner1Link = lp?.banner1Product ? `/product/${lp.banner1Product.documentId || lp.banner1Product.slug}` : '/shop';

    const banner2Title = lp?.banner2Title || '20% discounts';
    const banner2Subtitle = lp?.banner2Subtitle || 'View more';
    const banner2Bg = lp?.banner2BgColor || '#bfdbfe';
    const banner2ImgUrl = (lp?.banner2Image?.url ? getStrapiMedia(lp.banner2Image) : null) || assets.hero_product_img2;
    const banner2Link = lp?.banner2Product ? `/product/${lp.banner2Product.documentId || lp.banner2Product.slug}` : '/shop';

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                {/* Hero Grid Item 1: Main Banner */}
                <div
                    style={{ backgroundColor: heroBg }}
                    className='relative flex-1 flex flex-col rounded-3xl xl:min-h-100 group transition-colors duration-300'
                >
                    <div className='p-5 sm:p-16'>
                        <div className='inline-flex items-center gap-3 bg-white/40 text-slate-800 pr-4 p-1 rounded-full text-xs sm:text-sm backdrop-blur-xs'>
                            <span className='bg-green-600 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs font-semibold'>NEWS</span>
                            {heroBadge}
                            <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 className='text-3xl sm:text-5xl leading-[1.2] my-3 font-semibold text-slate-900 max-w-xs sm:max-w-md'>
                            {heroTitle}
                        </h2>
                        <div className='text-slate-800 text-sm font-medium mt-4 sm:mt-8'>
                            <p className='text-slate-600'>Starts from</p>
                            <p className='text-3xl font-semibold'>{currency}{heroPrice}</p>
                        </div>
                        <Link href={heroProductLink}>
                            <button className='bg-slate-800 text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-slate-900 hover:scale-103 active:scale-95 transition cursor-pointer shadow-sm'>
                                {heroButtonText}
                            </button>
                        </Link>
                    </div>
                    {typeof heroImgUrl === 'string' ? (
                        <img
                            className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm object-contain'
                            src={heroImgUrl}
                            alt="Hero Banner"
                        />
                    ) : (
                        <Image
                            className='sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm'
                            src={heroImgUrl}
                            alt=""
                        />
                    )}
                </div>

                {/* Hero Grid Items 2 & 3: Side Banners */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    {/* Hero Grid Item 2 */}
                    <Link
                        href={banner1Link}
                        style={{ backgroundColor: banner1Bg }}
                        className='flex-1 flex items-center justify-between w-full rounded-3xl p-6 px-8 group transition hover:shadow-md cursor-pointer'
                    >
                        <div>
                            <p className='text-3xl font-semibold text-slate-800 max-w-40 leading-tight'>
                                {banner1Title}
                            </p>
                            <p className='flex items-center gap-1 mt-4 text-slate-700 font-medium'>
                                {banner1Subtitle} <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />
                            </p>
                        </div>
                        {typeof banner1ImgUrl === 'string' ? (
                            <img className='w-32 object-contain' src={banner1ImgUrl} alt="" />
                        ) : (
                            <Image className='w-35' src={banner1ImgUrl} alt="" />
                        )}
                    </Link>

                    {/* Hero Grid Item 3 */}
                    <Link
                        href={banner2Link}
                        style={{ backgroundColor: banner2Bg }}
                        className='flex-1 flex items-center justify-between w-full rounded-3xl p-6 px-8 group transition hover:shadow-md cursor-pointer'
                    >
                        <div>
                            <p className='text-3xl font-semibold text-slate-800 max-w-40 leading-tight'>
                                {banner2Title}
                            </p>
                            <p className='flex items-center gap-1 mt-4 text-slate-700 font-medium'>
                                {banner2Subtitle} <ArrowRightIcon className='group-hover:ml-2 transition-all' size={18} />
                            </p>
                        </div>
                        {typeof banner2ImgUrl === 'string' ? (
                            <img className='w-32 object-contain' src={banner2ImgUrl} alt="" />
                        ) : (
                            <Image className='w-35' src={banner2ImgUrl} alt="" />
                        )}
                    </Link>
                </div>
            </div>
            <CategoriesMarquee />
        </div>
    );
};

export default Hero;