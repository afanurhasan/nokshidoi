'use client';

import React, { useEffect, useState } from "react";
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import DynamicProductSections from "@/components/DynamicProductSections";
import { useQuery } from "@apollo/client/react";
import { GET_LANDING_PAGE } from "@/lib/graphql/queries";
import { getStrapiUrl } from "@/lib/strapi";

export default function Home() {
    const { data } = useQuery(GET_LANDING_PAGE, { 
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'ignore' 
    });

    const [restSections, setRestSections] = useState(null);

    // Direct Strapi REST fallback to guarantee live updates even if Apollo cache hasn't invalidated
    useEffect(() => {
        const strapiUrl = getStrapiUrl();
        fetch(`${strapiUrl}/api/landing-page?populate[productSections][populate][products][populate]=*`)
            .then(res => res.json())
            .then(json => {
                const sec = json?.data?.productSections;
                if (Array.isArray(sec) && sec.length > 0) {
                    setRestSections(sec);
                }
            })
            .catch(() => {});
    }, []);

    const dynamicSections = (data?.landingPage?.productSections && data.landingPage.productSections.length > 0)
        ? data.landingPage.productSections
        : restSections;

    const hasDynamicSections = Boolean(dynamicSections && dynamicSections.length > 0);

    return (
        <div>
            <Hero />
            {hasDynamicSections ? (
                <DynamicProductSections sections={dynamicSections} />
            ) : (
                <>
                    <LatestProducts />
                    <BestSelling />
                </>
            )}
            <OurSpecs />
            <Newsletter />
        </div>
    );
}
