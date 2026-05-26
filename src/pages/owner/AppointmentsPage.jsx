import { OwnerAppointmentsContent } from '@/features/appointments/components/OwnerAppointmentsContent';
import { useTranslation } from 'react-i18next';

function AppointmentsPage() {
  const { t } = useTranslation();

  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div>
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">
          {t('owner.appointments.title')}
        </h2>
        <p className="text-muted-foreground mt-1">
          {t('owner.appointments.subtitle')}
        </p>
      </div>
      <OwnerAppointmentsContent />
    </div>
  );
}

export default AppointmentsPage;
