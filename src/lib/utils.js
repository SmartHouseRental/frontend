import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const POPULAR_AREAS = [
  { name: 'Bole Atlas', lat: 9.0194, lng: 38.7839 },
  { name: 'Old Airport', lat: 8.9900, lng: 38.7250 },
  { name: 'Sarbet', lat: 8.9950, lng: 38.7300 },
  { name: 'Kazanchis', lat: 9.0191, lng: 38.7663 },
  { name: 'Bole', lat: 9.0000, lng: 38.7833 },
  { name: 'CMC', lat: 9.0250, lng: 38.8300 },
  { name: 'Ayat', lat: 9.0200, lng: 38.8500 },
  { name: 'Piassa', lat: 9.0345, lng: 38.7525 },
  { name: 'Megenagna', lat: 9.0210, lng: 38.8010 },
];

export function parseLocation(locationStr) {
  if (!locationStr) return null;
  
  if (typeof locationStr === 'object') {
    const lat = parseFloat(locationStr.lat || locationStr.latitude);
    const lng = parseFloat(locationStr.lng || locationStr.longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      return { lat, lng };
    }
  }

  if (typeof locationStr !== 'string') return null;
  
  // 1. Match POINT(lng lat)
  const pointMatch = locationStr.match(/POINT\(([-\d.]+) ([-\d.]+)\)/i);
  if (pointMatch) {
    return {
      lng: parseFloat(pointMatch[1]),
      lat: parseFloat(pointMatch[2]),
    };
  }
  
  // 2. Try to match any two decimal numbers in the string
  const numbers = locationStr.match(/([-\d.]+)/g);
  if (numbers && numbers.length >= 2) {
    const num1 = parseFloat(numbers[0]);
    const num2 = parseFloat(numbers[1]);
    if (!isNaN(num1) && !isNaN(num2)) {
      // Determine which is lat and which is lng
      // In Addis Ababa, Lat is around 9.0, Lng is around 38.7
      if (Math.abs(num1) < Math.abs(num2)) {
        return { lat: num1, lng: num2 };
      } else {
        return { lat: num2, lng: num1 };
      }
    }
  }

  // 3. Match against popular areas in Addis Ababa
  const normalized = locationStr.toLowerCase();
  for (const area of POPULAR_AREAS) {
    if (normalized.includes(area.name.toLowerCase())) {
      return { lat: area.lat, lng: area.lng };
    }
  }
  
  return null;
}
