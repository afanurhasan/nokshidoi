'use client';

import { addToCart } from "@/lib/features/cart/cartSlice";
import {
    StarIcon,
    TagIcon,
    Truck,
    CreditCard,
    ShieldCheck,
    Users,
    Clock,
    Headphones,
    CheckCircle2,
    XCircle,
    Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { getProductImages } from "@/lib/media";

const ICON_MAP = {
    Truck,
    CreditCard,
    ShieldCheck,
    Users,
    Clock,
    Headphones,
};

const DEFAULT_BADGES = [
    {
        id: 'tb_1',
        icon: 'Truck',
        title: 'Fast Delivery Across Bangladesh (Inside Dhaka 24-48h, Outside 2-4 Days)',
    },
    {
        id: 'tb_2',
        icon: 'CreditCard',
        title: '100% Secured Payment & Cash on Delivery (COD) Available',
    },
    {
        id: 'tb_3',
        icon: 'ShieldCheck',
        title: 'Trusted by 10,000+ Happy Customers with Genuine Guarantee',
    },
];

const ProductDetails = ({ product }) => {
    const productId = product.documentId || product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳';

    const cart = useSelector(state => state.cart.cartItems);
    const reduxProducts = useSelector(state => state.product.list);
    const dispatch = useDispatch();
    const router = useRouter();

    // Get live stock from Redux if available
    const liveProduct = reduxProducts.find(p => p.id === productId || p.documentId === productId);
    const stockCount = liveProduct?.stock != null ? liveProduct.stock : (product.stock != null ? product.stock : 25);
    const isInStock = product.inStock !== false && stockCount > 0;

    const imagesList = getProductImages(product);
    const [mainImage, setMainImage] = useState(imagesList[0]);

    useEffect(() => {
        const imgs = getProductImages(product);
        if (imgs.length > 0) {
            setMainImage(imgs[0]);
        }
    }, [product]);

    const addToCartHandler = () => {
        if (!isInStock) return;
        dispatch(addToCart({ productId }));
    };

    let ratingNumber = 5;
    if (typeof product.rating === 'number') {
        ratingNumber = product.rating;
    } else if (Array.isArray(product.rating) && product.rating.length > 0) {
        ratingNumber = product.rating.reduce((acc, item) => acc + (item.rating || 0), 0) / product.rating.length;
    }

    const roundedRating = Math.round(ratingNumber);
    const hasDiscount = product.mrp && product.mrp > product.price;
    const discountPercent = hasDiscount ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

    const activeBadges = DEFAULT_BADGES;

    return (
        <div className="flex max-lg:flex-col gap-8 lg:gap-12 my-6">
            <div className="flex max-sm:flex-col-reverse gap-3">
                {/* Thumbnails Gallery */}
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-113 scrollbar-none">
                    {imagesList.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 flex items-center justify-center size-20 sm:size-24 rounded-xl group cursor-pointer border-2 transition ${
                                mainImage === image ? 'border-emerald-500 shadow-xs' : 'border-transparent hover:border-slate-300'
                            }`}
                        >
                            {typeof image === 'string' ? (
                                <img src={image} className="size-16 object-contain group-hover:scale-105 transition" alt="" />
                            ) : (
                                <Image src={image} className="group-hover:scale-105 transition" alt="" width={45} height={45} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Image */}
                <div className="flex justify-center items-center h-80 sm:size-113 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 overflow-hidden shadow-xs">
                    {mainImage ? (
                        typeof mainImage === 'string' ? (
                            <img src={mainImage} alt={product.name || 'Product'} className="max-h-72 sm:max-h-96 w-auto object-contain transition duration-300" />
                        ) : (
                            <Image src={mainImage} alt="" width={250} height={250} className="object-contain" />
                        )
                    ) : (
                        <div className="text-slate-400">No image available</div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{product.name}</h1>

                {/* Star rating & Stock Status */}
                <div className='flex flex-wrap items-center gap-4 mt-3'>
                    <div className='flex items-center'>
                        {Array(5).fill('').map((_, index) => (
                            <StarIcon
                                key={index}
                                size={16}
                                className='text-transparent'
                                fill={roundedRating >= index + 1 ? "#FF8904" : "#D1D5DB"}
                            />
                        ))}
                        <p className="text-xs sm:text-sm ml-2 font-medium text-slate-600">
                            {ratingNumber.toFixed(1)} <span className="text-slate-400 font-normal">/ 5.0 Rating</span>
                        </p>
                    </div>

                    {/* Stock Status Badge */}
                    <div className="flex items-center">
                        {isInStock ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                In Stock ({stockCount} available)
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
                                <XCircle size={13} className="text-rose-600" />
                                Out of Stock
                            </span>
                        )}
                    </div>
                </div>

                {/* Price and MRP */}
                <div className="flex items-baseline my-5 gap-3 text-2xl sm:text-3xl font-bold text-slate-900">
                    <p>{currency} {product.price}</p>
                    {product.mrp && <p className="text-lg sm:text-xl text-slate-400 line-through font-normal">{currency} {product.mrp}</p>}
                </div>

                {hasDiscount && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-6">
                        <TagIcon size={14} />
                        <p>Special Offer: Save {discountPercent}% right now</p>
                    </div>
                )}

                {/* Add to Cart & Counter */}
                <div className="flex items-end gap-4 mt-6">
                    {cart[productId] && isInStock && (
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs text-slate-600 font-semibold">Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}
                    <button
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')}
                        disabled={!isInStock}
                        className={`px-8 sm:px-10 py-3.5 text-xs sm:text-sm font-semibold rounded-xl transition cursor-pointer shadow-sm ${
                            !isInStock
                                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-black active:scale-95'
                        }`}
                    >
                        {!isInStock ? 'Out of Stock' : !cart[productId] ? 'Add to Cart' : 'View in Cart'}
                    </button>
                </div>

                <hr className="border-gray-200 my-7" />

                {/* Trust Badges & Bangladesh Shipping Details */}
                <div className="flex flex-col gap-3 text-slate-700 text-xs sm:text-sm bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
                    {activeBadges.map((badge, idx) => {
                        const IconComp = ICON_MAP[badge.icon] || ShieldCheck;
                        return (
                            <div key={badge.id || idx} className="flex items-center gap-3">
                                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-600 shadow-2xs shrink-0">
                                    <IconComp size={16} />
                                </div>
                                <p className="font-medium text-slate-800">
                                    {badge.title}
                                    {badge.description && <span className="block text-[11px] text-slate-500 font-normal mt-0.5">{badge.description}</span>}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;