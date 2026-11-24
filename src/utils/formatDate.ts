/** Parses a "YYYY-MM-DD" string as a local date (new Date("YYYY-MM-DD") would treat it as UTC). */
export function parseDate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parseDate(date));
}
