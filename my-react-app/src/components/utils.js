import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
    month = Math.floor(month);
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let counter = 0;

    const daysMatrix = new Array(6).fill([]).map((row, rowIndex) => {
        return new Array(7).fill(null).map(() => {
            if (rowIndex === 0) {
                return daysOfWeek[counter++];
            } else {
                currentMonthCount++;
                return dayjs(new Date(year, month, currentMonthCount));
            }
        });
    });
    return daysMatrix;
}
