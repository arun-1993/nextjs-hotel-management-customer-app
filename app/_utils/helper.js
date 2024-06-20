import { formatDistance, isWithinInterval, parseISO } from "date-fns";

export const formatDistanceFromNow = (dateStr) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    }).replace("about ", "");

export const isAlreadyBooked = (range, datesArr) =>
    range.from &&
    range.to &&
    datesArr.some((date) =>
        isWithinInterval(date, { start: range?.from, end: range?.to }),
    );
