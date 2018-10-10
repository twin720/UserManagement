import { getLocale } from "../localization";

export const getFormattedDateTimeString = (date: Date, showTime: boolean = true, showDate: boolean = true): string => {
    const locale = getLocale();
    const twoDigit = "2-digit";

    const dateOptions = {
        year: "numeric",
        month: twoDigit,
        day: twoDigit,
    };

    const timeOptions = {
        hour: twoDigit,
        minute: twoDigit,
        second: twoDigit,
    };

    let datePart = showDate ? date.toLocaleDateString(locale, dateOptions) : "";
    let timePart = showTime ? date.toLocaleTimeString(locale, timeOptions) : "";

    return `${datePart} ${timePart}`;
}
