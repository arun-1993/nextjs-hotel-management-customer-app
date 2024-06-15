import { auth } from "../_utils/auth";
import { getBookedDatesByCabinId, getSettings } from "../_utils/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

export default async function Reservation({ cabin }) {
    const session = await auth();
    const [bookedDates, settings] = await Promise.all([
        getBookedDatesByCabinId(cabin.id),
        getSettings(),
    ]);

    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400]">
            <DateSelector
                bookedDates={bookedDates}
                cabin={cabin}
                settings={settings}
            />
            {session?.user ? (
                <ReservationForm cabin={cabin} user={session.user} />
            ) : (
                <LoginMessage />
            )}
        </div>
    );
}
