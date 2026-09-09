'use client';

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "@/lib/graphql/queries";
import { useSelector } from "react-redux";

export default function StoreOrders() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '৳';
    const { data, loading } = useQuery(GET_ORDERS, { errorPolicy: 'ignore' });
    const storeOrders = useSelector(state => state.order.list) || [];
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const orders = data?.orders?.length > 0 ? data.orders : storeOrders;

    const openModal = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setIsModalOpen(false);
    };

    if (loading && orders.length === 0) return <Loading />;

    return (
        <>
            <h1 className="text-2xl text-slate-500 mb-5">Store <span className="text-slate-800 font-medium">Orders</span></h1>
            {orders.length === 0 ? (
                <div className="p-12 text-center text-slate-400 bg-white rounded-xl border border-slate-200 max-w-4xl">
                    No orders found in Strapi backend.
                </div>
            ) : (
                <div className="overflow-x-auto max-w-4xl rounded-xl shadow-xs border border-slate-200 bg-white">
                    <table className="w-full text-xs text-left text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                            <tr>
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Total</th>
                                <th className="px-4 py-3">Payment</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((order, index) => {
                                const orderId = order.orderId || order.documentId || order.id;
                                const customerName = order.customerName || order.address?.name || 'Customer';
                                const status = order.orderStatus || order.status || 'pending';

                                return (
                                    <tr
                                        key={orderId || index}
                                        className="hover:bg-slate-50 transition cursor-pointer"
                                        onClick={() => openModal(order)}
                                    >
                                        <td className="px-4 py-3 text-emerald-600 font-bold">{index + 1}</td>
                                        <td className="px-4 py-3 font-mono font-bold text-slate-800">{orderId}</td>
                                        <td className="px-4 py-3 font-medium text-slate-800">{customerName}</td>
                                        <td className="px-4 py-3 font-bold text-slate-900">{currency}{Number(order.total || 0).toLocaleString()}</td>
                                        <td className="px-4 py-3 uppercase text-[10px] font-semibold">{order.paymentMethod || 'COD'}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full font-semibold capitalize text-[10px] ${
                                                status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                                                status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                                                'bg-amber-100 text-amber-800'
                                            }`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-slate-400">
                                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Recent'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
