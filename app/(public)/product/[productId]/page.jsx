'use client';

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/lib/graphql/queries";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [restProducts, setRestProducts] = useState([]);
    const reduxProducts = useSelector(state => state.product.list);

    const { data } = useQuery(GET_PRODUCTS, { 
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore' 
    });

    useEffect(() => {
        const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
        fetch(`${strapiUrl}/api/products?populate=*`)
            .then(r => r.json())
            .then(json => {
                const list = json?.data;
                if (Array.isArray(list) && list.length > 0) {
                    setRestProducts(list);
                }
            })
            .catch(() => {});
    }, []);

    const allProducts = data?.products?.length > 0 
        ? data.products 
        : (reduxProducts?.length > 0 ? reduxProducts : restProducts);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const found = allProducts.find(
                (p) => p.documentId === productId || p.id === productId || p.slug === productId
            );
            setProduct(found || allProducts[0]);
        }
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
        }
    }, [productId, allProducts]);

    const categoryName = typeof product?.category === 'object'
        ? product.category?.name
        : product?.category || 'All Products';

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs */}
                <div className="text-gray-500 text-sm mt-8 mb-5">
                    Home / Products / <span className="text-slate-800 font-medium">{categoryName}</span>
                </div>

                {/* Product Details */}
                {product ? (
                    <>
                        <ProductDetails product={product} />
                        <ProductDescription product={product} />
                        <RelatedProducts currentProduct={product} allProducts={allProducts} />
                    </>
                ) : (
                    <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
                        Loading product details...
                    </div>
                )}
            </div>
        </div>
    );
}