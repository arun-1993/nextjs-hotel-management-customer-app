import { FaceFrownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="text-center space-y-6 mt-4">
            <h1 className="text-3xl font-semibold flex gap-3 items-center justify-center">
                <span className="pt-2">This page could not be found</span>
                <FaceFrownIcon className="h-8 w-8" />
            </h1>

            <Link
                href="/"
                className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
            >
                Go back home
            </Link>
        </main>
    );
}
