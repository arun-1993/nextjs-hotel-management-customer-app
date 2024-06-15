import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";

import { supabase } from "./supabase";

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

export const getCabins = async function () {
    const { data, error } = await supabase
        .from("cabins")
        .select("id, name, maxCapacity, regularPrice, discount, image")
        .order("name");

    if (error) {
        throw new Error("Cabins could not be loaded");
    }

    return data;
};

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
