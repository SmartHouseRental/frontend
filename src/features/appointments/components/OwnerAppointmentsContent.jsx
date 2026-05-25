import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  ChevronRight,
  Phone,
  Mail,
  AlertCircle,
  MoreVertical,
  Building2,
  Loader2,
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  useOwnerAppointments,
  useUpdateAppointmentStatus,
  useUpdateAppointmentNote,
} from '../hooks/useAppointments';
import {
  normalizeAppointment,
  unwrapAppointments,
  STATUS_STYLES,
} from '../utils';
import { AppointmentDetailSheet } from './AppointmentDetailSheet';

const STATUS_ICONS = {
  PENDING: Clock,
  ACCEPTED: CheckCircle2,
  REJECTED: XCircle,
  CANCELLED: XCircle,
};

export function OwnerAppointmentsContent({ propertyIdFilter = null }) {
  const { t, i18n } = useTranslation();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [noteInputs, setNoteInputs] = useState({});
  const [confirmAction, setConfirmAction] = useState(null);
  const language = (i18n.resolvedLanguage || i18n.language || 'en').split('-')[0];
  const dateLocale = language === 'am' ? 'am-ET' : 'en-US';
  const fallbackLabels = useMemo(
    () => ({
      property: t('owner.appointments.fallbacks.property'),
      unknownRenter: t('owner.appointments.fallbacks.unknownRenter'),
      renter: t('owner.appointments.fallbacks.renter'),
    }),
    [language, t]
  );

  const queryParams = useMemo(() => {
    const params = {};
    if (propertyIdFilter) params.propertyId = propertyIdFilter;
    if (statusFilter !== 'all') params.status = statusFilter;
    return params;
  }, [propertyIdFilter, statusFilter]);

  const { data, isLoading, isError, refetch } = useOwnerAppointments(queryParams);
  const updateStatusMutation = useUpdateAppointmentStatus();
  const updateNoteMutation = useUpdateAppointmentNote();

  const appointments = useMemo(
    () =>
      unwrapAppointments(data).map((a) => {
        const appointment = normalizeAppointment(a, language, dateLocale, fallbackLabels);
        return {
          ...appointment,
          statusLabel: t(`owner.appointments.statuses.${appointment.status}`, {
            defaultValue: appointment.statusLabel,
          }),
        };
      }),
    [data, dateLocale, fallbackLabels, language, t]
  );

  const selected = appointments.find((a) => a.id === selectedId) ?? null;

  const stats = useMemo(
    () => ({
      total: appointments.length,
      pending: appointments.filter((a) => a.status === 'PENDING').length,
      confirmed: appointments.filter((a) => a.status === 'ACCEPTED').length,
      rejected: appointments.filter((a) => a.status === 'REJECTED').length,
    }),
    [appointments]
  );

  const upcoming = appointments.filter((a) => a.isUpcoming);
  const past = appointments.filter(
    (a) => a.isPast || a.status === 'REJECTED' || a.status === 'CANCELLED'
  );

  const handleStatus = (id, status) => {
    updateStatusMutation.mutate(
      { appointmentId: id, status },
      {
        onSuccess: () => {
          setConfirmAction(null);
          if (selectedId === id && (status === 'REJECTED' || status === 'CANCELLED')) {
            setSelectedId(null);
          }
        },
      }
    );
  };

  const handleSaveNote = (id) => {
    const note = noteInputs[id]?.trim();
    if (!note) return;
    updateNoteMutation.mutate(
      { appointmentId: id, note },
      { onSuccess: () => setNoteInputs((prev) => ({ ...prev, [id]: '' })) }
    );
  };

  const AppointmentCard = ({ apt }) => {
    const StatusIcon = STATUS_ICONS[apt.status] || Clock;
    const isExpanded = selectedId === apt.id;
    const isConfirming = confirmAction?.id === apt.id;
    const isUpdating =
      updateStatusMutation.isPending && updateStatusMutation.variables?.appointmentId === apt.id;

    return (
      <Card
        className={`transition-all duration-300 ${isExpanded ? 'border-primary/20 shadow-md ring-1 ring-primary/10' : 'hover:border-primary/10 hover:shadow-md'}`}
      >
        <CardContent className="space-y-0 pt-6">
          <div className="flex gap-4">
            {apt.propertyImage ? (
              <img
                src={apt.propertyImage}
                alt=""
                className="hidden h-14 w-14 shrink-0 rounded-lg object-cover sm:block"
              />
            ) : (
              <div className="bg-primary/10 text-primary hidden h-14 w-14 shrink-0 items-center justify-center rounded-lg text-lg font-bold sm:flex">
                {apt.renterInitials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-foreground truncate font-bold">{apt.renterName}</p>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${STATUS_STYLES[apt.status]}`}
                >
                  <StatusIcon size={10} />
                  {apt.statusLabel}
                </span>
              </div>
              <p className="text-muted-foreground mt-0.5 truncate text-sm font-medium">
                {apt.propertyTitle}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays size={12} /> {apt.displayDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {apt.displayTime}
                </span>
                {apt.renterPhone && (
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {apt.renterPhone}
                  </span>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {apt.status === 'PENDING' && !isConfirming && (
                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    size="sm"
                    className="h-8 gap-1 text-xs"
                    disabled={isUpdating}
                    onClick={() => setConfirmAction({ id: apt.id, action: 'accept' })}
                  >
                    <CheckCircle2 size={12} /> {t('owner.appointments.actions.approve')}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/5 h-8 gap-1 text-xs"
                    disabled={isUpdating}
                    onClick={() => setConfirmAction({ id: apt.id, action: 'reject' })}
                  >
                    <XCircle size={12} /> {t('owner.appointments.actions.reject')}
                  </Button>
                </div>
              )}
              {isConfirming && (
                <div className="flex animate-in items-center gap-2 fade-in-0 duration-200">
                  <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
                    <AlertCircle size={12} />
                    {confirmAction.action === 'accept'
                      ? t('owner.appointments.confirm.approveQuestion')
                      : t('owner.appointments.confirm.rejectQuestion')}
                  </span>
                  <Button
                    size="sm"
                    variant={confirmAction.action === 'accept' ? 'default' : 'destructive'}
                    className="h-7 text-xs"
                    disabled={isUpdating}
                    onClick={() =>
                      handleStatus(
                        apt.id,
                        confirmAction.action === 'accept' ? 'ACCEPTED' : 'REJECTED'
                      )
                    }
                  >
                    {t('owner.appointments.confirm.yes')}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 text-xs"
                    onClick={() => setConfirmAction(null)}
                  >
                    {t('owner.appointments.confirm.no')}
                  </Button>
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    aria-label={t('owner.appointments.actions.openMenu')}
                  >
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setSelectedId(apt.id)}>
                    {t('owner.appointments.actions.viewDetails')}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/owner/properties/${apt.propertyId}`} className="flex gap-2">
                      <Building2 size={14} /> {t('owner.appointments.actions.viewProperty')}
                    </Link>
                  </DropdownMenuItem>
                  {apt.renterEmail && (
                    <DropdownMenuItem asChild>
                      <a href={`mailto:${apt.renterEmail}`} className="flex gap-2">
                        <Mail size={14} /> {t('owner.appointments.actions.emailRenter')}
                      </a>
                    </DropdownMenuItem>
                  )}
                  {apt.status === 'PENDING' && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-emerald-600"
                        onClick={() => handleStatus(apt.id, 'ACCEPTED')}
                      >
                        {t('owner.appointments.actions.approve')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleStatus(apt.id, 'REJECTED')}
                      >
                        {t('owner.appointments.actions.reject')}
                      </DropdownMenuItem>
                    </>
                  )}
                  {(apt.status === 'PENDING' || apt.status === 'ACCEPTED') && (
                    <DropdownMenuItem onClick={() => handleStatus(apt.id, 'CANCELLED')}>
                      {t('owner.appointments.actions.cancel')}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-8 w-8 md:flex"
                onClick={() => setSelectedId(isExpanded ? null : apt.id)}
                aria-label={
                  isExpanded
                    ? t('owner.appointments.actions.collapse')
                    : t('owner.appointments.actions.expand')
                }
              >
                <ChevronRight
                  size={16}
                  className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              </Button>
            </div>
          </div>

          {isExpanded && (
            <div className="border-border mt-4 space-y-4 border-t pt-4">
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>{apt.propertyAddress || '—'}</span>
                </div>
                {apt.renterEmail && (
                  <a href={`mailto:${apt.renterEmail}`} className="text-primary flex items-center gap-2">
                    <Mail size={14} /> {apt.renterEmail}
                  </a>
                )}
              </div>
              {apt.note && (
                <div className="bg-muted/50 rounded-lg p-3 text-sm">{apt.note}</div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={noteInputs[apt.id] || ''}
                  onChange={(e) =>
                    setNoteInputs((prev) => ({ ...prev, [apt.id]: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveNote(apt.id)}
                  placeholder={t('owner.appointments.actions.addOwnerNote')}
                  className="border-border bg-background h-9 flex-1 rounded-lg border px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!noteInputs[apt.id]?.trim() || updateNoteMutation.isPending}
                  onClick={() => handleSaveNote(apt.id)}
                >
                  {t('owner.appointments.actions.save')}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary animate-spin" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="border-dashed">
        <CardContent className="space-y-3 py-10 text-center">
          <p className="text-muted-foreground text-sm">
            {t('owner.appointments.errors.failedLoad')}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            {t('owner.appointments.errors.tryAgain')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {!propertyIdFilter && (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              {
                key: 'total',
                label: t('owner.appointments.stats.total'),
                value: stats.total,
                icon: CalendarDays,
                accent: 'text-primary',
              },
              {
                key: 'pending',
                label: t('owner.appointments.stats.pending'),
                value: stats.pending,
                icon: Clock,
                accent: 'text-amber-600',
              },
              {
                key: 'confirmed',
                label: t('owner.appointments.stats.confirmed'),
                value: stats.confirmed,
                icon: CheckCircle2,
                accent: 'text-emerald-600',
              },
              {
                key: 'rejected',
                label: t('owner.appointments.stats.rejected'),
                value: stats.rejected,
                icon: XCircle,
                accent: 'text-rose-600',
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.key} className="border-0">
                  <CardContent className="flex items-center gap-3 pt-6">
                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-lg">
                      <Icon size={18} className={s.accent} />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs font-medium uppercase">{s.label}</p>
                      <p className={`text-xl font-extrabold ${s.accent}`}>{s.value}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Filter size={16} className="text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder={t('owner.appointments.filters.status')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  {t('owner.appointments.filters.allStatuses')}
                </SelectItem>
                <SelectItem value="PENDING">
                  {t('owner.appointments.statuses.PENDING')}
                </SelectItem>
                <SelectItem value="ACCEPTED">
                  {t('owner.appointments.statuses.ACCEPTED')}
                </SelectItem>
                <SelectItem value="REJECTED">
                  {t('owner.appointments.statuses.REJECTED')}
                </SelectItem>
                <SelectItem value="CANCELLED">
                  {t('owner.appointments.statuses.CANCELLED')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="upcoming">
            {t('owner.appointments.tabs.upcoming', { count: upcoming.length })}
          </TabsTrigger>
          <TabsTrigger value="past">
            {t('owner.appointments.tabs.past', { count: past.length })}
          </TabsTrigger>
          <TabsTrigger value="all">
            {t('owner.appointments.tabs.all', { count: appointments.length })}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcoming.length === 0 ? (
            <EmptyState message={t('owner.appointments.empty.upcoming')} />
          ) : (
            upcoming.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4 space-y-3">
          {past.length === 0 ? (
            <EmptyState message={t('owner.appointments.empty.past')} />
          ) : (
            past.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
          )}
        </TabsContent>
        <TabsContent value="all" className="mt-4 space-y-3">
          {appointments.length === 0 ? (
            <EmptyState message={t('owner.appointments.empty.all')} />
          ) : (
            appointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
          )}
        </TabsContent>
      </Tabs>

      {selected && (
        <AppointmentDetailSheet
          appointment={selected}
          onClose={() => setSelectedId(null)}
          onAccept={(id) => handleStatus(id, 'ACCEPTED')}
          onReject={(id) => handleStatus(id, 'REJECTED')}
          onCancel={(id) => handleStatus(id, 'CANCELLED')}
          isUpdating={updateStatusMutation.isPending}
        />
      )}
    </>
  );
}

function EmptyState({ message }) {
  return (
    <Card className="border-dashed">
      <CardContent className="py-10 text-center">
        <p className="text-muted-foreground text-sm">{message}</p>
      </CardContent>
    </Card>
  );
}
