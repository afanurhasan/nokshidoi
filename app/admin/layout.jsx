import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "MustBuy - Admin",
    description: "MustBuy E-Commerce Admin Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
