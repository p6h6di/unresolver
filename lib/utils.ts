import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import locale from "date-fns/locale/en-US";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
};

/**
 * Formats a distance string based on the provided token, count, and options.
 *
 * @param {string} token - The token to be used for formatting.
 * @param {number} count - The count to be inserted into the formatted string.
 * @param {Object} [options] - Optional parameters for formatting.
 * @param {boolean} [options.addSuffix] - Whether to add a suffix to the formatted string.
 * @param {number} [options.comparison] - If addSuffix is true, determines whether the suffix is "in" (for positive values) or "ago" (for non-positive values).
 * @returns {string} The formatted distance string.
 */

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result + " ago";
    }
  }

  return result;
}

/**
 * Formats the given date to a string representing the time distance to now.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} - The formatted string representing the time distance to now.
 */

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}
