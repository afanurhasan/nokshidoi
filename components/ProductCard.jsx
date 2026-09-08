'use client';

import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { getProductImage } from '@/lib/media';

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    let rating = 5;
    if (typeof product.rating === 'number') {
        rating = Math.round(product.rating);
    } else if (Array.isArray(product.rating) && product.rating.length > 0) {
        rating = Math.round(product.rating.reduce((acc, curr) => acc + (curr.rating || 0), 0) / product.rating.length);
    }

    const imageSource = getProductImage(product);
    const targetId = product.documentId || product.id || product.slug;

    return (
        <Link href={`/product/${targetId}`} className='group w-full block transition-transform duration-200 hover:-translate-y-1'>
            <div className='bg-[#F5F5F5] h-48 sm:h-64 w-full rounded-2xl flex items-center justify-center overflow-hidden p-4'>
                {typeof imageSource === 'string' ? (
                    <img
                        className='max-h-36 sm:max-h-48 w-auto object-contain group-hover:scale-110 transition duration-300'
                        src={imageSource}
                        alt={product.name || 'Product'}
                    />
                ) : (
                    <Image
                        width={500}
                        height={500}
                        className='max-h-36 sm:max-h-48 w-auto object-contain group-hover:scale-110 transition duration-300'
                        src={imageSource}
                        alt=""
                    />
                )}
            </div>
            <div className='flex justify-between gap-3 text-sm text-slate-800 pt-3 w-full'>
                <div className='flex-1 min-w-0 pr-1'>
                    <p className='font-medium line-clamp-1 text-slate-800'>{product.name}</p>
                    <div className='flex items-center gap-0.5 mt-0.5'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon
                                key={index}
                                size={13}
                                className='text-transparent'
                                fill={rating >= index + 1 ? "#FF8904" : "#D1D5DB"}
                            />
                        ))}
                        <span className='text-[11px] text-slate-400 ml-1'>
                            ({typeof product.rating === 'number' ? product.rating.toFixed(1) : rating})
                        </span>
                    </div>
                </div>
                <p className='font-bold text-slate-900 shrink-0'>{currency}{product.price}</p>
            </div>
        </Link>
    );
};

export default ProductCard;