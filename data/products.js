/**
 * নকশি দই ভান্ডার - পণ্য ডাটাবেজ
 * ক্লায়েন্টের স্পেসিফিকেশন অনুযায়ী প্রতিটি পণ্যের কাঠামো:
 * - নাম (Name)
 * - গ্রেড (Grade)
 * - নিট ওজন (Net Weight)
 * - মাটিসহ ওজন (Gross Weight)
 * - পাইকারি মূল্য (Wholesale Price)
 * - খুচরা মূল্য (Retail Price)
 * - কার্টুন (Carton)
 * - Minimum Order (ন্যূনতম অর্ডার)
 */

export const PRODUCTS = [
  // ==========================================
  // ১. দই (DOI)
  // ==========================================
  {
    id: "nd-cup-doi-a",
    slug: "cup-doi-a-grade",
    name: "কাপ দই",
    grade: "A Grade • Premium Quality",
    netWeight: "৯০ গ্রাম+",
    grossWeight: "২০০ গ্রাম+",
    wholesalePrice: "৳২৭/পিস",
    retailPrice: "৳৫০/পিস",
    wholesalePriceNum: 27,
    retailPriceNum: 50,
    price: 27,
    size: "৯০ গ্রাম+ (মাটিসহ ২০০ গ্রাম+)",
    carton: "২৫২ পিস",
    minOrder: "১০৮ পিস",
    category: "doi",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-cup-doi-b",
    slug: "cup-doi-b-grade",
    name: "কাপ দই",
    grade: "B Grade • Standard Quality",
    netWeight: "৮০ গ্রাম+",
    grossWeight: "২০০ গ্রাম+",
    wholesalePrice: "৳২৪/পিস",
    retailPrice: "৳৪০/পিস",
    wholesalePriceNum: 24,
    retailPriceNum: 40,
    price: 24,
    size: "৮০ গ্রাম+ (মাটিসহ ২০০ গ্রাম+)",
    carton: "২৫২ পিস",
    minOrder: "১০৮ পিস",
    category: "doi",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-doi-1kg-a",
    slug: "bogra-sweet-doi-1kg-a-grade",
    name: "বগুড়ার স্পেশাল মিষ্টি হাঁড়ি দই (১ কেজি)",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি+",
    grossWeight: "১.৪ কেজি+",
    wholesalePrice: "৳২৮০/হাঁড়ি",
    retailPrice: "৳৩৫০/হাঁড়ি",
    wholesalePriceNum: 280,
    retailPriceNum: 350,
    price: 280,
    size: "১ কেজি+ (মাটিসহ ১.৪ কেজি+)",
    carton: "১২ হাঁড়ি",
    minOrder: "৬ হাঁড়ি",
    category: "doi",
    image: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-doi-1kg-b",
    slug: "bogra-sweet-doi-1kg-b-grade",
    name: "বগুড়ার মিষ্টি হাঁড়ি দই (১ কেজি)",
    grade: "B Grade • Medium Quality",
    netWeight: "১ কেজি+",
    grossWeight: "১.৪ কেজি+",
    wholesalePrice: "৳২৫০/হাঁড়ি",
    retailPrice: "৳৩১০/হাঁড়ি",
    wholesalePriceNum: 250,
    retailPriceNum: 310,
    price: 250,
    size: "১ কেজি+ (মাটিসহ ১.৪ কেজি+)",
    carton: "১২ হাঁড়ি",
    minOrder: "৬ হাঁড়ি",
    category: "doi",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    bestseller: false,
    featured: false,
  },
  {
    id: "nd-doi-2kg-family",
    slug: "heritage-sweet-doi-2kg-family-matka",
    name: "বগুড়ার মিষ্টি দই ফ্যামিলি মেগা হাঁড়ি (২ কেজি)",
    grade: "A Grade • Premium Quality",
    netWeight: "২ কেজি+",
    grossWeight: "২.৭ কেজি+",
    wholesalePrice: "৳৫৫০/হাঁড়ি",
    retailPrice: "৳৬৮০/হাঁড়ি",
    wholesalePriceNum: 550,
    retailPriceNum: 680,
    price: 550,
    size: "২ কেজি+ (মাটিসহ ২.৭ কেজি+)",
    carton: "৬ হাঁড়ি",
    minOrder: "৪ হাঁড়ি",
    category: "doi",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80",
    bestseller: false,
    featured: true,
  },
  {
    id: "nd-doi-tok-1kg",
    slug: "bogra-pure-sour-doi-1kg",
    name: "বগুড়ার খাঁটি টক দই (১ কেজি)",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি+",
    grossWeight: "১.৪ কেজি+",
    wholesalePrice: "৳২২০/হাঁড়ি",
    retailPrice: "৳২৮০/হাঁড়ি",
    wholesalePriceNum: 220,
    retailPriceNum: 280,
    price: 220,
    size: "১ কেজি+ (মাটিসহ ১.৪ কেজি+)",
    carton: "১২ হাঁড়ি",
    minOrder: "৬ হাঁড়ি",
    category: "doi",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },

  // ==========================================
  // ২. রসমালাই (RASMALAI)
  // ==========================================
  {
    id: "nd-rasmalai-a",
    slug: "bogra-shahi-rasmalai-a-grade",
    name: "বগুড়ার স্পেশাল শাহী রসমালাই",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি বক্স",
    grossWeight: "১.১ কেজি",
    wholesalePrice: "৳৪৫০/কেজি",
    retailPrice: "৳৫৫০/কেজি",
    wholesalePriceNum: 450,
    retailPriceNum: 550,
    price: 450,
    size: "১ কেজি বক্স",
    carton: "২০ বক্স",
    minOrder: "১০ বক্স",
    category: "rasmalai",
    image: "https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-rasmalai-b",
    slug: "bogra-rasmalai-b-grade",
    name: "বগুড়ার রসমালাই",
    grade: "B Grade • Medium Quality",
    netWeight: "১ কেজি বক্স",
    grossWeight: "১.১ কেজি",
    wholesalePrice: "৳৩৮০/কেজি",
    retailPrice: "৳৪৮০/কেজি",
    wholesalePriceNum: 380,
    retailPriceNum: 480,
    price: 380,
    size: "১ কেজি বক্স",
    carton: "২০ বক্স",
    minOrder: "১০ বক্স",
    category: "rasmalai",
    image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=800&q=80",
    bestseller: false,
    featured: false,
  },

  // ==========================================
  // ৩. বিভিন্ন ধরনের মিষ্টি (MISHTI)
  // ==========================================
  {
    id: "nd-chomchom-a",
    slug: "bogra-special-porabari-chomchom",
    name: "বগুড়ার স্পেশাল চমচম",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি বক্স",
    grossWeight: "১.১ কেজি",
    wholesalePrice: "৳৩৮০/কেজি",
    retailPrice: "৳৪৮০/কেজি",
    wholesalePriceNum: 380,
    retailPriceNum: 480,
    price: 380,
    size: "১ কেজি বক্স",
    carton: "২০ বক্স",
    minOrder: "১০ কেজি",
    category: "mishti",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-kalojam-a",
    slug: "bogra-shahi-kalojam",
    name: "বগুড়ার স্পেশাল শাহী কালোজাম",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি বক্স",
    grossWeight: "১.১ কেজি",
    wholesalePrice: "৳৩৬০/কেজি",
    retailPrice: "৳৪৬০/কেজি",
    wholesalePriceNum: 360,
    retailPriceNum: 460,
    price: 360,
    size: "১ কেজি বক্স",
    carton: "২০ বক্স",
    minOrder: "১০ কেজি",
    category: "mishti",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-rosogolla-a",
    slug: "bogra-pure-chhana-rosogolla",
    name: "খাঁটি ছানার স্পঞ্জ রসগোল্লা",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি বক্স",
    grossWeight: "১.১ কেজি",
    wholesalePrice: "৳৩৪০/কেজি",
    retailPrice: "৳৪৪০/কেজি",
    wholesalePriceNum: 340,
    retailPriceNum: 440,
    price: 340,
    size: "১ কেজি বক্স",
    carton: "২০ বক্স",
    minOrder: "১০ কেজি",
    category: "mishti",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    bestseller: false,
    featured: false,
  },

  // ==========================================
  // ৪. মাঠা ও ঘোল (MATHA & GHOL)
  // ==========================================
  {
    id: "nd-matha-bottle-1l",
    slug: "bogra-special-khamari-matha-1l",
    name: "বগুড়ার স্পেশাল খামারি মাঠা (১ লিটার)",
    grade: "A Grade • Premium Quality",
    netWeight: "১ লিটার বোতল",
    grossWeight: "১.০৫ কেজি",
    wholesalePrice: "৳১০০/বোতল",
    retailPrice: "৳১৩০/বোতল",
    wholesalePriceNum: 100,
    retailPriceNum: 130,
    price: 100,
    size: "১ লিটার পেট বোতল",
    carton: "২৪ বোতল",
    minOrder: "১২ বোতল",
    category: "matha",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
  {
    id: "nd-ghol-bottle-1l",
    slug: "bogra-traditional-ghol-1l",
    name: "ঐতিহ্যবাহী খাঁটি ঘোল (১ লিটার)",
    grade: "A Grade • Premium Quality",
    netWeight: "১ লিটার বোতল",
    grossWeight: "১.০৫ কেজি",
    wholesalePrice: "৳৯০/বোতল",
    retailPrice: "৳১২০/বোতল",
    wholesalePriceNum: 90,
    retailPriceNum: 120,
    price: 90,
    size: "১ লিটার পেট বোতল",
    carton: "২৪ বোতল",
    minOrder: "১২ বোতল",
    category: "matha",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    bestseller: false,
    featured: false,
  },

  // ==========================================
  // ৫. খাঁটি গাওয়া ঘি (PURE GHEE)
  // ==========================================
  {
    id: "nd-ghee-1kg",
    slug: "bogra-pure-gawa-ghee-1kg",
    name: "বগুড়ার খাঁটি গাওয়া ঘি (১ কেজি)",
    grade: "A Grade • Premium Quality",
    netWeight: "১ কেজি জার",
    grossWeight: "১.২ কেজি",
    wholesalePrice: "৳১৪০০/কেজি",
    retailPrice: "৳১৭০০/কেজি",
    wholesalePriceNum: 1400,
    retailPriceNum: 1700,
    price: 1400,
    size: "১ কেজি জার",
    carton: "১২ জার",
    minOrder: "৫ কেজি",
    category: "mishti",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    bestseller: true,
    featured: true,
  },
];

/**
 * স্লাগ বা আইডি দিয়ে পণ্য খুঁজে বের করা
 */
export function getProductBySlugOrId(identifier) {
  if (!identifier) return null;
  const cleanId = decodeURIComponent(String(identifier)).trim().toLowerCase();
  return (
    PRODUCTS.find(
      (p) => p.slug.toLowerCase() === cleanId || p.id.toLowerCase() === cleanId
    ) || null
  );
}

/**
 * ফিল্টারিং হেল্পার
 */
export function getFilteredProducts({ category = "all", search = "" } = {}) {
  return PRODUCTS.filter((p) => {
    if (category && category !== "all" && p.category !== category) {
      return false;
    }
    if (search && search.trim() !== "") {
      const term = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(term);
      const matchGrade = (p.grade || "").toLowerCase().includes(term);
      const matchNet = (p.netWeight || "").toLowerCase().includes(term);
      if (!matchName && !matchGrade && !matchNet) return false;
    }
    return true;
  });
}
