/**
 * Media helper for Nokshi Doi
 * Supports Cloudinary and optimized CDN remote images with graceful fallbacks.
 */

const DEFAULT_YOGURT_IMAGE = "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80";

export function getProductImage(product) {
  if (!product) return DEFAULT_YOGURT_IMAGE;

  // If product.image is defined and non-empty
  if (product.image && typeof product.image === "string" && product.image.trim() !== "") {
    return product.image;
  }

  // Fallback
  return DEFAULT_YOGURT_IMAGE;
}

export function getProductImages(product) {
  if (!product) return [DEFAULT_YOGURT_IMAGE];
  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images.filter(Boolean);
  }
  return [getProductImage(product)];
}
