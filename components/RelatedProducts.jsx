'use client';

import React from 'react';
import ProductCard from './ProductCard';
import Title from './Title';

export default function RelatedProducts({ currentProduct, allProducts = [] }) {
  if (!currentProduct || !allProducts || allProducts.length <= 1) {
    return null;
  }

  const currentCategory =
    typeof currentProduct.category === 'object'
      ? currentProduct.category?.name
      : currentProduct.category;

  const currentId = currentProduct.documentId || currentProduct.id || currentProduct.slug;

  // Filter products by same category first (excluding current product)
  let related = allProducts.filter((p) => {
    const pId = p.documentId || p.id || p.slug;
    if (pId === currentId) return false;

    const pCat = typeof p.category === 'object' ? p.category?.name : p.category;
    return currentCategory && pCat && pCat.toLowerCase() === currentCategory.toLowerCase();
  });

  // If not enough related products from the same category, fill with other products
  if (related.length < 4) {
    const others = allProducts.filter((p) => {
      const pId = p.documentId || p.id || p.slug;
      return pId !== currentId && !related.some((r) => (r.documentId || r.id || r.slug) === pId);
    });
    related = [...related, ...others].slice(0, 5);
  } else {
    related = related.slice(0, 5);
  }

  if (related.length === 0) return null;

  return (
    <div className="my-16 sm:my-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Related <span className="text-emerald-600">Products</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customers who viewed this item also loved these chosen picks.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.documentId || prod.id || prod.slug} product={prod} />
        ))}
      </div>
    </div>
  );
}
