"use client";

import { updateProfileAction } from "../_utils/actions";
import UpdateButton from "./UpdateButton";

export default function UpdateProfileForm({ guest, children }) {
    const { fullName, email, nationalID, countryFlag } = guest;

    return (
        <form
            className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
            action={updateProfileAction}
        >
            <div className="space-y-2">
                <label>Full name</label>
                <input
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    name="fullName"
                    defaultValue={fullName}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <label>Email address</label>
                <input
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
                    name="email"
                    defaultValue={email}
                    disabled
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label htmlFor="nationality">Where are you from?</label>
                    <img
                        src={countryFlag}
                        alt="Country flag"
                        className="h-5 rounded-sm"
                    />
                </div>
                {children}
            </div>

            <div className="space-y-2">
                <label htmlFor="nationalID">National ID number</label>
                <input
                    className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                    name="nationalID"
                    defaultValue={nationalID}
                />
            </div>

            <div className="flex justify-end items-center gap-6">
                <UpdateButton />
            </div>
        </form>
    );
}