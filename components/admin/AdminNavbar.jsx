'use client';

import Link from "next/link";
import Image from "next/image";
import { LogOut, UserCheck } from "lucide-react";

const AdminNavbar = ({ onLogout }) => {
    return (
        <div className="flex items-center justify-between px-6 sm:px-12 py-3 border-b border-slate-200 bg-white sticky top-0 z-30 shadow-xs">
            <Link href="/admin" className="flex items-center gap-2.5 group">
                <img
                    src="/logo.png"
                    alt="MustBuy Admin"
                    className="h-9 w-auto object-contain rounded-xl shadow-xs"
                />
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                    Must<span className="text-[#FF8904]">Buy</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-full ml-1">
                    Admin
                </span>
            </Link>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full">
                    <UserCheck size={14} className="text-green-600" />
                    <span>Administrator</span>
                </div>
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-1 text-xs text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer"
                        title="Logout from Admin"
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminNavbar;