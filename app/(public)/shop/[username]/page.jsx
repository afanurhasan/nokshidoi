'use client';

import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MailIcon, MapPinIcon, Store } from "lucide-react";
import Loading from "@/components/Loading";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/lib/graphql/queries";
import { useSelector } from "react-redux";

export default function StoreShop() {
    const { username } = useParams();
    const { data: prodsData, loading: prodsLoading } = useQuery(GET_PRODUCTS, { errorPolicy: 'ignore' });
    const storeProducts = useSelector(state => state.product.list);

    const products = prodsData?.products?.length > 0 ? prodsData.products : storeProducts;

    const storeInfo = {
        name: decodeURIComponent(username || 'MustBuy Store'),
        description: "Official storefront curated with genuine products and warranty support.",
        address: "Dhaka, Bangladesh",
        email: "support@mustbuy.com.bd",
    };

    if (prodsLoading && products.length === 0) {
        return <Loading />;
    }

    return (
        <div className="min-h-[70vh] mx-6">
            {/* Store Info Banner */}
            <div className="max-w-7xl mx-auto bg-slate-50 rounded-2xl p-6 md:p-10 mt-6 flex flex-col md:flex-row items-center gap-6 border border-slate-200 shadow-xs">
                <div className="size-24 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                    <Store size={40} />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 capitalize">{storeInfo.name}</h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg">{storeInfo.description}</p>
                    <div className="space-y-1 text-xs text-slate-500 mt-4">
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <MapPinIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{storeInfo.address}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                            <MailIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{storeInfo.email}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="max-w-7xl mx-auto mb-40 mt-10">
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                    Store <span className="text-emerald-600">Products</span> ({products.length})
                </h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.documentId || product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
                        No products available in this store currently.
                    </div>
                )}
            </div>
        </div>
    );
}