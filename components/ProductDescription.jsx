'use client';

import { StarIcon } from "lucide-react";
import React from "react";

const ProductDescription = ({ product }) => {
    let ratingNumber = 5;
    if (typeof product.rating === 'number') {
        ratingNumber = product.rating;
    } else if (Array.isArray(product.rating) && product.rating.length > 0) {
        ratingNumber = product.rating.reduce((acc, item) => acc + (item.rating || 0), 0) / product.rating.length;
    }
    const roundedRating = Math.round(ratingNumber);

    return (
        <div className="my-14 text-sm text-slate-600">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
                <button className="border-b-2 border-slate-800 font-semibold px-4 py-2 text-slate-800">
                    Product Description & Details
                </button>
            </div>

            {/* Description Body */}
            <div className="max-w-3xl space-y-6">
                <p className="leading-relaxed text-slate-700 text-base">
                    {product.description || "No description provided for this product."}
                </p>

                {/* Rating Highlight Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <h4 className="text-base font-semibold text-slate-800">Customer Satisfaction Score</h4>
                        <p className="text-xs text-slate-500 mt-1">Verified product rating configured directly in catalog</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-slate-200">
                        <div className="flex">
                            {Array(5).fill('').map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={18}
                                    className='text-transparent mt-0.5'
                                    fill={roundedRating >= index + 1 ? "#00C950" : "#D1D5DB"}
                                />
                            ))}
                        </div>
                        <span className="font-bold text-slate-800 text-lg">{ratingNumber.toFixed(1)}</span>
                        <span className="text-xs text-slate-400">/ 5.0</span>
                    </div>
                </div>

                {/* Store Guarantee */}
                <div className="pt-2 text-xs text-slate-500">
                    <p>Sold & Fulfilled by <span className="font-semibold text-slate-700">{product.storeName || product.store?.name || 'MustBuy Official'}</span></p>
                </div>
            </div>
        </div>
    );
};

export default ProductDescription;