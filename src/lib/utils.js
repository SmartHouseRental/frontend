import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path) {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('data:')) return path;

  // The base API URL might be /api/v1, so we remove the pathname to get the base server URL
  const baseUrl = import.meta.env.VITE_API_URL || 'https://smarthouserental.onrender.com/api/v1';
  let serverUrl = baseUrl;
  try {
    const urlObj = new URL(baseUrl);
    serverUrl = urlObj.origin; // e.g., 'https://smarthouserental.onrender.com'
  } catch (err) {
    serverUrl = baseUrl.replace(/\/api\/v1\/?$/, '');
  }

  return `${serverUrl}${path.startsWith('/') ? '' : '/'}${path}`;
}

