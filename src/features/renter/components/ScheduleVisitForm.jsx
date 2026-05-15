import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'sonner';
import { Calendar, Clock, MessageSquare, MapPin, Star, Home, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useBookAppointment } from '../../visits/hooks/useAppointments';

const formSchema = z.object({
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time'),
  message: z.string().optional(),
});

export default function ScheduleVisitForm({ property }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '02:00 PM', '03:00 PM', '04:00 PM', 
    '05:00 PM', '06:00 PM'
  ];

  // Mock unavailable data (randomly for the month)
  const isDateUnavailable = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dateObj = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Past dates are unavailable
    if (dateObj < today) return true;
    
    // Mock random unavailable days (e.g., weekends or specific days)
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0) return true; // Sundays unavailable
    
    // Some specific mock dates
    const mocks = ['2026-05-15', '2026-05-20', '2026-05-25'];
    return mocks.includes(dateStr);
  };

  const unavailableTimesPerDate = {
    '2026-05-09': ['09:00 AM', '11:00 AM'],
    '2026-05-10': ['02:00 PM', '03:00 PM'],
  };

  const handleDateSelect = (year, month, day) => {
    if (isDateUnavailable(year, month, day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    setSelectedTime('');
    setValue('date', dateStr, { shouldValidate: true });
    setValue('time', '', { shouldValidate: false });
  };

  const handleTimeSelect = (time) => {
    if (unavailableTimesPerDate[selectedDate]?.includes(time)) return;
    setSelectedTime(time);
    setValue('time', time, { shouldValidate: true });
  };

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(newMonth);
  };

  const { mutateAsync: bookVisit } = useBookAppointment();

  const onSubmit = async (data) => {
    try {
      // Parse time (e.g., "09:00 AM" to hours/minutes)
      const [time, period] = data.time.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours < 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;

      // Create startsAt date
      const startsAt = new Date(data.date);
      startsAt.setHours(hours, minutes, 0, 0);

      // Default endsAt to 1 hour after startsAt
      const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);

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
              <h3 className="text-lg font-semibold">Select a Date</h3>
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

          <Card className="p-4 border-none shadow-sm ring-1 ring-border/50">
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

        {/* Time Selection */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="text-primary h-5 w-5" />
            <h3 className="text-lg font-semibold">Select a Time</h3>
          </div>
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
        </section>

        {/* Optional Message */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="text-primary h-5 w-5" />
            <h3 className="text-lg font-semibold">
              {location.state?.fromReschedule ? 'Reason for Rescheduling' : 'Notes for the Owner (Optional)'}
            </h3>
          </div>
          <Textarea
            {...register('message')}
            placeholder={location.state?.fromReschedule 
              ? "Please let the owner know why you're rescheduling..." 
              : "Introduce yourself or ask any specific questions about the visit..."}
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
            {isSubmitting ? 'Scheduling...' : 'Confirm Scheduling'}
          </Button>
          <p className="text-muted-foreground mt-4 flex items-center justify-center gap-2 text-center text-xs">
            <Info className="h-3 w-3" />
            The owner will be notified of your request and can confirm or suggest a new time.
          </p>
        </div>
      </div>

      {/* Right Column: Property Summary Card */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <Card className="overflow-hidden border-none shadow-xl ring-1 ring-border/50">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img 
                src={property.image || property.images?.[0]} 
                alt={property.title} 
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-primary text-xl font-bold">{property.price}</span>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star className="text-primary h-4 w-4 fill-primary" />
                  {property.rating || '4.8'}
                </div>
              </div>
              
              <h2 className="line-clamp-1 text-lg font-bold">{property.title}</h2>
              
              <div className="text-muted-foreground mt-2 flex items-start gap-1.5 text-sm">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2">{property.location || property.address}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                 <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                    <Home className="h-3 w-3" />
                    {property.type || 'Villa'}
                 </div>
                 {property.beds && (
                   <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                      <span className="font-bold">{property.beds}</span> Beds
                   </div>
                 )}
                 {property.baths && (
                   <div className="bg-muted/50 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold">
                      <span className="font-bold">{property.baths}</span> Baths
                   </div>
                 )}
              </div>

              <div className="border-border/50 mt-6 border-t pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-semibold">{property.ownerName || 'Property Owner'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100 dark:bg-amber-900/10 dark:ring-amber-900/30">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-400">
              <Calendar className="h-4 w-4" />
              Visit Policy
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-amber-700/80 dark:text-amber-400/60">
              Visits are free of charge. Please ensure you arrive on time. If you need to cancel, please do so at least 2 hours in advance.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
