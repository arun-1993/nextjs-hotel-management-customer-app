"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FilterButton from "./FilterButton";

export default function Filter() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentFilter = searchParams.get("capacity") ?? "all";

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="border border-primary-800 flex">
            <span className="px-5 py-2">Filter cabins by size:</span>

            <FilterButton
                filter="all"
                handleFilter={handleFilter}
                currentFilter={currentFilter}
            >
                All
            </FilterButton>

            <FilterButton
                filter="small"
                handleFilter={handleFilter}
                currentFilter={currentFilter}
            >
                Small (1-3 guests)
            </FilterButton>

            <FilterButton
                filter="medium"
                handleFilter={handleFilter}
                currentFilter={currentFilter}
            >
                Medium (4-7 guests)
            </FilterButton>

            <FilterButton
                filter="large"
                handleFilter={handleFilter}
                currentFilter={currentFilter}
            >
                Large (8-12 guests)
            </FilterButton>
        </div>
    );
}
