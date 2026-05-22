import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { X, Loader2, AlertCircle, CheckCircle2, ImagePlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSubmitReport } from '../hooks/useSubmitReport';
import {
  REPORT_CATEGORIES,
  REPORT_DESCRIPTION_MAX,
  REPORT_IMAGE_ACCEPT,
  REPORT_IMAGE_MAX_BYTES,
  REPORT_IMAGE_MIME_TYPES,
  REPORT_IMAGES_MAX,
} from '../constants';
import { getReportErrorMessage } from '../utils/reportErrors';
import { hasReportedTarget } from '../utils/reportStorage';

function validateImageFile(file) {
  if (!file) return 'Invalid file.';
  if (!REPORT_IMAGE_MIME_TYPES.includes(file.type)) {
    return 'Use a JPEG, PNG, WebP, or GIF image.';
  }
  if (file.size > REPORT_IMAGE_MAX_BYTES) {
    return 'Each image must be 10 MB or smaller.';
  }
  return '';
}

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  subjectName = 'this user',
}) {
  const [category, setCategory] = useState('');
  const [optionalNote, setOptionalNote] = useState('');
  const [evidenceFiles, setEvidenceFiles] = useState([]);
  const [evidencePreviews, setEvidencePreviews] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const submitReport = useSubmitReport();
  const alreadyReported =
    isOpen && hasReportedTarget(targetType, targetId);

  useEffect(() => {
    if (!isOpen) return;
    setCategory('');
    setOptionalNote('');
    setEvidenceFiles([]);
    setEvidencePreviews([]);
    setValidationError('');
    setSubmitError('');
    setSubmitted(false);
  }, [isOpen, targetId, targetType]);

  useEffect(() => {
    return () => {
      evidencePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [evidencePreviews]);

  if (!isOpen) return null;

  const validate = () => {
    if (!category) {
      return 'Please select an issue type.';
    }
    if (optionalNote.trim().length > REPORT_DESCRIPTION_MAX) {
      return `Notes must not exceed ${REPORT_DESCRIPTION_MAX} characters.`;
    }
    return '';
  };

  const handleAddImages = (e) => {
    setValidationError('');
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;

    const nextFiles = [...evidenceFiles];
    const nextPreviews = [...evidencePreviews];

    for (const file of incoming) {
      if (nextFiles.length >= REPORT_IMAGES_MAX) {
        setValidationError(`You can attach up to ${REPORT_IMAGES_MAX} images.`);
        break;
      }
      const fileError = validateImageFile(file);
      if (fileError) {
        setValidationError(fileError);
        continue;
      }
      nextFiles.push(file);
      nextPreviews.push(URL.createObjectURL(file));
    }

    setEvidenceFiles(nextFiles);
    setEvidencePreviews(nextPreviews);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(evidencePreviews[index]);
    setEvidenceFiles((prev) => prev.filter((_, i) => i !== index));
    setEvidencePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setValidationError('');

    if (alreadyReported || submitted) return;

    const validationMsg = validate();
    if (validationMsg) {
      setValidationError(validationMsg);
      return;
    }

    const selected = REPORT_CATEGORIES.find((c) => c.value === category);

    try {
      await submitReport.mutateAsync({
        targetType,
        targetId,
        category: selected?.label || category,
        categoryLabel: selected?.label || category,
        optionalNote: optionalNote.trim(),
        imageFiles: evidenceFiles,
      });
      setSubmitted(true);
    } catch (error) {
      if (error?.response?.status === 401) {
        onClose();
        navigate('/login', { state: { from: location } });
        return;
      }
      setSubmitError(getReportErrorMessage(error));
    }
  };

  const isPending = submitReport.isPending;
  const isDisabled = isPending || alreadyReported || submitted;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="w-full max-w-lg bg-card rounded-t-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out border-t border-border/40 pb-10 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 id="report-modal-title" className="text-2xl font-bold mb-1">
              Report Owner
            </h2>
            <p className="text-muted-foreground text-sm">
              Report {subjectName}. You may attach photos as evidence. Reports are reviewed by our team.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 size={32} />
            </div>
            <p className="font-semibold text-foreground">Report submitted</p>
            <p className="text-sm text-muted-foreground max-w-sm">
              Thank you. We have received your report and will review it shortly.
            </p>
            <Button type="button" className="mt-2 w-full" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {alreadyReported && (
              <div className="flex gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <p>You have already submitted a report for this owner in this session.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-muted-foreground">
                Issue type
              </label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={isDisabled}
              >
                <SelectTrigger className="w-full h-11 rounded-xl">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_CATEGORIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-muted-foreground">
                Evidence <span className="font-normal normal-case">(optional)</span>
              </label>
              <p className="text-xs text-muted-foreground mb-3">
                Upload screenshots or photos to support your report (up to {REPORT_IMAGES_MAX} images, 10 MB each).
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={REPORT_IMAGE_ACCEPT}
                multiple
                className="hidden"
                disabled={isDisabled || evidenceFiles.length >= REPORT_IMAGES_MAX}
                onChange={handleAddImages}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl font-semibold"
                disabled={isDisabled || evidenceFiles.length >= REPORT_IMAGES_MAX}
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus className="mr-2 size-4" />
                {evidenceFiles.length > 0
                  ? `Add more images (${evidenceFiles.length}/${REPORT_IMAGES_MAX})`
                  : 'Add images'}
              </Button>

              {evidencePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {evidencePreviews.map((url, index) => (
                    <div
                      key={url}
                      className="relative aspect-square overflow-hidden rounded-lg border border-border/60 bg-muted/30"
                    >
                      <img
                        src={url}
                        alt={`Evidence ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                        aria-label="Remove image"
                        onClick={() => removeImage(index)}
                        disabled={isDisabled}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-muted-foreground">
                Additional notes <span className="font-normal normal-case">(optional)</span>
              </label>
              <Textarea
                placeholder="Add any extra context (optional)..."
                className="min-h-[80px] rounded-2xl p-4 bg-muted/30 border-border/40"
                value={optionalNote}
                onChange={(e) => setOptionalNote(e.target.value)}
                disabled={isDisabled}
                maxLength={REPORT_DESCRIPTION_MAX}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {optionalNote.trim().length}/{REPORT_DESCRIPTION_MAX} characters
              </p>
            </div>

            {(validationError || submitError) && (
              <div
                className="flex gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <p>{validationError || submitError}</p>
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                className="flex-1 py-5 rounded-xl font-bold"
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 py-5 rounded-xl font-bold"
                disabled={isDisabled}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Report'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
