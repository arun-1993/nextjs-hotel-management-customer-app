import SubmitButton from "@/app/_components/SubmitButton";
import { updateReservationAction } from "@/app/_utils/actions";
import { auth } from "@/app/_utils/auth";
import { getBooking } from "@/app/_utils/data-service";

export default async function Page({ params: { reservationId } }) {
    const session = await auth();
    const booking = await getBooking(reservationId);

    const {
        id,
        numGuests,
        notes,
        guestId,
        cabins: { maxCapacity },
    } = booking;

    console.log(session);
    console.log(booking);

    if (session.user.id !== guestId)
        throw new Error("Booking could not be loaded");

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{reservationId}
            </h2>

            <form
                className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
                action={updateReservationAction}
            >
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        name="numGuests"
                        id="numGuests"
                        defaultValue={numGuests}
                        required
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from(
                            { length: maxCapacity },
                            (_, i) => i + 1,
                        ).map((x) => (
                            <option
                                value={x}
                                key={x}
                                // selected={numGuests === x}
                            >
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label htmlFor="notes">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        name="notes"
                        defaultValue={notes}
                        maxLength={1000}
                    />
                </div>

                <input type="hidden" name="bookingId" value={id} />

                <div className="flex justify-end items-center gap-6">
                    <SubmitButton
                        buttonText="Update Reservation"
                        busyText="Updating..."
                    />
                </div>
            </form>
        </div>
    );
}