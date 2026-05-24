import { getLocalizedText } from '@/lib/utils/i18n';

export const STATUS_LABELS = {
  PENDING: 'Pending',
  ACCEPTED: 'Confirmed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
};

export const STATUS_STYLES = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  ACCEPTED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  REJECTED: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
  CANCELLED: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
};

export function formatAppointmentDateTime(startsAt, endsAt) {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const date = start.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const time = `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} – ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  return { date, time, start, end };
}

export function getRenterDisplayName(renter) {
  if (!renter) return 'Unknown renter';
  const name = [renter.first_name, renter.last_name].filter(Boolean).join(' ');
  return name || renter.email || 'Renter';
}

export function getRenterInitials(renter) {
  const name = getRenterDisplayName(renter);
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function getPropertyImage(property, lang = 'en') {
  const images = property?.images;
  if (!images?.length) return null;
  const first = images[0];
  return typeof first === 'string' ? first : first?.url ?? null;
}

export function normalizeAppointment(raw, lang = 'en') {
  const { date, time } = formatAppointmentDateTime(raw.startsAt, raw.endsAt);
  return {
    ...raw,
    renterName: getRenterDisplayName(raw.renter),
    renterInitials: getRenterInitials(raw.renter),
    renterEmail: raw.renter?.email ?? '',
    renterPhone: raw.renter?.phone ?? '',
    propertyTitle: getLocalizedText(raw.property?.title, lang) || 'Property',
    propertyAddress: getLocalizedText(raw.property?.address, lang) || '',
    propertyImage: getPropertyImage(raw.property, lang),
    displayDate: date,
    displayTime: time,
    statusLabel: STATUS_LABELS[raw.status] ?? raw.status,
    isPast: new Date(raw.endsAt) < new Date(),
    isUpcoming:
      raw.status === 'PENDING' ||
      (raw.status === 'ACCEPTED' && new Date(raw.endsAt) >= new Date()),
  };
}

/** Map "09:00 AM" + ISO date → { startsAt, endsAt } (1-hour slot, local time). */
export function slotToIsoRange(dateStr, slotLabel) {
  const match = slotLabel.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) throw new Error('Invalid time slot');

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();

  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;

  const [y, m, d] = dateStr.split('-').map(Number);
  const startsAt = new Date(y, m - 1, d, hours, minutes, 0, 0);
  const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);

  return {
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
  };
}

export function unwrapAppointments(response) {
  const list = response?.data?.appointments;
  return Array.isArray(list) ? list : [];
}

export function unwrapAppointment(response) {
  return response?.data?.appointment ?? null;
}
