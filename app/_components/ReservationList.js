"use client";

import { useOptimistic } from "react";

import { deleteReservationAction } from "../_utils/actions";
import ReservationCard from "./ReservationCard";

export default function ReservationList({ bookings }) {
    const [optimisticBookings, optimisticDelete] = useOptimistic(
        bookings,
        (bookings, bookingId) =>
            bookings.filter((booking) => booking.id !== bookingId),
    );

    async function handleDelete(bookingId) {
        optimisticDelete(bookingId);
        await deleteReservationAction(bookingId);
    }

    return (
        <ul className="space-y-6">
            {optimisticBookings.map((booking) => (
                <ReservationCard
                    key={booking.id}
                    booking={booking}
                    onDelete={handleDelete}
                />
            ))}
        </ul>
    );
}
