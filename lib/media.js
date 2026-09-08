import { assets } from '@/assets/assets';

export function getStrapiMedia(media) {
  if (!media) return null;
  const url = typeof media === 'string' ? media : (media?.url || media?.data?.attributes?.url);
  if (!url || typeof url !== 'string' || url.trim() === '') return null;

  // If already absolute URL (e.g. Cloudinary or http://...)
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Base Strapi URL (e.g. http://localhost:1337)
  const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337').replace(/\/$/, '');

  // If path starts with /uploads or uploads or /upload or upload
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${strapiUrl}${cleanPath}`;
}

const fallbackImages = [
  assets.product_img1,
  assets.product_img2,
  assets.product_img3,
  assets.product_img4,
  assets.product_img5,
  assets.product_img6,
  assets.product_img7,
  assets.product_img8,
];

export function getProductImage(product, index = 0) {
  if (!product) return assets.product_img1;

  // Check if product has Strapi media in images array
  const rawImage = product.images?.[index] || product.images?.[0];
  const strapiUrl = getStrapiMedia(rawImage);
  if (strapiUrl) return strapiUrl;

  // If rawImage is already a valid non-empty string URL or static import object
  if (rawImage && typeof rawImage === 'string' && rawImage.trim() !== '') {
    return rawImage;
  }
  if (rawImage && typeof rawImage === 'object' && rawImage.src) {
    return rawImage;
  }

  // Fallback by slug/name/id hash
  const key = product.slug || product.name || product.documentId || String(product.id || '');
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash + key.charCodeAt(i)) % fallbackImages.length;
  }
  return fallbackImages[hash] || assets.product_img1;
}

export function getProductImages(product) {
  if (!product) return [assets.product_img1];
  if (product.images && product.images.length > 0) {
    const list = product.images
      .map(img => getStrapiMedia(img) || (img?.src ? img : typeof img === 'string' && img.trim() !== '' ? img : null))
      .filter(Boolean);
    if (list.length > 0) return list;
  }
  return [getProductImage(product)];
}
