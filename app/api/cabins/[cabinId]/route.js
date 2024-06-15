import { getBookedDatesByCabinId, getCabin } from "@/app/_utils/data-service";

export async function GET(request, { params: { cabinId } }) {
    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId),
        ]);

        return Response.json({ cabin, bookedDates });
    } catch (error) {
        return Response.json({ error: "Cabin not found" });
    }
}
