"use client";

import { differenceInDays, isPast, isSameDay } from "date-fns";
import { Fragment } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { useReservation } from "../_context/Reservation";
import { isAlreadyBooked } from "../_utils/helper";

export default function DateSelector({ bookedDates, cabin, settings }) {
    const { range, setRange, resetRange } = useReservation();

    const displayRange = isAlreadyBooked(range, bookedDates)
        ? { from: undefined, to: undefined }
        : range;

    const { regularPrice, discount } = cabin;
    const { minBookingLength, maxBookingLength } = settings;
    const numNights = differenceInDays(displayRange?.to, displayRange?.from);
    const cabinPrice = numNights * (regularPrice - discount);

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="pt-12 place-self-center"
                mode="range"
                min={minBookingLength + 1}
                max={maxBookingLength}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 5}
                captionLayout="dropdown"
                numberOfMonths={2}
                onSelect={setRange}
                selected={displayRange}
                disabled={(currentDate) =>
                    isPast(currentDate) ||
                    bookedDates.some((date) => isSameDay(date, currentDate))
                }
            />

            <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
                <div className="flex items-baseline gap-6">
                    <p className="flex gap-2 items-baseline">
                        {discount > 0 ? (
                            <>
                                <span className="text-2xl">
                                    ${regularPrice - discount}
                                </span>
                                <span className="line-through font-semibold text-primary-700">
                                    ${regularPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl">${regularPrice}</span>
                        )}
                        <span className="">/night</span>
                    </p>
                    {numNights ? (
                        <Fragment>
                            <p className="bg-accent-600 px-3 py-2 text-2xl">
                                <span>&times;</span> <span>{numNights}</span>
                            </p>

                            <p>
                                <span className="text-lg font-bold uppercase">
                                    Total
                                </span>{" "}
                                <span className="text-2xl font-semibold">
                                    ${cabinPrice}
                                </span>
                            </p>
                        </Fragment>
                    ) : null}
                </div>

                {range?.from || range?.to ? (
                    <button
                        className="border border-primary-800 py-2 px-4 text-sm font-semibold"
                        onClick={resetRange}
                    >
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}
