'use client';

import { Suspense } from "react";
import Loading from "@/components/Loading";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function LoadingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const nextUrl = searchParams.get('nextUrl');

    useEffect(() => {
        if (nextUrl) {
            const timer = setTimeout(() => {
                router.push(nextUrl);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [router, nextUrl]);

    return <Loading />;
}

export default function LoadingPage() {
    return (
        <Suspense fallback={<Loading />}>
            <LoadingContent />
        </Suspense>
    );
}
