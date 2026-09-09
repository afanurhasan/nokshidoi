'use client';

import React from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client/react';
import { GET_LANDING_PAGE, GET_PRODUCTS } from '@/lib/graphql/queries';
import { setProduct } from '@/lib/features/product/productSlice';

const BestSelling = () => {
    const displayQuantity = 8;
    const dispatch = useDispatch();
    const storeProducts = useSelector(state => state.product.list);

    const { data: lpData } = useQuery(GET_LANDING_PAGE, { errorPolicy: 'ignore' });
    const { data: prodsData } = useQuery(GET_PRODUCTS, { errorPolicy: 'ignore' });

    // Sync products to Redux store
    React.useEffect(() => {
        if (prodsData?.products?.length > 0 && storeProducts.length === 0) {
            dispatch(setProduct(prodsData.products));
        }
    }, [prodsData, storeProducts.length, dispatch]);

    const lp = lpData?.landingPage;
    const sectionTitle = lp?.bestSellingSectionTitle || 'Best Selling';
    const dynamicProducts = lp?.bestSellingProducts && lp.bestSellingProducts.length > 0 ? lp.bestSellingProducts : null;

    const availableProducts = dynamicProducts || prodsData?.products || storeProducts;

    const productsToDisplay = availableProducts
        .slice()
        .sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0))
        .slice(0, displayQuantity);

    if (productsToDisplay.length === 0) {
        return null;
    }

    return (
        <div className='px-6 my-24 max-w-6xl mx-auto'>
            <Title
                title={sectionTitle}
                description={`Showing ${productsToDisplay.length} products`}
                href='/shop'
            />
            <div className='mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
                {productsToDisplay.map((product, index) => (
                    <ProductCard key={product.documentId || product.id || index} product={product} />
                ))}
            </div>
        </div>
    );
};

export default BestSelling;