import { NextResponse } from 'next/server';
import { getStrapiUrl } from '@/lib/strapi';

export async function POST(request) {
  try {
    const { code, items = [], subtotal = 0 } = await request.json();

    if (!code || typeof code !== 'string' || !code.trim()) {
      return NextResponse.json({ error: 'Please provide a coupon code.' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const strapiBase = getStrapiUrl();

    let matchedCoupon = null;

    // 1. Try querying Strapi REST API with products populated
    try {
      const res = await fetch(`${strapiBase}/api/coupons?filters[code][$eqi]=${encodeURIComponent(cleanCode)}&populate=*`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          const raw = json.data[0];
          matchedCoupon = {
            id: raw.id,
            documentId: raw.documentId,
            code: raw.code || raw.attributes?.code || cleanCode,
            discount: Number(raw.discount ?? raw.attributes?.discount ?? 10),
            discountType: raw.discountType || raw.attributes?.discountType || 'percentage',
            expiresAt: raw.expiresAt || raw.attributes?.expiresAt || null,
            isActive: raw.isActive ?? raw.attributes?.isActive ?? true,
            minOrderAmount: Number(raw.minOrderAmount ?? raw.attributes?.minOrderAmount ?? 0),
            products: raw.products || raw.attributes?.products?.data || [],
            description: raw.description || raw.attributes?.description || '',
          };
        }
      }
    } catch (err) {
      console.warn('Strapi coupon fetch warning:', err.message);
    }

    // 2. Fallback built-in coupons if not yet seeded in Strapi
    if (!matchedCoupon) {
      const builtInCoupons = {
        'MUSTBUY10': { code: 'MUSTBUY10', discount: 10, discountType: 'percentage', description: '10% Off on all products' },
        'SAVE20': { code: 'SAVE20', discount: 20, discountType: 'percentage', description: '20% Off on all products' },
        'NEW20': { code: 'NEW20', discount: 20, discountType: 'percentage', description: '20% Off welcome discount' },
        'OFF100': { code: 'OFF100', discount: 100, discountType: 'fixed', description: 'Flat ৳100 Off' },
      };

      if (builtInCoupons[cleanCode]) {
        matchedCoupon = {
          ...builtInCoupons[cleanCode],
          isActive: true,
          minOrderAmount: 0,
          products: [],
        };
      }
    }

    if (!matchedCoupon) {
      return NextResponse.json(
        { error: `Coupon code "${cleanCode}" is invalid.` },
        { status: 404 }
      );
    }

    // 3. Check active status
    if (matchedCoupon.isActive === false) {
      return NextResponse.json(
        { error: 'This coupon is currently inactive.' },
        { status: 400 }
      );
    }

    // 4. Check expiry date
    if (matchedCoupon.expiresAt) {
      const expiryDate = new Date(matchedCoupon.expiresAt);
      if (!isNaN(expiryDate.getTime()) && expiryDate < new Date()) {
        return NextResponse.json(
          { error: `This coupon expired on ${expiryDate.toLocaleDateString()}.` },
          { status: 400 }
        );
      }
    }

    // 5. Check minimum order amount
    if (matchedCoupon.minOrderAmount > 0 && subtotal < matchedCoupon.minOrderAmount) {
      return NextResponse.json(
        { error: `Minimum order total of ৳${matchedCoupon.minOrderAmount} required to use this coupon.` },
        { status: 400 }
      );
    }

    // 6. Check product restriction:
    // If specific products are selected in relation, apply ONLY to those products.
    // If no products selected (empty), coupon is universal and applies to ALL products!
    const restrictedProducts = Array.isArray(matchedCoupon.products) ? matchedCoupon.products : [];
    let eligibleSubtotal = 0;

    if (restrictedProducts.length > 0) {
      const allowedIds = new Set(
        restrictedProducts.map(p => String(p.documentId || p.id || p.slug || '').toLowerCase())
      );

      const matchingCartItems = items.filter(item => {
        const itemId = String(item.documentId || item.id || item.productId || item.slug || '').toLowerCase();
        return allowedIds.has(itemId);
      });

      if (matchingCartItems.length === 0) {
        return NextResponse.json(
          { error: 'This coupon is only valid for specific selected products not present in your cart.' },
          { status: 400 }
        );
      }

      eligibleSubtotal = matchingCartItems.reduce((acc, item) => {
        const p = Number(item.price) || 0;
        const q = Number(item.quantity) || 1;
        return acc + (p * q);
      }, 0);
    } else {
      // Universal: applies to entire cart subtotal
      eligibleSubtotal = Number(subtotal) || 0;
    }

    // 7. Calculate discount amount
    let discountAmount = 0;
    if (matchedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((eligibleSubtotal * matchedCoupon.discount) / 100);
    } else {
      discountAmount = Math.min(eligibleSubtotal, matchedCoupon.discount);
    }

    discountAmount = Math.max(0, discountAmount);

    return NextResponse.json({
      success: true,
      code: matchedCoupon.code,
      discount: matchedCoupon.discount,
      discountType: matchedCoupon.discountType,
      discountAmount,
      description: matchedCoupon.description,
      isUniversal: restrictedProducts.length === 0,
      eligibleItemCount: restrictedProducts.length > 0 ? restrictedProducts.length : items.length,
    });
  } catch (error) {
    console.error('Coupon validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate coupon. Please try again.' },
      { status: 500 }
    );
  }
}
