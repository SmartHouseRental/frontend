import { useState, useCallback } from "react";
import {
  X,
  CalendarDays,
  Clock,
  Home,
  Video,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Constants ─── */
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ─── Mini Calendar Component ─── */
function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const prevMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (day) => {
    if (!day || !selected) return false;
    const s = new Date(selected);
    return s.getFullYear() === year && s.getMonth() === month && s.getDate() === day;
  };

  const isPast = (day) => {
    if (!day) return false;
    return new Date(year, month, day) < today;
  };

  return (
    <div className="w-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-bold">
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;
          const past = isPast(day);
          const sel = isSelected(day);
          return (
            <button
              key={day}
              disabled={past}
              onClick={() =>
                onSelect(new Date(year, month, day).toISOString().split("T")[0])
              }
              className={`
                aspect-square rounded-lg text-sm font-medium transition-all
                ${past ? "text-muted-foreground/30 cursor-not-allowed" : "hover:bg-[#D97745]/10 hover:text-[#D97745]"}
                ${sel ? "!bg-[#D97745] !text-white shadow-md shadow-[#D97745]/30 scale-105" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step Indicator ─── */
function Steps({ current }) {
  const steps = ["Date", "Time & Type", "Confirm"];
  return (
    <div className="flex items-center gap-2 mb-6">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={label} className="flex items-center gap-2 flex-1 last:flex-initial">
            <div
              className={`
                w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all
                ${done ? "bg-[#D97745] text-white" : active ? "bg-[#D97745]/10 text-[#D97745] ring-2 ring-[#D97745]/40" : "bg-muted text-muted-foreground"}
              `}
            >
              {done ? <CheckCircle className="h-4 w-4" /> : idx}
            </div>
            <span className={`text-xs font-semibold ${active ? "text-[#D97745]" : done ? "text-foreground" : "text-muted-foreground"}`}>
              {label}
            </span>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px ${done ? "bg-[#D97745]" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Modal ─── */
export default function ScheduleVisitModal({ open, property, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [visitType, setVisitType] = useState("physical");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reset = useCallback(() => {
    setStep(1);
    setSelectedDate("");
    setSelectedSlot("");
    setVisitType("physical");
    setNote("");
    setSubmitting(false);
    setSubmitted(false);
  }, []);

  const handleClose = () => {
    onClose?.();
    setTimeout(reset, 300);
  };

  const handleSubmit = () => {
    if (!property) return;
    setSubmitting(true);
    setTimeout(() => {
      // Will submit via API during integration
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 visit-modal-backdrop"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95vw] max-w-lg visit-modal-enter">
        <div className="bg-card rounded-2xl shadow-2xl border border-border/60 overflow-hidden">

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-gradient-to-r from-[#D97745]/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-[#D97745]/10 rounded-lg flex items-center justify-center">
                <CalendarDays className="h-4 w-4 text-[#D97745]" />
              </div>
              <div>
                <h2 className="font-bold text-base">Schedule a Visit</h2>
                {property && (
                  <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                    {property.title}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* ── Body ── */}
          <div className="px-6 py-5">

            {/* ────────── SUCCESS STATE ────────── */}
            {submitted ? (
              <div className="py-4 text-center">
                <div className="size-16 bg-[#D97745]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-[#D97745]" />
                </div>
                <h3 className="text-lg font-bold mb-1">Request Sent!</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Your visit request is <span className="font-semibold text-amber-600">pending</span> review by the owner.
                  You'll be notified once it's approved.
                </p>

                <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-medium truncate ml-4 max-w-[180px]">{property?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{selectedSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium capitalize">{visitType}</span>
                  </div>
                </div>

                <Button
                  onClick={handleClose}
                  className="w-full bg-[#D97745] hover:bg-[#C96635] text-white rounded-xl font-bold"
                >
                  Done
                </Button>
              </div>

            ) : (
              <>
                <Steps current={step} />

                {/* ────────── STEP 1: Calendar ────────── */}
                {step === 1 && (
                  <div className="visit-step-enter">
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose a date for your visit. Dates in the past are unavailable.
                    </p>
                    <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />

                    <div className="mt-6">
                      <Button
                        disabled={!selectedDate}
                        onClick={() => setStep(2)}
                        className="w-full bg-[#D97745] hover:bg-[#C96635] text-white rounded-xl font-bold disabled:opacity-40"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {/* ────────── STEP 2: Time & Type ────────── */}
                {step === 2 && (
                  <div className="visit-step-enter">
                    {/* Selected date badge */}
                    <div className="flex items-center gap-2 bg-[#D97745]/8 rounded-xl px-3 py-2 mb-5">
                      <CalendarDays className="h-4 w-4 text-[#D97745]" />
                      <span className="text-sm font-semibold text-[#D97745]">
                        {formatDate(selectedDate)}
                      </span>
                    </div>

                    {/* Time slots */}
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Select Time Slot
                    </p>
                    <div className="grid grid-cols-4 gap-2 mb-6">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`
                            py-2 rounded-xl text-xs font-semibold transition-all border
                            ${selectedSlot === slot
                              ? "bg-[#D97745] text-white border-[#D97745] shadow-md shadow-[#D97745]/20"
                              : "bg-[#C9A882]/10 text-foreground border-[#C9A882]/20 hover:border-[#D97745]/40 hover:bg-[#D97745]/5"
                            }
                          `}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>

                    {/* Visit type */}
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                      Visit Type
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        { value: "physical", label: "In-Person", icon: Home, desc: "Visit at the property" },
                        { value: "virtual", label: "Virtual", icon: Video, desc: "Video call tour" },
                      ].map(({ value, label, icon: Icon, desc }) => (
                        <button
                          key={value}
                          onClick={() => setVisitType(value)}
                          className={`
                            flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all text-center
                            ${visitType === value
                              ? "bg-[#D97745]/8 border-[#D97745] text-[#D97745]"
                              : "border-border hover:border-[#D97745]/30 hover:bg-muted/40"
                            }
                          `}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="text-sm font-bold">{label}</span>
                          <span className="text-[10px] text-muted-foreground">{desc}</span>
                        </button>
                      ))}
                    </div>

                    {/* Optional note */}
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                      Note to Owner <span className="normal-case font-normal">(optional)</span>
                    </p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="E.g. We are a family of 4, interested in a long-term lease…"
                      rows={2}
                      className="w-full resize-none px-3 py-2.5 rounded-xl bg-muted/40 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97745]/20 focus:border-[#D97745]/40 transition-all mb-5"
                    />

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-xl font-semibold"
                      >
                        Back
                      </Button>
                      <Button
                        disabled={!selectedSlot}
                        onClick={() => setStep(3)}
                        className="flex-1 bg-[#D97745] hover:bg-[#C96635] text-white rounded-xl font-bold disabled:opacity-40"
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                )}

                {/* ────────── STEP 3: Confirm ────────── */}
                {step === 3 && (
                  <div className="visit-step-enter">
                    <p className="text-sm text-muted-foreground mb-5">
                      Review your visit details before sending the request to the owner.
                    </p>

                    {/* Property card */}
                    {property && (
                      <div className="flex gap-3 bg-muted/40 rounded-xl p-3 mb-4">
                        {property.image && (
                          <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={property.image} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-bold text-sm truncate">{property.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{property.ownerName}</p>
                        </div>
                      </div>
                    )}

                    {/* Summary */}
                    <div className="bg-muted/40 rounded-xl divide-y divide-border/60 mb-5">
                      {[
                        { icon: CalendarDays, label: "Date", value: formatDate(selectedDate) },
                        { icon: Clock, label: "Time", value: selectedSlot },
                        { icon: visitType === "virtual" ? Video : Home, label: "Type", value: visitType === "virtual" ? "Virtual (Video Call)" : "In-Person Visit" },
                      ].map(({ icon: Icon, label, value }) => (
                        <div key={label} className="flex items-center gap-3 px-4 py-3">
                          <div className="size-7 bg-[#D97745]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-3.5 w-3.5 text-[#D97745]" />
                          </div>
                          <span className="text-xs text-muted-foreground w-12">{label}</span>
                          <span className="text-sm font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>

                    {note && (
                      <div className="bg-muted/30 rounded-xl px-4 py-3 mb-5 text-sm text-muted-foreground italic">
                        "{note}"
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1 rounded-xl font-semibold"
                        disabled={submitting}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="flex-1 bg-[#D97745] hover:bg-[#C96635] text-white rounded-xl font-bold"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending…
                          </span>
                        ) : (
                          "Send Request"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
