
export const parseDecimalToTime = (decimal) => {

    let decimalTime = parseFloat(decimal);
    decimalTime = decimalTime * 60 * 60;

    let hours = Math.floor((decimalTime / (60 * 60)));
    decimalTime = decimalTime - (hours * 60 * 60);

    let minutes = Math.floor((decimalTime / 60));
    decimalTime = decimalTime - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`
}