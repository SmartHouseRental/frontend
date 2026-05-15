import { Calendar as CalendarIcon, MapPin, Clock, XCircle, RotateCcw, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppointments, useCancelAppointment } from '../../visits/hooks/useAppointments';

export default function AppointmentList() {
  const { data: appointments, isLoading, isError, error } = useAppointments();
  const cancelMutation = useCancelAppointment();
  
  const [cancellingApt, setCancellingApt] = useState(null);
  const [cancelNote, setCancelNote] = useState('');
  const navigate = useNavigate();

  const handleCancelSubmit = async () => {
    try {
      await cancelMutation.mutateAsync(cancellingApt.id);
      setCancellingApt(null);
      setCancelNote('');
    } catch (err) {
      // Error handled in mutation
    }
  };

  const handleReschedule = (propertyId) => {
    navigate(`/renter/schedule-visit/${propertyId}`, { state: { fromReschedule: true } });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">Failed to load appointments</p>
        <p className="text-muted-foreground text-sm">{error?.message || 'Please try again later'}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  const upcoming = appointments?.filter(apt => new Date(apt.startsAt) > new Date()) || [];
  const past = appointments?.filter(apt => new Date(apt.startsAt) <= new Date()) || [];

  const renderAppointmentCard = (apt) => {
    const property = apt.property;
    const propertyTitle = typeof property?.title === 'object' ? property.title.en : (property?.title || "Property Details");
    const propertyImage = property?.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

    return (
      <Card key={apt.id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-all">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 h-40 sm:h-auto overflow-hidden">
            <img src={propertyImage} alt={propertyTitle} className="w-full h-full object-cover" />
          </div>
          <CardContent className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <CardTitle className="text-lg font-bold">{propertyTitle}</CardTitle>
                  <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{property?.address || property?.location || "Address not available"}</span>
                  </div>
                </div>
                <Badge className={apt.status === 'ACCEPTED' ? 'bg-emerald-500' : apt.status === 'REJECTED' ? 'bg-destructive' : 'bg-slate-500'}>
                  {apt.status}
                </Badge>
              </div>

              <div className="flex gap-4 mt-2 text-sm font-medium">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  <span>{new Date(apt.startsAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{new Date(apt.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 flex flex-wrap gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none gap-2 rounded-lg border-primary/20 text-primary hover:bg-primary/5"
                  onClick={() => handleReschedule(apt.propertyId)}
                >
                  <RotateCcw className="h-4 w-4" />
                  Reschedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 sm:flex-none gap-2 rounded-lg border-destructive/20 text-destructive hover:bg-destructive/5"
                  onClick={() => setCancellingApt(apt)}
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending && cancellingApt?.id === apt.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  Cancel Visit
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Appointments</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage your property viewings.</p>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-slate-100/80 p-1 rounded-xl mb-6">
          <TabsTrigger value="upcoming" className="rounded-lg px-6 data-[state=active]:bg-white">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg px-6 data-[state=active]:bg-white">Past Visits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {upcoming.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
              <CalendarIcon className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold">No upcoming visits</h3>
              <p className="text-muted-foreground mt-2">You haven't scheduled any property visits yet.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-xl"
                onClick={() => navigate('/explore')}
              >
                Browse Properties
              </Button>
            </Card>
          ) : (
            upcoming.map(apt => renderAppointmentCard(apt))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {past.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No past visits found.</p>
            </div>
          ) : (
            past.map(apt => renderAppointmentCard(apt))
          )}
        </TabsContent>
      </Tabs>

      {/* Cancellation Modal Overlay */}
      {cancellingApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md animate-in fade-in zoom-in duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4 text-destructive">
                <AlertCircle className="h-6 w-6" />
                <h3 className="text-xl font-bold">Cancel Visit</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to cancel your visit to <span className="font-semibold text-foreground">
                  {typeof cancellingApt.property?.title === 'object' ? cancellingApt.property.title.en : (cancellingApt.property?.title || "this property")}
                </span>? 
                Please provide a reason for the owner.
              </p>
              
              <div className="space-y-2 mb-6">
                <label className="text-sm font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Cancellation Note
                </label>
                <Textarea 
                  placeholder="Reason for cancellation (e.g., Change of plans, found another property...)"
                  className="min-h-[100px] resize-none"
                  value={cancelNote}
                  onChange={(e) => setCancelNote(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setCancellingApt(null);
                    setCancelNote('');
                  }}
                  disabled={cancelMutation.isPending}
                >
                  Go Back
                </Button>
                <Button 
                  className="flex-1 bg-destructive hover:bg-destructive/90 rounded-xl"
                  onClick={handleCancelSubmit}
                  disabled={cancelMutation.isPending}
                >
                  {cancelMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Confirm Cancellation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
