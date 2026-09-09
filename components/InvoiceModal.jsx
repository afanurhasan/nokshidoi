'use client';

import React from 'react';
import { XIcon, Printer, CheckCircle, Package } from 'lucide-react';

const InvoiceModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const orderId = order.orderId || order.id || 'N/A';
    const customerName = order.customerName || order.address?.name || 'Customer';
    const customerEmail = order.customerEmail || order.address?.email || 'N/A';
    const customerPhone = order.customerPhone || order.address?.phone || 'N/A';
    const address = order.address || {};
    const items = order.orderItems || order.items || [];
    const total = order.total || 0;
    const paymentMethod = order.paymentMethod || 'COD';
    const orderStatus = order.orderStatus || order.status || 'pending';
    const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }) : new Date().toLocaleDateString();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-10 relative my-8 animate-in fade-in zoom-in duration-200">
                {/* Header Controls */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
                    <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                        <Package className="text-green-600" size={22} />
                        <span>Order Invoice</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer"
                        >
                            <Printer size={15} /> Print / Save PDF
                        </button>
                        <button
                            onClick={onClose}
                            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
                        >
                            <XIcon size={20} />
                        </button>
                    </div>
                </div>

                {/* Printable Invoice Body */}
                <div id="printable-invoice" className="space-y-6 text-slate-700">
                    {/* Invoice Brand & Details */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="MustBuy" className="h-12 w-auto object-contain rounded-xl" />
                            <div>
                                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Must<span className="text-[#FF8904]">Buy</span>
                                </h1>
                                <p className="text-xs text-slate-500 font-medium">Buy The Chosen Ones &bull; Hotline: +880 1894-372152</p>
                            </div>
                        </div>
                        <div className="text-right sm:text-right">
                            <p className="text-xs text-slate-400 font-medium">INVOICE NUMBER</p>
                            <p className="text-base font-bold font-mono text-slate-800">{orderId}</p>
                            <p className="text-xs text-slate-500 mt-1">Date: {orderDate}</p>
                        </div>
                    </div>

                    {/* Customer & Shipping Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs">
                        <div>
                            <p className="font-bold text-slate-700 uppercase tracking-wider mb-1.5">Billed & Shipped To:</p>
                            <p className="font-bold text-slate-900 text-sm">{customerName}</p>
                            <p className="text-slate-600 mt-0.5">{customerEmail}</p>
                            <p className="text-slate-600 font-medium">{customerPhone}</p>
                            <p className="text-slate-600 mt-1">
                                {address.street ? `${address.street}, ` : ''}
                                {address.city ? `${address.city}, ` : ''}
                                {address.state ? `${address.state} ` : ''}
                                {address.zip ? `${address.zip}, ` : ''}
                                {address.country || 'Bangladesh'}
                            </p>
                        </div>

                        <div className="sm:text-right space-y-1">
                            <p className="font-bold text-slate-700 uppercase tracking-wider mb-1.5">Order Information:</p>
                            <p className="text-slate-600">Payment: <strong className="text-slate-800 uppercase">{paymentMethod}</strong></p>
                            <p className="text-slate-600">Status: <span className="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold capitalize">{orderStatus}</span></p>
                            <p className="text-slate-600 flex items-center sm:justify-end gap-1 text-green-600 font-medium mt-1">
                                <CheckCircle size={14} /> Confirmed Order
                            </p>
                        </div>
                    </div>

                    {/* Purchased Items Table */}
                    <table className="w-full text-xs text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-slate-200 text-slate-600">
                                <th className="py-2.5 font-bold">Item Description</th>
                                <th className="py-2.5 font-bold text-center">Unit Price</th>
                                <th className="py-2.5 font-bold text-center">Qty</th>
                                <th className="py-2.5 font-bold text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.map((item, index) => {
                                const productObj = item.product || item;
                                const name = productObj.name || item.name || 'Product Item';
                                const price = Number(productObj.price || item.price || 0);
                                const qty = item.quantity || 1;
                                return (
                                    <tr key={index}>
                                        <td className="py-3 font-medium text-slate-800">{name}</td>
                                        <td className="py-3 text-center">{currency}{price.toFixed(2)}</td>
                                        <td className="py-3 text-center">{qty}</td>
                                        <td className="py-3 text-right font-semibold text-slate-800">
                                            {currency}{(price * qty).toFixed(2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Total Summary */}
                    <div className="border-t border-slate-200 pt-4 flex justify-end">
                        <div className="w-full sm:w-64 space-y-1.5 text-xs">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal:</span>
                                <span className="font-medium text-slate-800">{currency}{Number(total).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Shipping:</span>
                                <span className="text-green-600 font-medium">Free</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                                <span>Total Paid:</span>
                                <span className="text-green-600">{currency}{Number(total).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="text-center pt-6 border-t border-slate-100 text-[11px] text-slate-400">
                        <p>Thank you for shopping with MustBuy! For customer support, contact support@mustbuy.com.bd</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
