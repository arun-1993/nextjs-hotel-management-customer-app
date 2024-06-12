"use client";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function Error({ error, reset }) {
    return (
        <main className="flex justify-center items-center flex-col gap-6">
            <h1 className="text-3xl font-semibold">Something went wrong!</h1>
            <p className="text-lg">{error.message}</p>

            <button
                className="flex gap-3 items-center bg-accent-500 text-primary-800 px-6 py-3 text-lg"
                onClick={reset}
            >
                <span className="text-lg">Try again</span>
                <ArrowPathIcon className="h-5 w-5" />
            </button>
        </main>
    );
}
