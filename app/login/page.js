import { RedirectType, redirect } from "next/navigation";

import LoginButton from "../_components/LoginButton";
import { auth } from "../_utils/auth";

export const metadata = {
    title: "Login",
};

export default async function Page() {
    const session = await auth();

    if (session) redirect("/account", "replace");

    return (
        <div className="flex flex-col gap-10 mt-10 items-center">
            <h2 className="text-3xl font-semibold">
                Log in to access your guest area
            </h2>

            <LoginButton />
        </div>
    );
}
