'use client';

import { User, Mail, Phone, MapPin, Truck, CheckCircle2, Eye, X, ArrowLeft, ShoppingBag, Tag } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client/react';
import { CREATE_ORDER } from '@/lib/graphql/mutations';
import { clearCart } from '@/lib/features/cart/cartSlice';
import { addOrder } from '@/lib/features/order/orderSlice';
import { setCredentials } from '@/lib/features/auth/authSlice';
import { decrementStock } from '@/lib/features/product/productSlice';

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    // Direct checkout form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'Bangladesh',
    });

    // Modal state for order review
    const [showReviewModal, setShowReviewModal] = useState(false);

    // Coupon states
    const [couponInput, setCouponInput] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);

    const handleApplyCoupon = async (e) => {
        if (e) e.preventDefault();
        if (!couponInput.trim()) {
            toast.error("Please enter a coupon code");
            return;
        }

        setCouponLoading(true);
        try {
            const res = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: couponInput.trim(),
                    items: items || [],
                    subtotal: totalPrice,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.error || "Invalid coupon code");
                return;
            }

            setAppliedCoupon(data);
            toast.success(`Coupon "${data.code}" applied! Saved ${currency}${data.discountAmount.toLocaleString()}`);
        } catch (err) {
            console.error(err);
            toast.error("Could not validate coupon. Please try again.");
        } finally {
            setCouponLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponInput('');
        toast.success("Coupon removed");
    };

    const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
    const finalPayable = Math.max(0, totalPrice - discountAmount);

    // Populate user details if logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || user.username || '',
                email: prev.email || user.email || '',
                phone: prev.phone || user.phone || '',
                street: prev.street || user.address || '',
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const [createOrderMutation, { loading: orderLoading }] = useMutation(CREATE_ORDER);

    // Validate and open Order Review Modal
    const handleOpenReview = (e) => {
        e.preventDefault();

        if (!items || items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter your full name");
            return;
        }
        if (!formData.email.trim() || !formData.email.includes('@')) {
            toast.error("Please enter a valid email address");
            return;
        }
        if (!formData.phone.trim()) {
            toast.error("Please enter your phone number");
            return;
        }
        if (!formData.street.trim()) {
            toast.error("Please enter your delivery street address");
            return;
        }
        if (!formData.city.trim()) {
            toast.error("Please enter your city");
            return;
        }

        setShowReviewModal(true);
    };

    // Final order confirmation after review
    const handleFinalConfirmOrder = async () => {
        const customerName = formData.name.trim();
        const customerEmail = formData.email.trim().toLowerCase();
        const customerPhone = formData.phone.trim();

        const orderId = `ORD-${Date.now().toString().slice(-6)}`;

        const orderPayload = {
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            items: items.map(item => ({
                id: item.documentId || item.id,
                name: item.name,
                price: Number(item.price) || 0,
                quantity: item.quantity || 1,
            })),
            total: finalPayable,
            couponCode: appliedCoupon?.code || null,
            discount: discountAmount,
            paymentMethod: 'COD',
            paymentStatus: 'pending',
            orderStatus: 'pending',
            address: {
                name: customerName,
                email: customerEmail,
                phone: customerPhone,
                street: formData.street.trim(),
                city: formData.city.trim(),
                state: formData.state.trim() || 'N/A',
                zip: formData.zip.trim() || 'N/A',
                country: formData.country || 'Bangladesh',
            },
        };

        try {
            // Attempt GraphQL order creation
            try {
                await createOrderMutation({
                    variables: {
                        data: {
                            orderId,
                            customerName,
                            customerEmail,
                            customerPhone,
                            items: orderPayload.items,
                            total: totalPrice,
                            paymentMethod: 'COD',
                            paymentStatus: 'pending',
                            orderStatus: 'pending',
                            address: orderPayload.address,
                        }
                    }
                });
            } catch (err) {
                console.warn("GraphQL order creation note (saved locally):", err);
            }

            // Save to Redux store & localStorage
            dispatch(addOrder({
                ...orderPayload,
                id: orderId,
                documentId: orderId,
                createdAt: new Date().toISOString(),
            }));

            // Decrement inventory stock
            dispatch(decrementStock({ items: orderPayload.items }));

            // Clear shopping cart
            dispatch(clearCart());

            // Auto-login user with order info
            dispatch(setCredentials({
                user: {
                    username: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    address: `${formData.street.trim()}, ${formData.city.trim()}`,
                },
                token: null,
            }));

            setShowReviewModal(false);
            toast.success("Order placed successfully! Welcome to your orders.");
            router.push('/orders');
        } catch (error) {
            console.error("Order placement error:", error);
            toast.error("Could not complete order. Please try again.");
        }
    };

    return (
        <>
            <div className='w-full max-w-lg lg:w-[400px] shrink-0 bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-2xl p-6'>
                <h2 className='text-lg font-bold text-slate-800 pb-2 border-b border-slate-200'>Order Details</h2>

                {/* Delivery Information Form */}
                <div className='my-4 space-y-3'>
                    <p className='text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5'>
                        <MapPin size={13} className='text-slate-500' /> Shipping Information
                    </p>

                    {/* Full Name */}
                    <div>
                        <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Full Name *</label>
                        <div className='relative'>
                            <User size={14} className='absolute left-3 top-2.5 text-slate-400' />
                            <input
                                type='text'
                                name='name'
                                required
                                placeholder='e.g. Mehedi Hasan'
                                value={formData.name}
                                onChange={handleInputChange}
                                className='w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Email Address *</label>
                        <div className='relative'>
                            <Mail size={14} className='absolute left-3 top-2.5 text-slate-400' />
                            <input
                                type='email'
                                name='email'
                                required
                                placeholder='e.g. mehedi@example.com'
                                value={formData.email}
                                onChange={handleInputChange}
                                className='w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Phone Number *</label>
                        <div className='relative'>
                            <Phone size={14} className='absolute left-3 top-2.5 text-slate-400' />
                            <input
                                type='tel'
                                name='phone'
                                required
                                placeholder='e.g. +880 1712-345678'
                                value={formData.phone}
                                onChange={handleInputChange}
                                className='w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                    </div>

                    {/* Street Address */}
                    <div>
                        <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Street / Delivery Address *</label>
                        <input
                            type='text'
                            name='street'
                            required
                            placeholder='House no, road, area details...'
                            value={formData.street}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                        />
                    </div>

                    {/* City and State / District */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='block text-[11px] font-semibold text-slate-600 mb-1'>City *</label>
                            <input
                                type='text'
                                name='city'
                                required
                                placeholder='City (e.g. Dhaka)'
                                value={formData.city}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                        <div>
                            <label className='block text-[11px] font-semibold text-slate-600 mb-1'>State / Division</label>
                            <input
                                type='text'
                                name='state'
                                placeholder='State (e.g. Dhaka)'
                                value={formData.state}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                    </div>

                    {/* Postal Code & Country */}
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Postal / ZIP Code</label>
                            <input
                                type='text'
                                name='zip'
                                placeholder='e.g. 1230'
                                value={formData.zip}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                        <div>
                            <label className='block text-[11px] font-semibold text-slate-600 mb-1'>Country</label>
                            <input
                                type='text'
                                name='country'
                                value={formData.country}
                                onChange={handleInputChange}
                                className='w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-800 transition'
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Method Selection: ONLY Cash On Delivery (COD) */}
                <div className='my-4 pt-3 border-t border-slate-200'>
                    <p className='text-slate-500 text-xs font-semibold mb-2'>Payment Method</p>
                    <div className='bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <span className='w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-green-100'></span>
                            <div>
                                <p className='font-semibold text-slate-800 text-xs'>Cash On Delivery (COD)</p>
                                <p className='text-[11px] text-slate-400'>Pay with cash when your package arrives</p>
                            </div>
                        </div>
                        <CheckCircle2 size={18} className='text-green-600 shrink-0' />
                    </div>
                </div>

                {/* Promo Coupon Code Field */}
                <div className='my-4 pt-3 border-t border-slate-200'>
                    <p className='text-slate-600 text-xs font-semibold mb-2 flex items-center gap-1.5'>
                        <Tag size={13} className='text-emerald-600' /> Have a Promo Coupon?
                    </p>
                    {!appliedCoupon ? (
                        <form onSubmit={handleApplyCoupon} className='flex gap-2'>
                            <input
                                type='text'
                                placeholder='Enter coupon code (e.g. SAVE20)'
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                className='flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl uppercase outline-none focus:border-emerald-600 font-mono tracking-wider'
                            />
                            <button
                                type='submit'
                                disabled={couponLoading || !couponInput.trim()}
                                className='px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-black disabled:opacity-50 transition cursor-pointer'
                            >
                                {couponLoading ? 'Checking...' : 'Apply'}
                            </button>
                        </form>
                    ) : (
                        <div className='bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs'>
                            <div className='flex items-center gap-2'>
                                <CheckCircle2 size={15} className='text-emerald-600 shrink-0' />
                                <div>
                                    <span className='font-bold text-emerald-800 font-mono'>{appliedCoupon.code}</span>
                                    <span className='text-emerald-700 ml-1.5'>(-{currency}{discountAmount.toLocaleString()})</span>
                                </div>
                            </div>
                            <button
                                type='button'
                                onClick={handleRemoveCoupon}
                                className='text-slate-400 hover:text-rose-600 p-1 transition cursor-pointer'
                                title='Remove Coupon'
                            >
                                <X size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Pricing Breakdown */}
                <div className='py-3 border-t border-b border-slate-200 space-y-2'>
                    <div className='flex justify-between text-xs text-slate-500'>
                        <span>Subtotal:</span>
                        <span className='font-medium text-slate-800'>{currency}{totalPrice.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                        <div className='flex justify-between text-xs text-emerald-600 font-semibold'>
                            <span>Coupon Discount ({appliedCoupon.code}):</span>
                            <span>-{currency}{discountAmount.toLocaleString()}</span>
                        </div>
                    )}
                    <div className='flex justify-between text-xs text-slate-500'>
                        <span>Delivery Fee:</span>
                        <span className='text-green-600 font-semibold'>Free Delivery</span>
                    </div>
                </div>

                <div className='flex justify-between py-4 text-base font-bold text-slate-800'>
                    <span>Total Amount:</span>
                    <span className='text-lg text-slate-900'>{currency}{finalPayable.toLocaleString()}</span>
                </div>

                {/* Review Order Button */}
                <button
                    onClick={handleOpenReview}
                    className='w-full bg-slate-800 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-900 active:scale-98 transition cursor-pointer shadow-md text-sm flex items-center justify-center gap-2'
                >
                    <Eye size={16} />
                    Review & Confirm Order
                </button>
            </div>

            {/* ORDER REVIEW & CONFIRMATION MODAL */}
            {showReviewModal && (
                <div className='fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in'>
                    <div className='bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8'>
                        {/* Header */}
                        <div className='p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50'>
                            <div className='flex items-center gap-2.5'>
                                <div className='w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center'>
                                    <ShoppingBag size={18} />
                                </div>
                                <div>
                                    <h3 className='font-bold text-slate-800 text-base'>Review Your Order</h3>
                                    <p className='text-xs text-slate-500'>Please check all details before confirming</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowReviewModal(false)}
                                className='text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-200 transition cursor-pointer'
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className='p-6 space-y-5 max-h-[70vh] overflow-y-auto'>
                            {/* Customer & Shipping Summary */}
                            <div className='bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2.5'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5'>
                                        <MapPin size={14} className='text-green-600' /> Shipping Address
                                    </p>
                                    <button
                                        onClick={() => setShowReviewModal(false)}
                                        className='text-xs text-green-600 hover:underline font-semibold cursor-pointer'
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div className='text-xs text-slate-600 space-y-1 pl-1'>
                                    <p className='font-bold text-slate-800 text-sm'>{formData.name}</p>
                                    <p className='flex items-center gap-2 text-slate-600'>
                                        <Phone size={12} className='text-slate-400' /> {formData.phone}
                                    </p>
                                    <p className='flex items-center gap-2 text-slate-600'>
                                        <Mail size={12} className='text-slate-400' /> {formData.email}
                                    </p>
                                    <p className='text-slate-700 pt-1 border-t border-slate-200 mt-1 leading-relaxed'>
                                        {formData.street}, {formData.city}
                                        {formData.state ? `, ${formData.state}` : ''}
                                        {formData.zip ? ` - ${formData.zip}` : ''}, {formData.country}
                                    </p>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className='bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <span className='w-2 h-2 rounded-full bg-green-500'></span>
                                    <span className='text-xs text-slate-500'>Payment Method:</span>
                                    <span className='text-xs font-bold text-slate-800'>Cash On Delivery (COD)</span>
                                </div>
                                <span className='text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-semibold'>
                                    Pay upon delivery
                                </span>
                            </div>

                            {/* Order Items List */}
                            <div>
                                <p className='text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5'>
                                    Ordered Items ({items.length})
                                </p>
                                <div className='divide-y divide-slate-100 border border-slate-200 rounded-xl bg-white overflow-hidden'>
                                    {items.map((item, idx) => (
                                        <div key={idx} className='p-3 flex items-center justify-between text-xs'>
                                            <div className='flex-1 pr-3'>
                                                <p className='font-semibold text-slate-800 line-clamp-1'>{item.name}</p>
                                                <p className='text-slate-400 text-[11px]'>Qty: {item.quantity} × {currency}{item.price}</p>
                                            </div>
                                            <p className='font-bold text-slate-900 shrink-0'>
                                                {currency}{(Number(item.price || 0) * Number(item.quantity || 1)).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Total Breakdown */}
                            <div className='bg-green-50/70 border border-green-200 rounded-xl p-3 space-y-1.5 text-xs text-slate-700'>
                                <div className='flex justify-between'>
                                    <span>Subtotal:</span>
                                    <span className='font-semibold text-slate-800'>{currency}{totalPrice.toLocaleString()}</span>
                                </div>
                                {appliedCoupon && (
                                    <div className='flex justify-between text-emerald-700 font-semibold'>
                                        <span>Coupon Discount ({appliedCoupon.code}):</span>
                                        <span>-{currency}{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className='flex justify-between'>
                                    <span>Shipping & Delivery:</span>
                                    <span className='font-semibold text-green-700'>FREE</span>
                                </div>
                                <div className='flex justify-between pt-1.5 border-t border-green-200 text-sm font-bold text-slate-900'>
                                    <span>Total Payable:</span>
                                    <span className='text-base text-slate-900'>{currency}{finalPayable.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer Action Buttons */}
                        <div className='p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-3'>
                            <button
                                type='button'
                                onClick={() => setShowReviewModal(false)}
                                className='flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition cursor-pointer flex items-center justify-center gap-1.5'
                            >
                                <ArrowLeft size={14} /> Back / Edit
                            </button>
                            <button
                                type='button'
                                onClick={handleFinalConfirmOrder}
                                disabled={orderLoading}
                                className='flex-2 py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-black active:scale-98 transition cursor-pointer shadow-md disabled:opacity-50 flex items-center justify-center gap-2'
                            >
                                <Truck size={15} />
                                {orderLoading ? 'Placing Order...' : 'Confirm Order Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderSummary;