'use client';

import { addToCart } from "@/lib/features/cart/cartSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { getProductImages } from "@/lib/media";

const ProductDetails = ({ product }) => {
    const productId = product.documentId || product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const router = useRouter();

    const imagesList = getProductImages(product);
    const [mainImage, setMainImage] = useState(imagesList[0]);

    useEffect(() => {
        const imgs = getProductImages(product);
        if (imgs.length > 0) {
            setMainImage(imgs[0]);
        }
    }, [product]);

    const addToCartHandler = () => {
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

    return (
        <div className="flex max-lg:flex-col gap-12">
            <div className="flex max-sm:flex-col-reverse gap-3">
                {/* Thumbnails Gallery */}
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-113">
                    {imagesList.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 flex items-center justify-center size-20 sm:size-24 rounded-lg group cursor-pointer border-2 transition ${
                                mainImage === image ? 'border-green-500' : 'border-transparent'
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
                <div className="flex justify-center items-center h-80 sm:size-113 bg-slate-100 rounded-2xl p-6 overflow-hidden">
                    {mainImage ? (
                        typeof mainImage === 'string' ? (
                            <img src={mainImage} alt={product.name || 'Product'} className="max-h-72 sm:max-h-96 w-auto object-contain" />
                        ) : (
                            <Image src={mainImage} alt="" width={250} height={250} className="object-contain" />
                        )
                    ) : (
                        <div className="text-slate-400">No image available</div>
                    )}
                </div>
            </div>

            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-slate-800">{product.name}</h1>

                {/* Star rating */}
                <div className='flex items-center mt-2'>
                    {Array(5).fill('').map((_, index) => (
                        <StarIcon
                            key={index}
                            size={16}
                            className='text-transparent mt-0.5'
                            fill={roundedRating >= index + 1 ? "#00C950" : "#D1D5DB"}
                        />
                    ))}
                    <p className="text-sm ml-3 font-medium text-slate-600">
                        {ratingNumber.toFixed(1)} <span className="text-slate-400 font-normal">/ 5.0 Rating</span>
                    </p>
                </div>

                {/* Price and MRP */}
                <div className="flex items-start my-6 gap-3 text-2xl font-semibold text-slate-800">
                    <p>{currency}{product.price}</p>
                    {product.mrp && <p className="text-xl text-slate-400 line-through font-normal">{currency}{product.mrp}</p>}
                </div>

                {hasDiscount && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                        <TagIcon size={16} />
                        <p>Save {discountPercent}% right now</p>
                    </div>
                )}

                {/* Add to Cart & Counter */}
                <div className="flex items-end gap-5 mt-10">
                    {cart[productId] && (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-slate-600 font-medium">Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}
                    <button
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')}
                        className="bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded-lg hover:bg-slate-900 active:scale-95 transition cursor-pointer shadow-sm"
                    >
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>

                <hr className="border-gray-200 my-8" />

                <div className="flex flex-col gap-4 text-slate-500 text-sm">
                    <p className="flex items-center gap-3"> <EarthIcon size={18} className="text-slate-400" /> Free shipping worldwide </p>
                    <p className="flex items-center gap-3"> <CreditCardIcon size={18} className="text-slate-400" /> 100% Secured Payment </p>
                    <p className="flex items-center gap-3"> <UserIcon size={18} className="text-slate-400" /> Trusted by 10,000+ happy customers </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;