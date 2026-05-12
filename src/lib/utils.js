import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Parses a WKT POINT string into an object with lat and lng.
 * Example: "POINT(38.7578 9.0300)" -> { lng: 38.7578, lat: 9.0300 }
 * @param {string} locationStr 
 * @returns {{lat: number, lng: number} | null}
 */
export function parseLocation(locationStr) {
  if (!locationStr || typeof locationStr !== 'string') return null;
  
  const match = locationStr.match(/POINT\(([-\d.]+) ([-\d.]+)\)/i);
  if (match) {
    return {
      lng: parseFloat(match[1]),
      lat: parseFloat(match[2]),
    };
  }
  return null;
}
