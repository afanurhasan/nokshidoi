import { usePathname } from "next/navigation";
import { HomeIcon, PackageCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminSidebar = () => {
    const pathname = usePathname();

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Orders', href: '/admin/orders', icon: PackageCheck },
    ];

    return (
        <div className="inline-flex h-full flex-col gap-5 border-r border-slate-200 sm:min-w-60">
            <div className="flex flex-col gap-2 justify-center items-center pt-8 max-sm:hidden">
                <img
                    className="w-16 h-16 rounded-2xl object-contain border border-slate-200 shadow-xs p-1"
                    src="/logo.png"
                    alt="MustBuy Admin"
                />
                <p className="text-slate-800 font-bold text-sm">MustBuy Admin</p>
                <p className="text-[10px] text-slate-400">Buy The Chosen Ones</p>
            </div>

            <div className="max-sm:mt-6">
                {sidebarLinks.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`relative flex items-center gap-3 text-slate-500 hover:bg-slate-50 p-2.5 transition ${
                            pathname === link.href && 'bg-slate-100 sm:text-slate-900 font-semibold'
                        }`}
                    >
                        <link.icon size={18} className="sm:ml-5 text-slate-600" />
                        <p className="max-sm:hidden">{link.name}</p>
                        {pathname === link.href && (
                            <span className="absolute bg-[#FF8904] right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;