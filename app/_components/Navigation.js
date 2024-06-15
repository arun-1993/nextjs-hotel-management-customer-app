import Link from "next/link";

import { auth } from "../_utils/auth";

export default async function Navigation() {
    const session = await auth();

    return (
        <nav className="z-10 text-xl">
            <ul className="flex gap-16 items-center">
                <li>
                    <Link
                        className="hover:text-accent-400 transition-colors"
                        href="/cabins"
                    >
                        Cabins
                    </Link>
                </li>
                <li>
                    <Link
                        className="hover:text-accent-400 transition-colors"
                        href="/about"
                    >
                        About
                    </Link>
                </li>
                <li>
                    {session?.user?.image ? (
                        <Link
                            className="hover:text-accent-400 transition-colors flex items-center gap-4"
                            href="/account"
                        >
                            <span>Account</span>
                            <img
                                className="h-8 rounded-full"
                                src={session.user.image}
                                alt={session.user.name}
                                referrerPolicy="no-referrer"
                            />
                        </Link>
                    ) : (
                        <Link
                            className="hover:text-accent-400 transition-colors"
                            href="/account"
                        >
                            Account
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
}
