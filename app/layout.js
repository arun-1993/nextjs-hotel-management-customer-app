import "@/app/_styles/globals.css";

export const metadata = {
    title: {
        template: "%s | The Wild Oasis",
        default: "Welcome | The Wild Oasis",
    },
    description:
        "A luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and lush green forests",
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
