/** Shared time slots for visit scheduling (must match ScheduleVisitForm) */
export const VISIT_TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
];

export const slotToMinutes = (slot) => {
  const [time, period] = slot.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (period === 'PM' && h < 12) h += 12;
  if (period === 'AM' && h === 12) h = 0;
  return h * 60 + m;
};

export const parseSlotToDate = (dateStr, slot) => {
  const { hours, minutes } = parseTimeStr(slot);
  const d = new Date(dateStr);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

export const parseTimeStr = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return { hours, minutes };
};

export function buildMonthAvailabilityRange(currentMonth) {
  const from = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const to = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0, 23, 59, 59, 999);
  return { from: from.toISOString(), to: to.toISOString() };
}

function intervalsOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

/**
 * Map backend busy appointments to unavailable start slots per date.
 * Also returns dates where every start slot is blocked.
 */
export function computeBusySlotMap(busySlots = [], timeSlots = VISIT_TIME_SLOTS) {
  const unavailableTimesPerDate = {};
  const fullyBlockedDates = new Set();
  const datesSeen = new Set();

  if (!busySlots.length) {
    return { unavailableTimesPerDate, fullyBlockedDates, busyDates: datesSeen };
  }

  const busyIntervals = busySlots
    .map((b) => ({
      start: new Date(b.startsAt),
      end: new Date(b.endsAt),
    }))
    .filter((b) => !Number.isNaN(b.start.getTime()) && !Number.isNaN(b.end.getTime()));


  busyIntervals.forEach(({ start, end }) => {
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    const lastDay = new Date(end);
    lastDay.setHours(0, 0, 0, 0);

    while (cursor <= lastDay) {
      const y = cursor.getFullYear();
      const m = cursor.getMonth();
      const d = cursor.getDate();
      datesSeen.add(`${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
      cursor.setDate(cursor.getDate() + 1);
    }
  });

  datesSeen.forEach((dateStr) => {
    const blocked = [];

    timeSlots.forEach((slot, index) => {
      const slotStart = parseSlotToDate(dateStr, slot);
      const nextSlot = timeSlots[index + 1];
      const slotEnd = nextSlot
        ? parseSlotToDate(dateStr, nextSlot)
        : new Date(slotStart.getTime() + 60 * 60 * 1000);

      const conflicts = busyIntervals.some((busy) =>
        intervalsOverlap(slotStart, slotEnd, busy.start, busy.end),
      );

      if (conflicts) {
        blocked.push(slot);
      }
    });

    if (blocked.length > 0) {
      unavailableTimesPerDate[dateStr] = blocked;
    }
    if (blocked.length === timeSlots.length) {
      fullyBlockedDates.add(dateStr);
    }
  });

  return { unavailableTimesPerDate, fullyBlockedDates, busyDates: datesSeen };
}

/** Whether [visitStart, visitEnd) overlaps any busy interval */
export function visitRangeConflicts(busySlots, visitStart, visitEnd) {
  const start = visitStart instanceof Date ? visitStart : new Date(visitStart);
  const end = visitEnd instanceof Date ? visitEnd : new Date(visitEnd);

  return (busySlots || []).some((b) => {
    const bStart = new Date(b.startsAt);
    const bEnd = new Date(b.endsAt);
    return intervalsOverlap(start, end, bStart, bEnd);
  });
}

/** End time slots that would overlap busy periods for a chosen start */
export function getBlockedEndSlots(busySlots, dateStr, startSlot, timeSlots = VISIT_TIME_SLOTS) {
  const startMinutes = slotToMinutes(startSlot);
  const blocked = [];

  timeSlots.forEach((slot) => {
    if (slotToMinutes(slot) <= startMinutes) return;

    const visitStart = parseSlotToDate(dateStr, startSlot);
    const visitEnd = parseSlotToDate(dateStr, slot);

    if (visitRangeConflicts(busySlots, visitStart, visitEnd)) {
      blocked.push(slot);
    }
  });

  return blocked;
}
