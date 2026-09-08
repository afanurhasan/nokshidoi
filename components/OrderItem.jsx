'use client';

import Image from "next/image";
import { DotIcon, Mail, Phone, MapPin, User } from "lucide-react";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";
import InvoiceModal from "./InvoiceModal";
import { getProductImage } from "@/lib/media";

const OrderItem = ({ order }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const [showInvoice, setShowInvoice] = useState(false);

    const { ratings } = useSelector(state => state.rating);

    const rawItems = order.orderItems || order.items || [];
    const items = Array.isArray(rawItems) ? rawItems : [];

    const status = order.orderStatus || order.status || 'pending';
    const address = order.address || {};
    const customerName = order.customerName || address.name || 'Customer';
    const customerEmail = order.customerEmail || address.email || '';
    const customerPhone = order.customerPhone || address.phone || '';

    return (
        <>
            <tr className="text-sm">
                {/* Products Column */}
                <td className="text-left">
                    <div className="flex flex-col gap-6">
                        {items.map((item, index) => {
                            const productObj = item.product || item;
                            const imgSrc = getProductImage(productObj);
                            const productName = productObj.name || item.name || 'Product';
                            const productId = productObj.id || productObj.documentId || item.id;

                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-20 aspect-square bg-slate-100 flex items-center justify-center rounded-xl p-1 overflow-hidden shrink-0">
                                        {typeof imgSrc === 'string' ? (
                                            <img
                                                className="h-14 w-auto object-contain"
                                                src={imgSrc}
                                                alt={productName}
                                            />
                                        ) : (
                                            <Image
                                                className="h-14 w-auto object-contain"
                                                src={imgSrc}
                                                alt={productName}
                                                width={50}
                                                height={50}
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center text-sm">
                                        <p className="font-semibold text-slate-800 text-base">{productName}</p>
                                        <p className="text-slate-600 font-medium">{currency}{item.price} &times; {item.quantity || 1} </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            ID: <span className="font-mono text-slate-500">{order.orderId || order.id || 'N/A'}</span>
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                                        </p>
                                        <div className="mt-1">
                                            {ratings?.find(rating => (order.id || order.orderId) === rating.orderId && productId === rating.productId) ? (
                                                <Rating value={ratings.find(rating => (order.id || order.orderId) === rating.orderId && productId === rating.productId).rating} />
                                            ) : (
                                                <button
                                                    onClick={() => setRatingModal({ orderId: order.id || order.orderId, productId })}
                                                    className={`text-green-600 font-medium hover:bg-green-50 transition text-xs ${status.toLowerCase() !== "delivered" && 'hidden'}`}
                                                >
                                                    Rate Product
                                                </button>
                                            )}
                                        </div>
                                        {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </td>

                {/* Total Price Column */}
                <td className="text-center max-md:hidden font-bold text-slate-800 text-base">
                    {currency}{order.total}
                    <p className="text-[11px] font-normal text-slate-400 capitalize">{order.paymentMethod || 'COD'}</p>
                </td>

                {/* Full Customer & Shipping Address Column */}
                <td className="text-left max-md:hidden text-xs text-slate-600">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 max-w-xs">
                        <p className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                            <User size={14} className="text-slate-500" />
                            {customerName}
                        </p>
                        {customerEmail && (
                            <p className="flex items-center gap-1.5 text-slate-500">
                                <Mail size={13} className="text-slate-400 shrink-0" />
                                {customerEmail}
                            </p>
                        )}
                        {customerPhone && (
                            <p className="flex items-center gap-1.5 text-slate-500 font-medium">
                                <Phone size={13} className="text-slate-400 shrink-0" />
                                {customerPhone}
                            </p>
                        )}
                        <div className="flex items-start gap-1.5 text-slate-600 pt-1 border-t border-slate-200 mt-1.5">
                            <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                            <p>
                                {address.street ? `${address.street}, ` : ''}
                                {address.city ? `${address.city}, ` : ''}
                                {address.state ? `${address.state} ` : ''}
                                {address.zip ? `${address.zip}, ` : ''}
                                {address.country || 'Bangladesh'}
                            </p>
                        </div>
                    </div>
                </td>

                {/* Status & Actions Column */}
                <td className="text-left space-y-2 text-sm max-md:hidden">
                    <div
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            status.toLowerCase() === 'delivered'
                                ? 'text-green-700 bg-green-100'
                                : status.toLowerCase() === 'confirmed' || status.toLowerCase() === 'processing'
                                ? 'text-yellow-700 bg-yellow-100'
                                : 'text-slate-700 bg-slate-100'
                        }`}
                    >
                        <DotIcon size={10} className="scale-200" />
                        {status.replace(/_/g, ' ')}
                    </div>
                    <div>
                        <button
                            onClick={() => setShowInvoice(true)}
                            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer border border-slate-200 flex items-center gap-1 mt-2"
                        >
                            View Invoice
                        </button>
                    </div>
                </td>
            </tr>

            {/* Mobile View */}
            <tr className="md:hidden">
                <td colSpan={5} className="text-xs text-slate-600 pt-3">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1">
                        <p className="font-bold text-slate-800">{customerName}</p>
                        {customerEmail && <p>{customerEmail}</p>}
                        {customerPhone && <p className="font-medium">{customerPhone}</p>}
                        <p>{address.street}, {address.city}, {address.state} {address.zip}, {address.country || 'Bangladesh'}</p>
                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200">
                            <span className="font-bold text-slate-800 text-sm">Total: {currency}{order.total}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowInvoice(true)}
                                    className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium"
                                >
                                    Invoice
                                </button>
                                <span className='px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold capitalize text-xs'>
                                    {status.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <div className="border-b border-slate-200 my-4" />
                </td>
            </tr>

            {showInvoice && (
                <InvoiceModal
                    order={order}
                    isOpen={showInvoice}
                    onClose={() => setShowInvoice(false)}
                />
            )}
        </>
    );
};

export default OrderItem;