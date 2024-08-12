export function ShowTime(timeString: string) {
  if (!timeString) return ""; // Return empty string if timeString is null or undefined

  // Split the time string into hours, minutes, and seconds
  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Create a Date object to handle conversion to AM/PM format
  const date = new Date(0, 0, 0, hours, minutes, seconds);

  // Extract hours, minutes, and AM/PM from the Date object
  let hours12 = date.getHours();
  const minutesStr = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours12 >= 12 ? "م" : "ص";

  // Convert hours to 12-hour format
  hours12 %= 12;
  hours12 = hours12 || 12; // Handle midnight (0 hours)

  // Format the time string in AM/PM format
  const timeInAmPm = `${hours12}:${minutesStr} ${ampm}`;

  return timeInAmPm;
}
