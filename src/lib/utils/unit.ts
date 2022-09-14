/**
 * Returns the stored time value in seconds since midnight, January 1, 1970 UTC.
 * @param date Date value
 * @returns unixtime string
 */
export function dateToUnixTimeSeconds(date?: Date): string {
  return date !== undefined ? (date.getTime() / 1000).toFixed(0) : '';
}
