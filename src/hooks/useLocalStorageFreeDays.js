import { useCallback, useEffect, useMemo } from "react";
import { FREE_DAYS_KEY } from "../constants";

export const useLocalStorageFreeDays = () => {

    const freeDaysStored = JSON.parse(localStorage.getItem(FREE_DAYS_KEY))?.freeDays || [];
    const timestamp = JSON.parse(localStorage.getItem(FREE_DAYS_KEY))?.timestamp || undefined;

    const currentDate = useMemo(() => new Date(), []);
    const timestampDate = useMemo(() => timestamp ? new Date(timestamp) : undefined, [timestamp]);
    const januaryFirst = useMemo(() => new Date(currentDate.getFullYear(), 0, 1), [currentDate]);

    const setLocalStorageFreeDays = (freeDays) => {
        localStorage.setItem(FREE_DAYS_KEY, JSON.stringify({ freeDays, timestamp: new Date() }));
    }

    const getWeekOfTheYear = useCallback((date) => {
        const daysToNextMonday = (januaryFirst.getDay() === 1) ? 0 : (7 - januaryFirst.getDay()) % 7;
        const nextMonday = new Date(date.getFullYear(), 0, januaryFirst.getDate() + daysToNextMonday);

        return (date < nextMonday) ? 52 : (date > nextMonday ? Math.ceil((date - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
    }, [januaryFirst])

    // Deletes timestamp of previous weeks
    useEffect(() => {
        if (!timestampDate) {
            return;
        }

        if (getWeekOfTheYear(currentDate) !== getWeekOfTheYear(timestampDate)) {
            setLocalStorageFreeDays([])
        }

    }, [currentDate, getWeekOfTheYear, timestampDate])

    return { freeDaysStored, setLocalStorageFreeDays }
}