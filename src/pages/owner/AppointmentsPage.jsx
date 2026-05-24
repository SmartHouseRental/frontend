import { OwnerAppointmentsContent } from '@/features/appointments/components/OwnerAppointmentsContent';

function AppointmentsPage() {
  return (
    <div className="scrollbar-hide h-screen space-y-6 overflow-y-auto p-8">
      <div>
        <h2 className="text-foreground text-3xl font-extrabold tracking-tight">Appointments</h2>
        <p className="text-muted-foreground mt-1">
          Manage property visit requests and your schedule.
        </p>
      </div>
      <OwnerAppointmentsContent />
    </div>
  );
}

export default AppointmentsPage;
