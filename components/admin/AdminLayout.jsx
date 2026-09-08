'use client';

import { useEffect, useState } from "react";
import Loading from "../Loading";
import Link from "next/link";
import { Lock, Mail, ShieldAlert, ArrowLeft, Eye, EyeOff } from "lucide-react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import toast from "react-hot-toast";

const AdminLayout = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Admin login form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');

    const targetEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@gocart.com';
    const targetPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const session = localStorage.getItem('gocart_admin_session');
            if (session === 'true') {
                setIsAdmin(true);
            }
        }
        setLoading(false);
    }, []);

    const handleAdminLogin = (e) => {
        e.preventDefault();
        setLoginError('');

        if (email.trim().toLowerCase() === targetEmail.toLowerCase() && password === targetPassword) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('gocart_admin_session', 'true');
            }
            setIsAdmin(true);
            toast.success("Welcome back, Admin!");
        } else {
            setLoginError("Invalid admin email or password.");
            toast.error("Invalid credentials.");
        }
    };

    const handleAdminLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('gocart_admin_session');
        }
        setIsAdmin(false);
        toast.success("Admin logged out");
    };

    if (loading) return <Loading />;

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold text-slate-800 mb-2">
                            <img src="/logo.png" alt="MustBuy" className="h-10 w-auto object-contain rounded-xl" />
                            <span>Must<span className="text-[#FF8904]">Buy</span></span>
                            <span className="text-xs bg-slate-800 text-white px-2 py-0.5 rounded-full font-normal align-middle">
                                Admin
                            </span>
                        </Link>
                        <h2 className="text-xl font-bold text-slate-800">Admin Authentication</h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Enter authorized administrator credentials to manage MustBuy orders
                        </p>
                    </div>

                    {loginError && (
                        <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-200 mb-4 flex items-center gap-2">
                            <ShieldAlert size={16} className="shrink-0" />
                            <span>{loginError}</span>
                        </div>
                    )}

                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Email</label>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3.5 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-slate-800 transition">
                                <Mail size={16} className="text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder={targetEmail}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full text-xs outline-none bg-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Password</label>
                            <div className="flex items-center gap-2 border border-slate-300 rounded-xl px-3.5 py-2.5 bg-slate-50 focus-within:bg-white focus-within:border-slate-800 transition">
                                <Lock size={16} className="text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full text-xs outline-none bg-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition cursor-pointer shadow-md text-xs mt-2 active:scale-98"
                        >
                            Sign In to Admin Dashboard
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition"
                        >
                            <ArrowLeft size={14} /> Return to Storefront
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <AdminNavbar onLogout={handleAdminLogout} />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-8 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;