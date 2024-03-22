declare global {
  interface Date {
    formatDate(): string;
  }
}

Date.prototype.formatDate = function () {
  const dayOfWeek = dayNames[this.getDay()];
  const dayOfMonth = this.getDate();
  const month = monthNames[this.getMonth()];
  const hours = this.getHours();
  const minutes = this.getMinutes();

  const paddedDayOfMonth = (dayOfMonth < 10 ? "0" : "") + dayOfMonth;
  const paddedHours = (hours < 10 ? "0" : "") + hours;
  const paddedMinutes = (minutes < 10 ? "0" : "") + minutes;

  return `${dayOfWeek} ${paddedDayOfMonth} ${month} ${paddedHours}:${paddedMinutes}`;
};

export {};

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
