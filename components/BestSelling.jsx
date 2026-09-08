'use client';

import React from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client/react';
import { GET_LANDING_PAGE } from '@/lib/graphql/queries';

const BestSelling = () => {
    const displayQuantity = 8;
    const storeProducts = useSelector(state => state.product.list);

    const { data } = useQuery(GET_LANDING_PAGE, { errorPolicy: 'ignore' });
    const lp = data?.landingPage;

    const sectionTitle = lp?.bestSellingSectionTitle || 'Best Selling';
    const dynamicProducts = lp?.bestSellingProducts && lp.bestSellingProducts.length > 0 ? lp.bestSellingProducts : null;

    const productsToDisplay = dynamicProducts
        ? dynamicProducts.slice(0, displayQuantity)
        : storeProducts.slice().sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0, displayQuantity);

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