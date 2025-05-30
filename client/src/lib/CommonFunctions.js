export const makeDateTimeReadable = (DateTime = "") => {
    // Convert ISO string to Date object
    const date = new Date(DateTime);

    // Format the date to a more readable format
    const readableDate = date.toLocaleString("en-US", {
        year: "numeric", // Four-digit year
        month: "long",   // Full name of the month
        day: "numeric",  // Numeric day
        hour: "2-digit", // Hour in 12-hour format
        minute: "2-digit", // Minutes
        second: "2-digit", // Seconds
    });

    return readableDate;
}