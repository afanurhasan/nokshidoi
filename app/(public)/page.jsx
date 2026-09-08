'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import DynamicProductSections from "@/components/DynamicProductSections";
import { useQuery } from "@apollo/client/react";
import { GET_LANDING_PAGE } from "@/lib/graphql/queries";

export default function Home() {
    const { data } = useQuery(GET_LANDING_PAGE, { errorPolicy: 'ignore' });
    const hasDynamicSections = data?.landingPage?.productSections?.length > 0;

    return (
        <div>
            <Hero />
            {hasDynamicSections ? (
                <DynamicProductSections />
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
