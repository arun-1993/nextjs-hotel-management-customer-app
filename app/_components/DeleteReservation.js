"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { Fragment, useTransition } from "react";

import { deleteReservationAction } from "../_utils/actions";
import SpinnerMini from "./SpinnerMini";

export default function DeleteReservation({ bookingId }) {
    const [pending, startTransition] = useTransition();

    function handleDelete() {
        if (confirm("Are you sure you want to delete this reservation?")) {
            startTransition(() => deleteReservationAction(bookingId));
        }
    }

    return (
        <button
            className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            onClick={handleDelete}
        >
            {!pending ? (
                <Fragment>
                    <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
                    <span className="mt-1">Delete</span>
                </Fragment>
            ) : (
                <span className="mx-auto">
                    <SpinnerMini />
                </span>
            )}
        </button>
    );
}
