import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";

import { supabase } from "./supabase";

// Create Functions

export async function createGuest(newGuest) {
    const { data, error } = await supabase.from("guests").insert([newGuest]);

    if (error) {
        throw new Error("Guest could not be created");
    }

    return data;
}

// Read Functions

export async function getBookedDatesByCabinId(cabinId) {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today = today.toISOString();

    const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("cabinId", cabinId)
        .or(`startDate.gte.${today},status.eq.checked-in`);

    if (error) {
        throw new Error("Bookings could not get loaded");
    }

    const bookedDates = data
        .map((booking) => {
            return eachDayOfInterval({
                start: new Date(booking.startDate),
                end: new Date(booking.endDate),
            });
        })
        .flat();

    return bookedDates;
}

export async function getBookings(guestId) {
    const { data, error } = await supabase
        .from("bookings")
        .select(
            "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
        )
        .eq("guestId", guestId)
        .order("startDate");

    if (error) {
        throw new Error("Bookings could not get loaded");
    }

    return data;
}

export async function getCabin(id) {
    const { data, error } = await supabase
        .from("cabins")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        notFound();
    }

    return data;
}

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("id, name, maxCapacity, regularPrice, discount, image")
        .order("name");

    if (error) {
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function getCountries() {
    try {
        const response = await fetch(
            "https://countriesnow.space/api/v0.1/countries/flag/images",
        );
        const countries = await response.json();
        return countries.data;
    } catch {
        throw new Error("Could not fetch countries");
    }
}

export async function getGuest(email) {
    const { data, error } = await supabase
        .from("guests")
        .select("*")
        .eq("email", email)
        .single();

    if (error) {
        throw new Error("Guest could not be loaded");
    }

    return data;
}

export async function getSettings() {
    const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();

    if (error) {
        throw new Error("Settings could not be loaded");
    }

    return data;
}

// Update Functions

export async function updateGuest(id, updatedFields) {
    const { data, error } = await supabase
        .from("guests")
        .update(updatedFields)
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error("Guest could not be updated");
    }

    return data;
}

// Delete Functions
