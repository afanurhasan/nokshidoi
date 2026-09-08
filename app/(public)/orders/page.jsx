'use client';

import PageTitle from "@/components/PageTitle";
import { useEffect, useMemo, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "@/lib/graphql/queries";
import { setOrders } from "@/lib/features/order/orderSlice";
import Link from "next/link";
import { Mail, ShoppingBag, RefreshCw } from "lucide-react";

export default function Orders() {
    const dispatch = useDispatch();
    const strapiUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://mustbuy.srv1073421.hstgr.cloud').replace(/\/$/, '');
    const orders = useSelector(state => state.order.list) || [];
    const { user } = useSelector(state => state.auth);

    const [isRefreshing, setIsRefreshing] = useState(false);

    // Apollo GraphQL Query
    const { data, refetch } = useQuery(GET_ORDERS, {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
    });

    // Fetch live orders directly from Strapi REST API
    const fetchLiveCustomerOrders = async () => {
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
            console.warn('Customer orders fetch fallback note:', err);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchLiveCustomerOrders();
    }, []);

    useEffect(() => {
        if (data?.orders && data.orders.length > 0) {
            dispatch(setOrders(data.orders));
        }
    }, [data, dispatch]);

    // Filter orders by logged-in user's email
    const userOrders = useMemo(() => {
        if (!orders || orders.length === 0) return [];
        if (!user?.email) return orders; // show all if guest/not authenticated

        const userEmail = user.email.toLowerCase().trim();
        const filtered = orders.filter(o => {
            const orderEmail = (o.customerEmail || o.address?.email || '').toLowerCase().trim();
            return orderEmail === userEmail;
        });

        return filtered.length > 0 ? filtered : orders;
    }, [orders, user]);

    return (
        <div className="min-h-[70vh] mx-6">
            <div className="my-14 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <PageTitle
                        heading="My Orders"
                        text={`Showing total ${userOrders.length} order(s)`}
                        linkText={'Continue Shopping'}
                    />
                    <div className="flex items-center gap-3 self-start sm:self-center">
                        {user?.email && (
                            <div className="inline-flex items-center gap-2 bg-slate-100 px-3.5 py-1.5 rounded-full text-xs text-slate-600">
                                <Mail size={13} className="text-slate-400" />
                                <span>Orders for: <strong>{user.email}</strong></span>
                            </div>
                        )}
                        <button
                            onClick={fetchLiveCustomerOrders}
                            disabled={isRefreshing}
                            title="Refresh order status"
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition cursor-pointer"
                        >
                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-green-600' : ''} />
                        </button>
                    </div>
                </div>

                {userOrders && userOrders.length > 0 ? (
                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full max-w-5xl text-slate-500 table-auto border-separate border-spacing-y-8 border-spacing-x-4">
                            <thead>
                                <tr className="max-sm:text-sm text-slate-600 max-md:hidden">
                                    <th className="text-left font-semibold">Product</th>
                                    <th className="text-center font-semibold">Total Price</th>
                                    <th className="text-left font-semibold">Shipping Address</th>
                                    <th className="text-left font-semibold">Status & Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrders.map((order, index) => (
                                    <OrderItem order={order} key={order.documentId || order.id || order.orderId || index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="min-h-[50vh] flex flex-col items-center justify-center text-slate-400 gap-4 mt-8">
                        <ShoppingBag size={48} className="text-slate-300" />
                        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700">No orders found</h1>
                        <p className="text-sm text-slate-400">
                            {user?.email ? `No orders placed yet for ${user.email}.` : 'You have no orders yet.'}
                        </p>
                        <Link
                            href="/shop"
                            className="bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium px-6 py-2.5 rounded-full transition cursor-pointer shadow-sm"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}