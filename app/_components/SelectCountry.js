import { getCountries } from "../_utils/data-service";

export default async function SelectCountry({
    defaultCountry,
    name,
    id,
    className,
}) {
    const countries = await getCountries();
    const flag =
        countries.find((country) => country.name === defaultCountry)?.flag ??
        "";

    return (
        <select
            className={className}
            id={id}
            name={name}
            defaultValue={`${defaultCountry}%${flag}`}
        >
            <option value="">Select country...</option>
            {countries.map((c) => (
                <option key={c.name} value={`${c.name}%${c.flag}`}>
                    {c.name}
                </option>
            ))}
        </select>
    );
}
