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
        console.error(error);
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
        console.error(error);
        notFound();
    }

    return data;
}
