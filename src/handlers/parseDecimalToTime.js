
export const parseDecimalToTime = (decimal) => {
    const date = new Date(0, 0);
    date.setSeconds(decimal * 60 * 60);
    return date.toTimeString().slice(0, 5);
}