import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

export const metadata = {
    title: {
        template: "%s | The Wild Oasis",
        default: "Welcome | The Wild Oasis",
    },
    description:
        "A luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and lush green forests",
};

const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});

const today = new Date();

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
            >
                <Header />
                <div className="flex-1 px-8 py-12">
                    <main className="max-w-7xl mx-auto">{children}</main>
                </div>
            </body>
        </html>
    );
}
