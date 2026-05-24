import { REPORT_DESCRIPTION_MAX, REPORT_DESCRIPTION_MIN } from '../constants';

/**
 * Backend requires `description` (10–2000 chars). Build a valid string from
 * category + optional note + whether evidence images were attached.
 */
export function buildReportDescription(categoryLabel, optionalNote = '', hasImages = false) {
  const note = optionalNote.trim();
  if (note.length >= REPORT_DESCRIPTION_MIN) {
    return note.slice(0, REPORT_DESCRIPTION_MAX);
  }

  let text = `Report category: ${categoryLabel}.`;
  if (hasImages) {
    text += ' Supporting evidence images are attached.';
  }
  if (note.length > 0) {
    text += ` Additional note: ${note}`;
  } else if (!hasImages) {
    text += ' No additional written details were provided.';
  }

  if (text.length < REPORT_DESCRIPTION_MIN) {
    text = `${text}`.padEnd(REPORT_DESCRIPTION_MIN, '.');
  }

  return text.slice(0, REPORT_DESCRIPTION_MAX);
}
