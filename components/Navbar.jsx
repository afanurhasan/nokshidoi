'use client';

import { Search, ShoppingCart, User, LogOut, PackageCheck, ChevronDown, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthModal from "./AuthModal";
import { logout } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [search, setSearch] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const cartCount = useSelector(state => state.cart.total);
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/shop?search=${search}`);
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowProfileDropdown(false);
        toast.success("Logged out successfully");
    };

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="relative bg-white sticky top-0 z-40 shadow-xs">
            <div className="mx-6">
                <div className="flex items-center justify-between max-w-7xl mx-auto py-3.5 transition-all">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <img
                            src="/logo.png"
                            alt="MustBuy Logo"
                            className="h-10 w-auto object-contain rounded-xl shadow-xs group-hover:scale-105 transition"
                        />
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
                                Must<span className="text-[#FF8904]">Buy</span>
                            </span>
                            <span className="text-[10px] tracking-wide text-slate-400 font-medium hidden sm:inline">
                                Buy The Chosen Ones
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
                        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
                        <Link href="/shop" className="hover:text-slate-900 transition">Shop</Link>
                        <Link href="/orders" className="hover:text-slate-900 transition">Orders</Link>

                        <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-2.5 rounded-full focus-within:ring-2 focus-within:ring-slate-300">
                            <Search size={18} className="text-slate-500" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-500"
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        <Link href="/cart" className="relative flex items-center gap-2 text-slate-600 hover:text-slate-900 transition">
                            <ShoppingCart size={18} />
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 text-[10px] text-white bg-green-600 size-4 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                    className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full transition cursor-pointer"
                                >
                                    <div className="size-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xs">
                                        {(user?.username || user?.email || 'U')[0].toUpperCase()}
                                    </div>
                                    <div className="text-left hidden lg:block">
                                        <p className="text-xs font-bold text-slate-800 line-clamp-1">{user?.username || 'User'}</p>
                                        <p className="text-[10px] text-slate-400 line-clamp-1">{user?.email || ''}</p>
                                    </div>
                                    <ChevronDown size={14} className="text-slate-400" />
                                </button>

                                {/* Dropdown Card */}
                                {showProfileDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 text-xs z-50 animate-in fade-in duration-150">
                                        <div className="border-b border-slate-100 pb-3 mb-3">
                                            <p className="font-bold text-sm text-slate-800">{user?.username || 'Customer'}</p>
                                            <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                                                <Mail size={12} className="text-slate-400 shrink-0" />
                                                <span className="truncate">{user?.email || 'N/A'}</span>
                                            </p>
                                            {user?.phone && (
                                                <p className="text-slate-500 flex items-center gap-1.5 mt-1">
                                                    <Phone size={12} className="text-slate-400 shrink-0" />
                                                    <span>{user.phone}</span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <Link
                                                href="/orders"
                                                onClick={() => setShowProfileDropdown(false)}
                                                className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium transition"
                                            >
                                                <PackageCheck size={16} className="text-green-600" />
                                                My Orders
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 p-2 hover:bg-red-50 text-red-600 rounded-lg font-medium transition cursor-pointer text-left"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="px-7 py-2 bg-slate-800 hover:bg-slate-900 transition text-white text-sm font-medium rounded-full cursor-pointer shadow-xs"
                            >
                                Login
                            </button>
                        )}
                    </div>

                    {/* Mobile User Button */}
                    <div className="sm:hidden flex items-center gap-3">
                        <Link href="/cart" className="relative text-slate-600 p-1">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 text-[10px] text-white bg-green-600 size-4 flex items-center justify-center rounded-full font-bold">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/orders"
                                    className="size-7 rounded-full bg-green-600 text-white flex items-center justify-center text-xs font-bold"
                                    title={user?.email}
                                >
                                    {(user?.username || user?.email || 'U')[0].toUpperCase()}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-slate-500 p-1"
                                    title="Logout"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="px-5 py-1.5 bg-slate-800 hover:bg-slate-900 text-xs font-medium transition text-white rounded-full cursor-pointer"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <hr className="border-gray-200" />

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </nav>
    );
};

export default Navbar;