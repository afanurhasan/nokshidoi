'use client';

import Loading from "@/components/Loading";
import OrdersAreaChart from "@/components/OrdersAreaChart";
import { CircleDollarSignIcon, ShoppingBasketIcon, TagsIcon, FileText, ArrowRight, PackageCheck, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, setOrders } from "@/lib/features/order/orderSlice";
import { restoreStock, setProduct } from "@/lib/features/product/productSlice";
import InvoiceModal from "@/components/InvoiceModal";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQuery } from "@apollo/client/react";
import { GET_ORDERS, GET_PRODUCTS } from "@/lib/graphql/queries";
import { getStrapiUrl } from "@/lib/strapi";

export default function AdminDashboard() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const strapiUrl = getStrapiUrl();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // 1. Apollo GraphQL Queries for real database records
    const { data: gqlData, refetch: refetchGql } = useQuery(GET_ORDERS, {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    });
    const { data: gqlProds } = useQuery(GET_PRODUCTS, {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
    });

    const orders = useSelector(state => state.order.list) || [];
    const products = useSelector(state => state.product.list) || [];

    useEffect(() => {
        if (gqlProds?.products && gqlProds.products.length > 0) {
            dispatch(setProduct(gqlProds.products));
        }
    }, [gqlProds, dispatch]);

    // Fetch real orders directly from Strapi REST API
    const fetchLiveOrders = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch(`${strapiUrl}/api/orders?sort=createdAt:DESC`);
            if (res.ok) {
                const json = await res.json();
                if (json.data && Array.isArray(json.data)) {
                    dispatch(setOrders(json.data));
                }
            }
        } catch (err) {
            console.warn('Live orders fetch note:', err);
        } finally {
            setIsRefreshing(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveOrders();
    }, []);

    useEffect(() => {
        if (gqlData?.orders && gqlData.orders.length > 0) {
            dispatch(setOrders(gqlData.orders));
        }
    }, [gqlData, dispatch]);

    const totalRevenue = orders.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
    const pendingOrdersCount = orders.filter(o => (o.orderStatus || o.status || 'pending').toLowerCase() === 'pending').length;

    const dashboardCardsData = [
        { title: 'Total Products', value: products.length || 0, icon: ShoppingBasketIcon },
        { title: 'Total Revenue', value: `${currency}${totalRevenue.toLocaleString()}`, icon: CircleDollarSignIcon },
        { title: 'Total Orders', value: orders.length || 0, icon: TagsIcon },
        { title: 'Pending Orders', value: pendingOrdersCount, icon: PackageCheck },
    ];

    const handleStatusChange = async (order, newStatus) => {
        const targetDocId = order.documentId || order.id || order.orderId;

        // 1. Optimistic update in Redux
        dispatch(updateOrderStatus({ orderId: targetDocId, status: newStatus }));

        // Restore inventory stock if cancelled
        if (newStatus === 'cancelled') {
            const itemsToRestore = order.orderItems || order.items || [];
            if (itemsToRestore.length > 0) {
                dispatch(restoreStock({ items: itemsToRestore }));
                toast.success('Inventory stock restored for cancelled order');
            }
        }

        // 2. Persist update directly to Strapi Database
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
            console.error('Error updating order status:', err);
            toast.error('Network error updating status');
        }
    };

    const getStatusBadge = (status) => {
        const s = (status || 'pending').toLowerCase();
        if (s === 'delivered') return 'bg-green-100 text-green-700 border-green-200';
        if (s === 'shipped' || s === 'processing') return 'bg-blue-100 text-blue-700 border-blue-200';
        if (s === 'cancelled') return 'bg-red-100 text-red-700 border-red-200';
        return 'bg-amber-100 text-amber-700 border-amber-200';
    };

    if (loading) return <Loading />;

    return (
        <div className="text-slate-600 space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Admin <span className="text-green-600 font-semibold">Dashboard</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Real-time overview of MustBuy store performance, revenue, and customer orders
                    </p>
                </div>
                <button
                    onClick={fetchLiveOrders}
                    disabled={isRefreshing}
                    title="Refresh orders from database"
                    className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition cursor-pointer shadow-xs"
                >
                    <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-green-600' : ''} />
                    Sync Data
                </button>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {dashboardCardsData.map((card, index) => (
                    <div key={index} className="flex items-center justify-between border border-slate-200 bg-white p-5 rounded-2xl shadow-xs">
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
                            <b className="text-2xl font-bold text-slate-800">{card.value}</b>
                        </div>
                        <card.icon size={44} className="p-2.5 text-slate-700 bg-slate-100 rounded-xl" />
                    </div>
                ))}
            </div>

            {/* Recent Orders Section with Status Switcher and Invoice Generator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Live Customer Orders</h2>
                        <p className="text-xs text-slate-400">Change order status with dropdown to update Strapi database in real-time</p>
                    </div>
                    <Link
                        href="/admin/orders"
                        className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                    >
                        View All Orders <ArrowRight size={14} />
                    </Link>
                </div>

                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                                <tr>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Customer</th>
                                    <th className="p-3">Total</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3 text-center">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {orders.slice(0, 6).map((order, idx) => {
                                    const orderId = order.orderId || order.documentId || order.id || `ORD-${idx}`;
                                    const currentStatus = order.orderStatus || order.status || 'pending';
                                    const customerName = order.customerName || order.address?.name || 'Customer';
                                    const customerEmail = order.customerEmail || order.address?.email || '';

                                    return (
                                        <tr key={order.documentId || order.id || idx} className="hover:bg-slate-50/70 transition">
                                            <td className="p-3 font-mono font-bold text-slate-800">
                                                {orderId}
                                                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                                                </p>
                                            </td>
                                            <td className="p-3">
                                                <p className="font-semibold text-slate-800">{customerName}</p>
                                                <p className="text-slate-400 text-[11px]">{customerEmail}</p>
                                            </td>
                                            <td className="p-3 font-bold text-slate-800">
                                                {currency}{Number(order.total || 0).toLocaleString()}
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    value={currentStatus.toLowerCase()}
                                                    onChange={(e) => handleStatusChange(order, e.target.value)}
                                                    className={`text-xs font-semibold px-2 py-1 rounded-lg border outline-none cursor-pointer transition ${getStatusBadge(currentStatus)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => setSelectedOrderForInvoice(order)}
                                                    className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-900 text-white px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer"
                                                >
                                                    <FileText size={12} /> Invoice
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-400 text-xs">
                        No orders recorded in database yet.
                    </div>
                )}
            </div>

            {/* Orders Area Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-base font-bold text-slate-800 mb-4">Sales & Order Volume</h3>
                <OrdersAreaChart allOrders={orders} />
            </div>

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