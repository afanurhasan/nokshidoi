'use client';

import React, { useState, useEffect } from 'react';
import Title from './Title';
import ProductCard from './ProductCard';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client/react';
import { GET_LANDING_PAGE } from '@/lib/graphql/queries';

const getGridColsClass = (columns) => {
    switch (Number(columns)) {
        case 2:
            return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2';
        case 3:
            return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3';
        case 5:
            return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
        case 6:
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6';
        case 4:
        default:
            return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }
};

const DynamicProductSections = ({ sections: propSections }) => {
    const storeProducts = useSelector(state => state.product.list);
    const { data } = useQuery(GET_LANDING_PAGE, { 
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore' 
    });
    const [restSections, setRestSections] = useState(null);

    const sections = propSections || data?.landingPage?.productSections || restSections;

    useEffect(() => {
        if (!sections || sections.length === 0) {
            const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');
            fetch(`${strapiUrl}/api/landing-page?populate[productSections][populate][products][populate]=*`)
                .then(r => r.json())
                .then(json => {
                    const sec = json?.data?.productSections;
                    if (Array.isArray(sec) && sec.length > 0) {
                        setRestSections(sec);
                    }
                })
                .catch(() => {});
        }
    }, [sections]);

    // If repeatable sections are configured in Strapi
    if (sections && Array.isArray(sections) && sections.length > 0) {
        return (
            <div className="space-y-24 my-24">
                {sections.map((sec, secIdx) => {
                    const products = (sec.products && sec.products.length > 0)
                        ? sec.products
                        : storeProducts.slice(0, 4);

                    const colsClass = getGridColsClass(sec.columns || 4);

                    return (
                        <section key={sec.id || secIdx} className="px-6 max-w-7xl mx-auto">
                            <Title
                                title={sec.title || 'Featured Products'}
                                description={`Showing ${products.length} products`}
                                href="/shop"
                            />
                            <div className={`mt-10 grid ${colsClass} gap-6 w-full`}>
                                {products.map((product, pIdx) => (
                                    <ProductCard
                                        key={product.documentId || product.id || pIdx}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        );
    }

    // Fallback if productSections are not yet added
    return null;
};

export default DynamicProductSections;
