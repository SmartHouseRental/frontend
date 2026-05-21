import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router';
import { STATUS_STYLES } from '../utils';

export function AppointmentDetailSheet({
  appointment,
  onClose,
  onAccept,
  onReject,
  onCancel,
  isUpdating,
}) {
  if (!appointment) return null;

  const canApprove = appointment.status === 'PENDING';
  const canCancel =
    appointment.status === 'PENDING' || appointment.status === 'ACCEPTED';

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <Card className="relative z-10 flex h-full w-full max-w-md flex-col overflow-hidden rounded-none border-y-0 border-r-0 shadow-2xl">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 border-b pb-4">
          <div>
            <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
              Appointment details
            </p>
            <h3 className="text-foreground mt-1 text-xl font-bold">{appointment.renterName}</h3>
            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLES[appointment.status]}`}
            >
              {appointment.statusLabel}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </CardHeader>

        <CardContent className="scrollbar-hide flex-1 space-y-6 overflow-y-auto pt-6">
          {appointment.propertyImage && (
            <img
              src={appointment.propertyImage}
              alt={appointment.propertyTitle}
              className="h-40 w-full rounded-xl object-cover"
            />
          )}

          <div className="space-y-3">
            <h4 className="text-sm font-bold">Property</h4>
            <p className="font-semibold">{appointment.propertyTitle}</p>
            <p className="text-muted-foreground flex items-start gap-2 text-sm">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              {appointment.propertyAddress || '—'}
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/owner/properties/${appointment.propertyId}`}>View property</Link>
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold">Schedule</h4>
            <p className="flex items-center gap-2 text-sm">
              <CalendarDays size={14} className="text-muted-foreground" />
              {appointment.displayDate}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-muted-foreground" />
              {appointment.displayTime}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold">Renter</h4>
            <p className="flex items-center gap-2 text-sm">
              <User size={14} className="text-muted-foreground" />
              {appointment.renterName}
            </p>
            {appointment.renterEmail && (
              <a
                href={`mailto:${appointment.renterEmail}`}
                className="text-primary flex items-center gap-2 text-sm hover:underline"
              >
                <Mail size={14} />
                {appointment.renterEmail}
              </a>
            )}
            {appointment.renterPhone && (
              <a
                href={`tel:${appointment.renterPhone}`}
                className="text-primary flex items-center gap-2 text-sm hover:underline"
              >
                <Phone size={14} />
                {appointment.renterPhone}
              </a>
            )}
          </div>

          {appointment.note && (
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-muted-foreground mb-1 flex items-center gap-1 text-xs font-bold uppercase">
                <MessageSquare size={12} /> Message from renter
              </p>
              <p className="text-sm">{appointment.note}</p>
            </div>
          )}
        </CardContent>

        <div className="border-t p-4 space-y-2">
          {canApprove && (
            <div className="flex gap-2">
              <Button
                className="flex-1 gap-1"
                disabled={isUpdating}
                onClick={() => onAccept(appointment.id)}
              >
                {isUpdating ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                Approve
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-1 text-destructive border-destructive/30 hover:bg-destructive/5"
                disabled={isUpdating}
                onClick={() => onReject(appointment.id)}
              >
                <XCircle size={16} /> Reject
              </Button>
            </div>
          )}
          {canCancel && (
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              disabled={isUpdating}
              onClick={() => onCancel(appointment.id)}
            >
              Cancel appointment
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
