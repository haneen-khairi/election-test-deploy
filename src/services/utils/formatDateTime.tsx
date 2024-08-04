/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatDateTime = (
  dateString?: any,
  timeString?: string,
  isDateObject?: boolean,
): string => {
  if (!dateString || !timeString) return "---";
  let date;

  if (isDateObject) {
    date = dateString as any;
  } else {
    date = new Date(`${dateString}T${timeString}`);
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const day = date.getDate();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? "م" : "ص";

  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${ampm} ${hours}:${formattedMinutes}`;
  const formattedDate = `${year} / ${month} / ${day}`;

  return `${formattedTime} | ${formattedDate}`;
};
