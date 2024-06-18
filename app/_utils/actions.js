"use server";

import { revalidatePath } from "next/cache";

import { auth, signIn, signOut } from "./auth";
import { deleteBooking, getBooking, updateGuest } from "./data-service";

export async function signInAction() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
    await signOut({ redirectTo: "/" });
}

export async function updateProfileAction(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const nationalID = formData.get("nationalID");
    const [nationality, countryFlag] = formData.get("nationality").split("%");

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
        throw new Error("Please provide a valid national ID");

    const updateData = { nationalID, nationality, countryFlag };

    await updateGuest(session.user.id, updateData);

    revalidatePath("/account/profile");
}

export async function deleteReservationAction(id) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const booking = await getBooking(id);

    if (booking.guestId !== session.user.id)
        throw new Error("You are not allowed to delete this booking");

    await deleteBooking(id);

    revalidatePath("/account/reservations");
}
