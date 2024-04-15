
export const getDaysUntilPayment = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    currentDate.setHours(0);
    currentDate.setMinutes(0);

    const nextMonthDate = new Date(`${month + 2}/01/${year}`);
    const isSaturday = nextMonthDate.getDay() === 6;
    const isSunday = nextMonthDate.getDay() === 0;

    const differenceInTime = nextMonthDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

    const days = () => {
        if (isSaturday) {
            return differenceInDays + 2;
        }
        if (isSunday) {
            return differenceInDays + 1;
        }
        return differenceInDays;
    }

    return days();
}