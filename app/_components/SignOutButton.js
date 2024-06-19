import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "../_utils/actions";

export default function SignOutButton() {
    function handleSignOut() {
        if (confirm("Are you sure you want to log out?")) signOutAction();
    }

    return (
        <form action={handleSignOut}>
            <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
                <span>Log Out</span>
            </button>
        </form>
    );
}
