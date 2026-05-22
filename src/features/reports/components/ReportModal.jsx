import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  REPORT_DESCRIPTION_MIN,
  REPORT_DESCRIPTION_MAX,
} from '../constants';
import { getReportErrorMessage } from '../utils/reportErrors';
import { hasReportedTarget } from '../utils/reportStorage';

export default function ReportModal({
  isOpen,
  onClose,
  targetType,
  targetId,
  subjectName = 'this user',
}) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const submitReport = useSubmitReport();
  const alreadyReported =
    isOpen && hasReportedTarget(targetType, targetId);

  useEffect(() => {
    if (!isOpen) return;
    setCategory('');
    setDescription('');
    setValidationError('');
    setSubmitError('');
    setSubmitted(false);
  }, [isOpen, targetId, targetType]);

  if (!isOpen) return null;

  const validate = () => {
    if (!category) {
      return 'Please select a reason for your report.';
    }
    const trimmed = description.trim();
    if (trimmed.length < REPORT_DESCRIPTION_MIN) {
      return `Please provide at least ${REPORT_DESCRIPTION_MIN} characters describing the issue.`;
    }
    if (trimmed.length > REPORT_DESCRIPTION_MAX) {
      return `Description must not exceed ${REPORT_DESCRIPTION_MAX} characters.`;
    }
    return '';
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
        description: description.trim(),
      });
      setSubmitted(true);
    } catch (error) {
      if (error?.response?.status === 401) {
        onClose();
        navigate('/login', { replace: true });
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
      <div className="w-full max-w-lg bg-card rounded-t-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out border-t border-border/40 pb-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 id="report-modal-title" className="text-2xl font-bold mb-1">
              Report Owner
            </h2>
            <p className="text-muted-foreground text-sm">
              Report {subjectName}. Reports are reviewed by our team.
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
                Reason
              </label>
              <Select
                value={category}
                onValueChange={setCategory}
                disabled={isDisabled}
              >
                <SelectTrigger className="w-full h-11 rounded-xl">
                  <SelectValue placeholder="Select a reason" />
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
                Details
              </label>
              <Textarea
                placeholder="Describe what happened (minimum 10 characters)..."
                className="min-h-[120px] rounded-2xl p-4 bg-muted/30 border-border/40"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isDisabled}
                maxLength={REPORT_DESCRIPTION_MAX}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {description.trim().length}/{REPORT_DESCRIPTION_MAX} characters
                {description.trim().length > 0 && description.trim().length < REPORT_DESCRIPTION_MIN
                  ? ` · at least ${REPORT_DESCRIPTION_MIN} required`
                  : ''}
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
