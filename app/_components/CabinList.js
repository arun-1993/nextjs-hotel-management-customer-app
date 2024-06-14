import { getCabins } from "../_utils/data-service";
import CabinCard from "./CabinCard";

function cabinFilter(cabins, filter) {
    switch (filter) {
        case "small":
            return cabins.filter((cabin) => cabin.maxCapacity <= 3);
        case "medium":
            return cabins.filter(
                (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8,
            );
        case "large":
            return cabins.filter((cabin) => cabin.maxCapacity >= 8);
        default:
            return cabins;
    }
}

export default async function CabinList({ filter }) {
    const cabins = await getCabins();

    if (!cabins.length) return null;

    const filteredCabins = cabinFilter(cabins, filter);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    );
}
