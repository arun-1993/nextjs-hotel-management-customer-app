import bg from "@/public/bg.png";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className="mt-24">
            <Image
                className="object-cover object-top"
                src={bg}
                fill={true}
                placeholder="blur"
                alt="Mountains and forests with two cabins"
            />

            <div className="relative z-10 text-center">
                <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                    Welcome to paradise.
                </h1>
                <Link
                    href="/cabins"
                    className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                    Explore luxury cabins
                </Link>
            </div>
        </main>
    );
}
