'use client';

import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { getProductImage } from "@/lib/media";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "@/lib/graphql/queries";
import { setProduct } from "@/lib/features/product/productSlice";

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    
    const { cartItems } = useSelector(state => state.cart);
    const reduxProducts = useSelector(state => state.product.list);
    const dispatch = useDispatch();

    // Query latest products from Strapi
    const { data: productsData } = useQuery(GET_PRODUCTS, { errorPolicy: 'ignore' });

    // Sync products to Redux store
    useEffect(() => {
        if (productsData?.products?.length > 0) {
            dispatch(setProduct(productsData.products));
        }
    }, [productsData, dispatch]);

    const allProducts = useMemo(() => {
        return productsData?.products?.length > 0 ? productsData.products : reduxProducts;
    }, [productsData, reduxProducts]);

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const newCartArray = [];
        let total = 0;

        for (const [key, value] of Object.entries(cartItems)) {
            if (value <= 0) continue;

            const matchedProduct = allProducts.find(p =>
                p.documentId === key ||
                String(p.id) === String(key) ||
                p.slug === key
            );

            if (matchedProduct) {
                newCartArray.push({
                    ...matchedProduct,
                    cartKey: key,
                    quantity: value,
                });
                total += (Number(matchedProduct.price) || 0) * value;
            } else {
                // If product hasn't finished loading yet or key is standalone
                newCartArray.push({
                    id: key,
                    documentId: key,
                    cartKey: key,
                    name: `Item (${key})`,
                    price: 29.0,
                    quantity: value,
                    category: 'General',
                });
                total += 29.0 * value;
            }
        }

        setCartArray(newCartArray);
        setTotalPrice(total);
    }, [cartItems, allProducts]);

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }));
    };

    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-6 text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

                <div className="flex items-start justify-between gap-5 max-lg:flex-col mt-8">
                    <table className="w-full max-w-4xl text-slate-600 table-auto">
                        <thead>
                            <tr className="max-sm:text-sm border-b border-slate-200 pb-3 text-slate-500">
                                <th className="text-left pb-3 font-semibold">Product</th>
                                <th className="pb-3 font-semibold text-center">Quantity</th>
                                <th className="pb-3 font-semibold text-center">Total Price</th>
                                <th className="max-md:hidden pb-3 font-semibold text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartArray.map((item, index) => {
                                const cartKey = item.cartKey || item.documentId || item.id;
                                const itemImg = getProductImage(item);
                                const categoryName = typeof item.category === 'object'
                                    ? item.category?.name
                                    : item.category || 'General';

                                return (
                                    <tr key={index} className="border-b border-slate-100">
                                        <td className="flex gap-4 my-4 items-center">
                                            <div className="flex items-center justify-center bg-slate-100 size-20 rounded-xl p-2 shrink-0 overflow-hidden">
                                                {typeof itemImg === 'string' ? (
                                                    <img src={itemImg} className="max-h-16 w-auto object-contain" alt={item.name || 'Product'} />
                                                ) : (
                                                    <Image src={itemImg} className="max-h-16 w-auto object-contain" alt="" width={60} height={60} />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 text-base line-clamp-1">{item.name}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{categoryName}</p>
                                                <p className="font-semibold text-slate-700 mt-1">{currency}{item.price}</p>
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <Counter productId={cartKey} />
                                        </td>
                                        <td className="text-center font-semibold text-slate-800">
                                            {currency}{(Number(item.price) * item.quantity).toLocaleString()}
                                        </td>
                                        <td className="text-center max-md:hidden">
                                            <button
                                                onClick={() => handleDeleteItemFromCart(cartKey)}
                                                className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all cursor-pointer"
                                                title="Remove item"
                                            >
                                                <Trash2Icon size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-slate-400 gap-4">
            <h1 className="text-2xl sm:text-4xl font-semibold text-slate-600">Your cart is empty</h1>
            <p className="text-sm">Browse our shop and add products to your cart!</p>
        </div>
    );
}