import "@/app/_styles/globals.css";

export const metadata = {
    title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-primary-950 text-primary-100 min-h-screen">
                {children}
            </body>
        </html>
    );
}
