'use client';

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/lib/graphql/queries";
import { getProductImage } from "@/lib/media";

export default function StoreManageProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳';
    const { data, loading } = useQuery(GET_PRODUCTS, { errorPolicy: 'ignore' });
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (data?.products) {
            setProducts(data.products);
        }
    }, [data]);

    const toggleStock = async (productId) => {
        setProducts(prev => prev.map(p => {
            if ((p.documentId || p.id) === productId) {
                return { ...p, inStock: !p.inStock };
            }
            return p;
        }));
        return Promise.resolve();
    };

    if (loading && products.length === 0) return <Loading />;

    return (
        <>
            <h1 className="text-2xl text-slate-500 mb-5">Manage <span className="text-slate-800 font-medium">Products</span></h1>
            {products.length > 0 ? (
                <table className="w-full max-w-4xl text-left ring ring-slate-200 rounded-xl overflow-hidden text-sm">
                    <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3 hidden md:table-cell">Description</th>
                            <th className="px-4 py-3 hidden md:table-cell">MRP</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3 text-center">In Stock</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-700">
                        {products.map((product) => {
                            const pId = product.documentId || product.id;
                            const imgSrc = getProductImage(product);
                            return (
                                <tr key={pId} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2.5 items-center">
                                            <img
                                                className='size-10 object-contain p-1 border rounded-lg bg-white shrink-0'
                                                src={typeof imgSrc === 'string' ? imgSrc : imgSrc.src}
                                                alt=""
                                            />
                                            <span className="font-medium text-slate-900">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 max-w-xs text-slate-500 hidden md:table-cell truncate">{product.description}</td>
                                    <td className="px-4 py-3 hidden md:table-cell text-slate-400 line-through">{currency} {Number(product.mrp || 0).toLocaleString()}</td>
                                    <td className="px-4 py-3 font-semibold text-slate-800">{currency} {Number(product.price || 0).toLocaleString()}</td>
                                    <td className="px-4 py-3 text-center">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                onChange={() => toast.promise(toggleStock(pId), { loading: "Updating stock..." })}
                                                checked={product.inStock !== false}
                                            />
                                            <div className="w-9 h-5 bg-slate-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
                                        </label>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200 max-w-4xl">
                    No products found in Strapi backend.
                </div>
            )}
        </>
    );
}