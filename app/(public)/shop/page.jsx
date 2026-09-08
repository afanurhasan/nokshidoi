'use client';

import { Suspense, useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { MoveLeftIcon, FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS, GET_CATEGORIES } from "@/lib/graphql/queries";
import { setProduct } from "@/lib/features/product/productSlice";

function ShopContent() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'All';
    const router = useRouter();
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);

    // Fetch from GraphQL
    const { data: productsData } = useQuery(GET_PRODUCTS, { errorPolicy: 'ignore' });
    const { data: categoriesData } = useQuery(GET_CATEGORIES, { errorPolicy: 'ignore' });

    const storeProducts = useSelector(state => state.product.list);

    // Sync fetched products to Redux store
    useEffect(() => {
        if (productsData?.products?.length > 0) {
            dispatch(setProduct(productsData.products));
        }
    }, [productsData, dispatch]);

    const products = productsData?.products?.length > 0 ? productsData.products : storeProducts;

    // Available categories (combine from GraphQL and fallback)
    const categoryList = categoriesData?.categories?.length > 0
        ? ['All', ...categoriesData.categories.map(c => c.name)]
        : ['All', 'Headphones', 'Speakers', 'Watch', 'Earbuds', 'Mouse', 'Decoration'];

    // Filter by search & category
    const filteredProducts = products.filter(product => {
        const matchesSearch = search
            ? product.name?.toLowerCase().includes(search.toLowerCase())
            : true;

        const productCatName = typeof product.category === 'object'
            ? product.category?.name
            : product.category;

        const matchesCategory = selectedCategory === 'All'
            ? true
            : productCatName?.toLowerCase() === selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
                    <h1
                        onClick={() => { setSelectedCategory('All'); router.push('/shop'); }}
                        className="text-2xl text-slate-500 flex items-center gap-2 cursor-pointer hover:text-slate-800 transition"
                    >
                        {search && <MoveLeftIcon size={20} />}
                        All <span className="text-slate-800 font-semibold">Products</span>
                    </h1>

                    {/* Category Filter Pills (Wrap seamlessly without scrollbar) */}
                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-1">
                            <FilterIcon size={14} /> Filter:
                        </div>
                        {categoryList.map((cat, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                                    selectedCategory.toLowerCase() === cat.toLowerCase()
                                        ? 'bg-slate-800 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full mb-32">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.documentId || product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[40vh] flex flex-col items-center justify-center text-slate-400 gap-3">
                        <p className="text-lg">No products found matching your filter.</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); router.push('/shop'); }}
                            className="text-sm text-green-600 underline cursor-pointer"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="p-10 text-center text-slate-500">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}