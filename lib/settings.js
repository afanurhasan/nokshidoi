import fs from 'fs/promises';
import path from 'path';

export const DEFAULT_SETTINGS = {
  store: {
    name: 'MustBuy',
    tagline: 'Your Trusted Online Shopping Destination in Bangladesh',
    phone: '+880 1700-000000',
    email: 'support@mustbuy.com.bd',
    address: 'Dhaka, Bangladesh',
    currency: '৳',
  },
  sections: [
    { id: 'hero', name: 'Hero & Promo Banners', enabled: true, order: 1 },
    { id: 'categories', name: 'Categories Marquee', enabled: true, order: 2 },
    { id: 'featured', name: 'Best Selling Products', enabled: true, order: 3 },
    { id: 'latest', name: 'Latest Arrivals', enabled: true, order: 4 },
    { id: 'specs', name: 'Trust Badges & Specifications', enabled: true, order: 5 },
    { id: 'newsletter', name: 'Newsletter Subscription', enabled: true, order: 6 },
  ],
  hero: {
    badge: '🔥 Fast Delivery Across Bangladesh',
    title: "Gadgets & lifestyle products you'll love at trusted prices.",
    price: '299',
    buttonText: 'SHOP NOW',
    buttonLink: '/shop',
    bgColor: '#dcfce7',
    imageUrl: '',
  },
  banner1: {
    title: 'Top Gadgets',
    subtitle: 'Shop Now',
    bgColor: '#fed7aa',
    imageUrl: '',
    link: '/shop',
  },
  banner2: {
    title: 'Up to 30% Off',
    subtitle: 'Limited Deals',
    bgColor: '#bfdbfe',
    imageUrl: '',
    link: '/shop',
  },
  trustBadges: [
    {
      id: 'tb_1',
      icon: 'Truck', // Truck | CreditCard | ShieldCheck | Users | Clock | Headphones
      title: 'Fast Delivery Across Bangladesh',
      description: 'Inside Dhaka 24-48 hrs, Outside Dhaka 2-4 days. Doorstep delivery.',
      accent: '#05DF72',
      enabled: true,
    },
    {
      id: 'tb_2',
      icon: 'CreditCard',
      title: '100% Secured Payment & COD',
      description: 'Pay securely via bKash, Nagad, Cards or Cash on Delivery.',
      accent: '#FF8904',
      enabled: true,
    },
    {
      id: 'tb_3',
      icon: 'Users',
      title: 'Trusted by 10,000+ Happy Customers',
      description: 'Dedicated customer care and 100% genuine products.',
      accent: '#A684FF',
      enabled: true,
    },
  ],
  shipping: {
    insideDhakaRate: 60,
    outsideDhakaRate: 120,
    freeShippingThreshold: 2000,
    codAvailable: true,
    deliveryTimeDhaka: '24-48 Hours',
    deliveryTimeOutsideDhaka: '2-4 Days',
    shippingPolicyNote: 'We deliver all over Bangladesh with safe handling and Cash on Delivery.',
  },
};

const SETTINGS_FILE_PATH = path.join(process.cwd(), 'data', 'settings.json');

export async function getSettings() {
  try {
    const data = await fs.readFile(SETTINGS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      store: { ...DEFAULT_SETTINGS.store, ...(parsed.store || {}) },
      hero: { ...DEFAULT_SETTINGS.hero, ...(parsed.hero || {}) },
      banner1: { ...DEFAULT_SETTINGS.banner1, ...(parsed.banner1 || {}) },
      banner2: { ...DEFAULT_SETTINGS.banner2, ...(parsed.banner2 || {}) },
      shipping: { ...DEFAULT_SETTINGS.shipping, ...(parsed.shipping || {}) },
      trustBadges: parsed.trustBadges?.length ? parsed.trustBadges : DEFAULT_SETTINGS.trustBadges,
      sections: parsed.sections?.length ? parsed.sections : DEFAULT_SETTINGS.sections,
    };
  } catch (err) {
    // If file doesn't exist yet, write default and return
    try {
      await fs.mkdir(path.dirname(SETTINGS_FILE_PATH), { recursive: true });
      await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(DEFAULT_SETTINGS, null, 2), 'utf-8');
    } catch (writeErr) {
      console.warn('Could not write default settings file:', writeErr.message);
    }
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(newSettings) {
  const current = await getSettings();
  const merged = {
    ...current,
    ...newSettings,
    store: { ...current.store, ...(newSettings.store || {}) },
    hero: { ...current.hero, ...(newSettings.hero || {}) },
    banner1: { ...current.banner1, ...(newSettings.banner1 || {}) },
    banner2: { ...current.banner2, ...(newSettings.banner2 || {}) },
    shipping: { ...current.shipping, ...(newSettings.shipping || {}) },
    trustBadges: newSettings.trustBadges || current.trustBadges,
    sections: newSettings.sections || current.sections,
    updatedAt: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(SETTINGS_FILE_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_FILE_PATH, JSON.stringify(merged, null, 2), 'utf-8');
  return merged;
}
