import { OwnerAppointmentsContent } from './OwnerAppointmentsContent';

/** Appointments for a single property on owner property detail. */
export function PropertyAppointmentsSection({ propertyId }) {
  if (!propertyId) return null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-foreground text-lg font-bold">Visit requests</h3>
        <p className="text-muted-foreground text-sm">
          Appointments scheduled for this property.
        </p>
      </div>
      <OwnerAppointmentsContent propertyIdFilter={propertyId} />
    </div>
  );
}
