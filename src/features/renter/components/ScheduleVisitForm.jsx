import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Calendar, Clock, MessageSquare, MapPin, Star, Home, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useBookAppointment, useAvailability } from '../../visits/hooks/useAppointments';
import SafeImage from '@/components/SafeImage';
import { getPropertyImageUrl } from '@/lib/resolveImageUrl';
import {
  VISIT_TIME_SLOTS,
  slotToMinutes,
  computeBusySlotMap,
  getBlockedEndSlots,
  visitRangeConflicts,
  parseTimeStr,
} from '../../visits/utils/availability';

const getLocalizedStr = (field) => {
  if (!field) return '';
  if (typeof field === 'object') return field.en || field.am || '';
  return String(field);
};

export default function ScheduleVisitForm({ property }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const propertyTitle = property.titleStr || getLocalizedStr(property.title) || t('renter.scheduleVisit.propertyFallback');
  const propertyAddress = property.addressStr || getLocalizedStr(property.address) || property.location || '';
  const propertyType = property.typeStr || getLocalizedStr(property.type) || t('renter.scheduleVisit.propertyTypeFallback');
  const propertyPrice = property.priceStr || (typeof property.price === 'object' ? (property.price?.value ?? '') : (property.price ?? ''));

  const formSchema = useMemo(
    () =>
      z.object({
        date: z.string().min(1, t('renter.scheduleVisit.fieldErrors.date')),
        time: z.string().min(1, t('renter.scheduleVisit.fieldErrors.time')),
        endTime: z.string().min(1, t('renter.scheduleVisit.fieldErrors.endTime')),
        message: z.string().optional(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: '',
      time: '',
      endTime: '',
      message: '',
    },
  });

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  
  const prevMonthDays = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
  
  const calendarDays = [];
  
  // Padding from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      month: currentMonth.getMonth() - 1,
      year: currentMonth.getFullYear(),
      isCurrentMonth: false,
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: currentMonth.getMonth(),
      year: currentMonth.getFullYear(),
      isCurrentMonth: true,
    });
  }
  
  // Padding from next month
  const totalSlots = 42; // 6 rows of 7 days
  const nextMonthPadding = totalSlots - calendarDays.length;
  for (let i = 1; i <= nextMonthPadding; i++) {
    calendarDays.push({
      day: i,
      month: currentMonth.getMonth() + 1,
      year: currentMonth.getFullYear(),
      isCurrentMonth: false,
    });
  }

  const timeSlots = VISIT_TIME_SLOTS;

  const {
    data: busySlots = [],
    isLoading: isLoadingAvailability,
    isError: isAvailabilityError,
    refetch: refetchAvailability,
  } = useAvailability(property?.id, currentMonth);

  useEffect(() => {
    if (isAvailabilityError) {
      toast.error(t('renter.scheduleVisit.availability.loadError'));
    }
  }, [isAvailabilityError, t]);

  const { unavailableTimesPerDate, fullyBlockedDates } = useMemo(
    () => computeBusySlotMap(busySlots, timeSlots),
    [busySlots, timeSlots],
  );

  const isDateUnavailable = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month, day);
    dateObj.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateObj <= today) return true;

    return fullyBlockedDates.has(dateStr);
  };

  const handleDateSelect = (year, month, day) => {
    if (isDateUnavailable(year, month, day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setSelectedTime('');
    setValue('date', dateStr, { shouldValidate: true });
    setValue('time', '', { shouldValidate: false });
  };

  const blockedEndSlots = useMemo(() => {
    if (!selectedDate || !selectedTime) return [];
    return getBlockedEndSlots(busySlots, selectedDate, selectedTime, timeSlots);
  }, [busySlots, selectedDate, selectedTime, timeSlots]);

  const handleTimeSelect = (time) => {
    if (unavailableTimesPerDate[selectedDate]?.includes(time)) return;
    setSelectedTime(time);
    setValue('time', time, { shouldValidate: true });
    // Reset end time whenever start time changes
    setSelectedEndTime('');
    setValue('endTime', '', { shouldValidate: false });
  };

  const handleEndTimeSelect = (time) => {
    if (blockedEndSlots.includes(time)) return;
    setSelectedEndTime(time);
    setValue('endTime', time, { shouldValidate: true });
  };

  // End time slots: only slots strictly after the selected start time, excluding busy ranges
  const availableEndSlots = selectedTime
    ? timeSlots.filter(
        (t) =>
          slotToMinutes(t) > slotToMinutes(selectedTime) && !blockedEndSlots.includes(t),
      )
    : [];

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newMonth);
  };

  const { mutateAsync: bookVisit } = useBookAppointment();

  const onSubmit = async (data) => {
    try {
      const { hours: startH, minutes: startM } = parseTimeStr(data.time);
      const { hours: endH, minutes: endM } = parseTimeStr(data.endTime);

      const startsAt = new Date(data.date);
      startsAt.setHours(startH, startM, 0, 0);

      const endsAt = new Date(data.date);
      endsAt.setHours(endH, endM, 0, 0);

      if (visitRangeConflicts(busySlots, startsAt, endsAt)) {
        toast.error(t('renter.scheduleVisit.availability.loadError'));
        refetchAvailability();
        return;
      }

      await bookVisit({
        propertyId: property.id,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        note: data.message || '',
      });

      navigate('/renter/appointments');
    } catch (err) {
      // Error handled in mutation
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left Column: Form Controls */}
      <div className="space-y-8 lg:col-span-2">
        {/* Date Selection - BIG CALENDAR */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">{t('renter.scheduleVisit.selectDate')}</h3>
            </div>
            <div className="flex items-center gap-4">
              <button 
                type="button" 
                onClick={() => changeMonth(-1)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-bold min-w-[120px] text-center">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <button 
                type="button" 
                onClick={() => changeMonth(1)}
                className="p-1 hover:bg-muted rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <Card
            className={cn(
              'p-4 border-none shadow-sm ring-1 ring-border/50 relative',
              isLoadingAvailability && 'opacity-70',
            )}
          >
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-[10px] font-bold uppercase text-muted-foreground py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => {
                const dateStr = `${d.year}-${String(d.month + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
                const isSelected = selectedDate === dateStr;
                const isUnavailable = isDateUnavailable(d.year, d.month, d.day);
                
                return (
                  <button
                    key={`${d.month}-${d.day}-${i}`}
                    type="button"
                    disabled={isUnavailable || !d.isCurrentMonth}
                    onClick={() => handleDateSelect(d.year, d.month, d.day)}
                    className={cn(
                      "relative flex h-12 flex-col items-center justify-center rounded-lg text-sm transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold shadow-md z-10"
                        : !d.isCurrentMonth
                        ? "text-muted-foreground/20 cursor-default"
                        : isUnavailable
                        ? "text-muted-foreground/40 bg-muted/10 cursor-not-allowed"
                        : "hover:bg-primary/10 hover:text-primary font-medium"
                    )}
                  >
                    {d.day}
                    {isSelected && (
                      <div className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-foreground" />
                    )}
                    {isUnavailable && d.isCurrentMonth && (
                      <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-destructive/50" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>
          
          {errors.date && <p className="text-destructive text-sm font-medium">{errors.date.message}</p>}
        </section>

        {/* Time Selection — Start & End */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="text-primary h-5 w-5" />
            <h3 className="text-lg font-semibold">{t('renter.scheduleVisit.selectTime')}</h3>
          </div>

          {/* Start Time */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{t('renter.scheduleVisit.startTime')}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {timeSlots.map((time) => {
                const isUnavailable = unavailableTimesPerDate[selectedDate]?.includes(time);
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={isUnavailable || !selectedDate}
                    onClick={() => handleTimeSelect(time)}
                    className={cn(
                      "rounded-lg border py-2.5 text-sm font-medium transition-all",
                      selectedTime === time
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : isUnavailable
                        ? "bg-muted/30 border-dashed border-muted-foreground/20 text-muted-foreground/50 cursor-not-allowed line-through"
                        : "bg-card hover:border-primary/50 hover:bg-primary/5 border-border text-foreground",
                      !selectedDate && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
            {errors.time && <p className="text-destructive text-sm font-medium">{errors.time.message}</p>}
          </div>

          {/* End Time — only shown after start time is selected */}
          <div className="space-y-3">
            <p className={cn("text-sm font-semibold uppercase tracking-wide", selectedTime ? "text-muted-foreground" : "text-muted-foreground/40")}>
              {t('renter.scheduleVisit.endTime')}
            </p>
            {!selectedTime ? (
              <p className="text-sm text-muted-foreground/60 italic">{t('renter.scheduleVisit.noEndTimes')}</p>
            ) : availableEndSlots.length === 0 ? (
              <p className="text-sm text-destructive/80 italic">{t('renter.scheduleVisit.noEndTimesAvailable')}</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {availableEndSlots.map((time) => {
                  const isBlocked = blockedEndSlots.includes(time);
                  return (
                  <button
                    key={time}
                    type="button"
                    disabled={isBlocked}
                    onClick={() => handleEndTimeSelect(time)}
                    className={cn(
                      "rounded-lg border py-2.5 text-sm font-medium transition-all",
                      selectedEndTime === time
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : isBlocked
                        ? "bg-muted/30 border-dashed border-muted-foreground/20 text-muted-foreground/50 cursor-not-allowed line-through"
                        : "bg-card hover:border-primary/50 hover:bg-primary/5 border-border text-foreground"
                    )}
                  >
                    {time}
                  </button>
                  );
                })}
              </div>
            )}
            {errors.endTime && <p className="text-destructive text-sm font-medium">{errors.endTime.message}</p>}
          </div>

          {/* Duration summary badge */}
          {selectedTime && selectedEndTime && (
            <div className="flex items-center gap-2 rounded-xl bg-primary/5 border border-primary/20 px-4 py-2.5 text-sm font-semibold text-primary w-fit">
              <Clock className="h-4 w-4" />
              {t('renter.scheduleVisit.visitRange', { start: selectedTime, end: selectedEndTime })}
            </div>
          )}
        </section>

        {/* Optional Message */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-primary h-5 w-5" />
            <h3 className="text-lg font-semibold">
              {location.state?.fromReschedule ? t('renter.scheduleVisit.rescheduleReason') : t('renter.scheduleVisit.notesForOwner')}
            </h3>
          </div>
          <Textarea
            {...register('message')}
            placeholder={location.state?.fromReschedule
              ? t('renter.scheduleVisit.reschedulePlaceholder')
              : t('renter.scheduleVisit.placeholder')}
            className="min-h-[120px] resize-none rounded-xl"
          />
        </section>

        <div className="pt-4">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full rounded-xl py-6 text-lg font-bold shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
            disabled={isSubmitting}
          >
            {isSubmitting ? t('renter.scheduleVisit.scheduling') : t('renter.scheduleVisit.confirmScheduling')}
          </Button>
          <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-center text-xs">
            <Info className="h-3 w-3" />
            {t('renter.scheduleVisit.info')}
          </p>
        </div>
      </div>

      {/* Right Column: Property Summary Card */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card className="overflow-hidden border-none shadow-xl ring-1 ring-border/50">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <SafeImage
                src={getPropertyImageUrl(property)}
                alt={propertyTitle}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-primary text-xl font-bold">{propertyPrice}</span>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="text-primary h-4 w-4 fill-primary" />
                  {property.rating || '4.8'}
                </div>
              </div>
              
              <h2 className="line-clamp-1 text-lg font-bold">{propertyTitle}</h2>
              
              <div className="text-muted-foreground mt-2 flex items-start gap-1.5 text-sm">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2">{propertyAddress}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                 <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                    <Home className="h-3 w-3" />
                    {propertyType}
                 </div>
                 {property.beds && (
                   <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                      <span className="font-bold">{property.beds}</span> {t('renter.scheduleVisit.beds')}
                   </div>
                 )}
                 {property.baths && (
                   <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                      <span className="font-bold">{property.baths}</span> {t('renter.scheduleVisit.baths')}
                   </div>
                 )}
              </div>

              <div className="border-border/50 mt-6 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('renter.scheduleVisit.owner')}</span>
                  <span className="font-semibold">{property.ownerName || t('renter.scheduleVisit.propertyOwnerFallback')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100 dark:bg-amber-900/10 dark:ring-amber-900/30">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-400">
              <Calendar className="h-4 w-4" />
              {t('renter.scheduleVisit.visitPolicyTitle')}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-amber-700/80 dark:text-amber-400/60">
              {t('renter.scheduleVisit.visitPolicy')}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
