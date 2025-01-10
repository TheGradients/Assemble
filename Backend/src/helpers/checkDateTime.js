import { DateTime } from "luxon";

const check24HourFormat = (time) => {
    const parsedTime = DateTime.fromFormat(time, "HH:mm");
    if (!parsedTime.isValid) {
        return false;
    }
    return true;
};

const checkDateFormat = (date) => {
    const parsedDate = DateTime.fromFormat(date, "yyyy-MM-dd");
    if (!parsedDate.isValid) {
        return false;
    }
    return true;
}

export {
    check24HourFormat,
    checkDateFormat,
};