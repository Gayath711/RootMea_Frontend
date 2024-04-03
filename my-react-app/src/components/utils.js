import dayjs from "dayjs";

export function getMonth(date = dayjs()) {
  const currDate = dayjs(date);
  const month = Math.floor(currDate.month());
  const year = currDate.year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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

export function getWeek(date = dayjs()) {
  let startOfWeek = date.startOf("week");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let counter = 0;

  const daysMatrix = new Array(1).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      return startOfWeek.add(counter++, "day");
    });
  });
  daysMatrix.unshift(daysOfWeek);
  return daysMatrix;
}

export function getYearMonths(date = dayjs()) {
  let year = dayjs(date).year();
  const months = [];
  for (let month = 0; month < 12; month++) {
    months.push(dayjs(new Date(year, month, 1)));
  }
  return months;
}

/*
const year = 2024; // or omit this argument to use the current year
const yearMonths = getYearMonths(year);
console.log(yearMonths);
// Output: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
 */

export function getTodayTime() {
  const today = dayjs().startOf("day");
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    times.push(today.add(hour, "hour"));
  }
  return times;
}
