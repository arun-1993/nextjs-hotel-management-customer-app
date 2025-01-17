"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { auth, signIn, signOut } from "./auth";
import {
    createBooking,
    deleteBooking,
    getBooking,
    updateBooking,
    updateGuest,
} from "./data-service";

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

export async function updateReservationAction(formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const id = Number(formData.get("bookingId"));
    const numGuests = Number(formData.get("numGuests"));
    const notes = formData.get("notes").slice(0, 1000);

    const booking = await getBooking(id);

    if (booking.guestId !== session.user.id)
        throw new Error("You are not allowed to update this booking");

    if (numGuests > booking.cabins.maxCapacity)
        throw new Error("Number of guests cannot exceed maximum capacity");

    await updateBooking(id, { numGuests, notes });

    revalidatePath("/account/reservations");
    revalidatePath(`/account/reservations/edit/${id}`);
    redirect("/account/reservations");
}

export async function createReservationAction(bookingData, formData) {
    const session = await auth();

    if (!session) throw new Error("You must be logged in");

    const newBooking = {
        ...bookingData,
        guestId: session.user.id,
        numGuests: Number(formData.get("numGuests")),
        notes: formData.get("notes").slice(0, 1000),
        totalPrice: bookingData.cabinPrice,
    };

    await createBooking(newBooking);

    revalidatePath(`/cabins/${bookingData.cabinId}`);
    revalidatePath("/account/reservations");
    redirect("/thankyou");
}
