import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import StoreProvider from "@/app/StoreProvider";
import ApolloWrapper from "@/components/ApolloWrapper";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: "MustBuy - Buy The Chosen Ones",
    description: "MustBuy - Premium gadgets and tech accessories. Buy The Chosen Ones.",
    icons: {
        icon: "/logo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className} antialiased`}>
                <StoreProvider>
                    <ApolloWrapper>
                        <Toaster />
                        {children}
                    </ApolloWrapper>
                </StoreProvider>
            </body>
        </html>
    );
}
