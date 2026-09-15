import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlugOrId, PRODUCTS } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';
import { BUSINESS_CONFIG } from '@/config/business';

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    productId: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  const product = getProductBySlugOrId(productId);

  if (!product) {
    return {
      title: `পণ্যটি পাওয়া যায়নি | ${BUSINESS_CONFIG.name}`,
    };
  }

  return {
    title: `${product.name} | ${BUSINESS_CONFIG.name}`,
    description: `${product.shortDescription} মূল্য: ${BUSINESS_CONFIG.currency}${product.price}। সাইজ: ${product.size}।`,
    openGraph: {
      title: `${product.name} | ${BUSINESS_CONFIG.name}`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  const product = getProductBySlugOrId(productId);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}