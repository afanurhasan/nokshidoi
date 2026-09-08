'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrderStatus, setOrders } from '@/lib/features/order/orderSlice';
import InvoiceModal from '@/components/InvoiceModal';
import { FileText, Search, Mail, Phone, MapPin, User, RefreshCw } from 'lucide-react';
import { useQuery } from '@apollo/client/react';
import { GET_ORDERS } from '@/lib/graphql/queries';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const dispatch = useDispatch();

    const [orders, setOrdersState] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const storeOrders = useSelector(state => state.order.list) || [];

    // Apollo GraphQL Query
    const { data: gqlData, refetch: refetchGql } = useQuery(GET_ORDERS, {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    });

    // Fetch directly from Strapi REST API to guarantee real-time database sync
    const fetchLiveOrders = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch(`${strapiUrl}/api/orders?sort=createdAt:DESC`);
            if (res.ok) {
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    setOrdersState(json.data);
                    dispatch(setOrders(json.data));
                }
            }
        } catch (err) {
            console.warn('REST orders fetch fallback note:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    // Load live orders on mount
    useEffect(() => {
        fetchLiveOrders();
    }, []);

    // Sync from GraphQL query
    useEffect(() => {
        if (gqlData?.orders && gqlData.orders.length > 0) {
            setOrdersState(gqlData.orders);
            dispatch(setOrders(gqlData.orders));
        }
    }, [gqlData, dispatch]);

    // Keep in sync with Redux if updated elsewhere
    useEffect(() => {
        if (storeOrders && storeOrders.length > 0 && orders.length === 0) {
            setOrdersState(storeOrders);
        }
    }, [storeOrders]);

    const filteredOrders = orders.filter(order => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        const id = (order.orderId || order.documentId || order.id || '').toLowerCase();
        const name = (order.customerName || order.address?.name || '').toLowerCase();
        const email = (order.customerEmail || order.address?.email || '').toLowerCase();
        const phone = (order.customerPhone || order.address?.phone || '').toLowerCase();
        return id.includes(query) || name.includes(query) || email.includes(query) || phone.includes(query);
    });

    const handleStatusChange = async (order, newStatus) => {
        const targetDocId = order.documentId || order.id || order.orderId;

        // 1. Immediately update local state so UI switches instantly
        setOrdersState(prev => prev.map(o => {
            const match = (o.documentId && o.documentId === order.documentId) ||
                          (o.id && o.id === order.id) ||
                          (o.orderId && o.orderId === order.orderId);
            return match ? { ...o, orderStatus: newStatus, status: newStatus } : o;
        }));

        // 2. Update Redux store
        dispatch(updateOrderStatus({ orderId: targetDocId, status: newStatus }));

        // 3. Persist update to Strapi Database
        try {
            const res = await fetch(`${strapiUrl}/api/orders/${order.documentId || order.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        orderStatus: newStatus,
                        paymentStatus: newStatus === 'delivered' ? 'paid' : (order.paymentStatus || 'pending')
                    }
                })
            });

            if (res.ok) {
                toast.success(`Order status updated to ${newStatus}`);
                refetchGql?.();
            } else {
                toast.error('Failed to update status on server');
            }
        } catch (err) {
            console.error('Error updating order status in Strapi:', err);
            toast.error('Network error updating status');
        }
    };

    const getStatusBadge = (status) => {
        const s = (status || 'pending').toLowerCase();
        if (s === 'delivered') return 'bg-green-100 text-green-700 border-green-300';
        if (s === 'shipped' || s === 'processing') return 'bg-blue-100 text-blue-700 border-blue-300';
        if (s === 'cancelled') return 'bg-red-100 text-red-700 border-red-300';
        return 'bg-amber-100 text-amber-700 border-amber-300'; // pending
    };

    return (
        <div className="text-slate-600 space-y-6 pb-20">
            {/* Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        Order <span className="text-green-600">Management</span>
                        <button
                            onClick={fetchLiveOrders}
                            disabled={isRefreshing}
                            title="Refresh orders from database"
                            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                        >
                            <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-green-600' : ''} />
                        </button>
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">
                        Live real-time orders from Strapi backend. Update statuses and generate printable invoices.
                    </p>
                </div>

                <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs w-full sm:w-72 border border-slate-200 focus-within:bg-white focus-within:border-slate-800 transition">
                    <Search size={16} className="text-slate-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Name, Email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent outline-none text-slate-700"
                    />
                </div>
            </div>

            {/* Orders Table */}
            {filteredOrders.length > 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="p-4">Order ID & Date</th>
                                    <th className="p-4">Customer Details</th>
                                    <th className="p-4">Shipping Destination</th>
                                    <th className="p-4">Items & Total</th>
                                    <th className="p-4">Live Status & Action</th>
                                    <th className="p-4 text-center">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredOrders.map((order, idx) => {
                                    const orderId = order.orderId || order.documentId || order.id || `ORD-${idx}`;
                                    const currentStatus = order.orderStatus || order.status || 'pending';
                                    const address = order.address || {};
                                    const customerName = order.customerName || address.name || 'Guest Customer';
                                    const customerEmail = order.customerEmail || address.email || 'N/A';
                                    const customerPhone = order.customerPhone || address.phone || 'N/A';
                                    const items = order.orderItems || order.items || [];

                                    return (
                                        <tr key={order.documentId || order.id || idx} className="hover:bg-slate-50/70 transition">
                                            {/* Order ID & Date */}
                                            <td className="p-4 align-top whitespace-nowrap">
                                                <span className="font-mono font-bold text-slate-800 text-xs">{orderId}</span>
                                                <p className="text-slate-400 text-[11px] mt-1">
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                                                </p>
                                                <span className="inline-block uppercase text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded mt-1">
                                                    {order.paymentMethod || 'COD'}
                                                </span>
                                            </td>

                                            {/* Customer Details */}
                                            <td className="p-4 align-top">
                                                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                                                    <User size={13} className="text-slate-400" />
                                                    {customerName}
                                                </p>
                                                <p className="text-slate-500 flex items-center gap-1.5 mt-0.5">
                                                    <Mail size={12} className="text-slate-400" />
                                                    {customerEmail}
                                                </p>
                                                <p className="text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                                                    <Phone size={12} className="text-slate-400" />
                                                    {customerPhone}
                                                </p>
                                            </td>

                                            {/* Shipping Address */}
                                            <td className="p-4 align-top max-w-xs text-slate-600">
                                                <div className="flex items-start gap-1.5">
                                                    <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                                    <p className="line-clamp-2">
                                                        {address.street ? `${address.street}, ` : ''}
                                                        {address.city ? `${address.city}, ` : ''}
                                                        {address.state ? `${address.state} ` : ''}
                                                        {address.zip ? `${address.zip}, ` : ''}
                                                        {address.country || 'Bangladesh'}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Items & Total */}
                                            <td className="p-4 align-top whitespace-nowrap">
                                                <p className="font-bold text-slate-800 text-sm">
                                                    {currency}{Number(order.total || 0).toLocaleString()}
                                                </p>
                                                <p className="text-slate-400 text-[11px] mt-0.5">
                                                    {items.length} item(s) purchased
                                                </p>
                                            </td>

                                            {/* Status Change Dropdown - Live update to Strapi */}
                                            <td className="p-4 align-top whitespace-nowrap">
                                                <div className="space-y-1.5">
                                                    <select
                                                        value={(currentStatus || 'pending').toLowerCase()}
                                                        onChange={(e) => handleStatusChange(order, e.target.value)}
                                                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer transition ${getStatusBadge(currentStatus)}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="processing">Processing</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                            </td>

                                            {/* Invoice Generation Button */}
                                            <td className="p-4 align-top text-center whitespace-nowrap">
                                                <button
                                                    onClick={() => setSelectedOrderForInvoice(order)}
                                                    className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shadow-xs"
                                                >
                                                    <FileText size={13} />
                                                    Invoice
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                    <p className="text-slate-400 text-sm">No orders found in database.</p>
                </div>
            )}

            {/* Invoice Modal */}
            {selectedOrderForInvoice && (
                <InvoiceModal
                    order={selectedOrderForInvoice}
                    isOpen={!!selectedOrderForInvoice}
                    onClose={() => setSelectedOrderForInvoice(null)}
                />
            )}
        </div>
    );
}
