export default function FilterButton({
    filter,
    handleFilter,
    currentFilter,
    children,
}) {
    return (
        <button
            type="button"
            className={`px-5 py-2 hover:bg-primary-700 ${filter === currentFilter ? "bg-primary-700 text-primary-50" : ""}`}
            onClick={() => handleFilter(filter)}
        >
            {children}
        </button>
    );
}
