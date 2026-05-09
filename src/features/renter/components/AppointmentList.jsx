import { Calendar as CalendarIcon, MapPin, Clock, XCircle, RotateCcw, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const initialAppointments = [
  {
    id: '1',
    propertyId: 'modern-villa-old-airport',
    propertyTitle: 'Modern Villa, Old Airport',
    address: 'Bole, Old Airport, Addis Ababa',
    date: '2026-05-15',
    time: '10:00 AM',
    status: 'Confirmed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVgURC1lpKm2NhTjoN7OKXfArljV4h3wLH6LpjWuPeGCTDtBV4kJ6qriA-GgEEHF6goYhJeqb-X1HUf1VAFWd3UGza05kHoGe5oin8TRXd4XbpTFnTYCD_yhWbtJvRw3xGH18_ymJt-97r6da6q_0I4Fi7xHoi5Yj8CB4Z_W5cmZx0S9tnPh2ZcqMF6zmzAB503SOjajS9edta0m4A1QiiqKhVLEpN3y9o1OzCZILWZefKYilnrTnmZvmQmpcWFj8hUaP_rQKBv34'
  }
];

export default function AppointmentList() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [cancellingApt, setCancellingApt] = useState(null);
  const [cancelNote, setCancelNote] = useState('');
  const navigate = useNavigate();

  const handleCancelSubmit = () => {
    setAppointments(appointments.filter(apt => apt.id !== cancellingApt.id));
    toast.success('Appointment Cancelled', {
      description: `Your visit to ${cancellingApt.propertyTitle} has been cancelled.`
    });
    setCancellingApt(null);
    setCancelNote('');
  };

  const handleReschedule = (propertyId) => {
    navigate(`/renter/schedule-visit/${propertyId}`, { state: { fromReschedule: true } });
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
          {appointments.length === 0 ? (
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
            appointments.map(apt => (
              <Card key={apt.id} className="overflow-hidden border-slate-200 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-40 sm:h-auto overflow-hidden">
                    <img src={apt.image} alt={apt.propertyTitle} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="flex-1 p-5">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <CardTitle className="text-lg font-bold">{apt.propertyTitle}</CardTitle>
                          <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="line-clamp-1">{apt.address}</span>
                          </div>
                        </div>
                        <Badge className="bg-emerald-500">{apt.status}</Badge>
                      </div>

                      <div className="flex gap-4 mt-2 text-sm font-medium">
                        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                          <CalendarIcon className="h-4 w-4 text-primary" />
                          <span>{apt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-lg">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{apt.time}</span>
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
                        >
                          <XCircle className="h-4 w-4" />
                          Cancel Visit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="past" className="text-center py-12 text-muted-foreground">
          <p>No past visits found.</p>
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
                Are you sure you want to cancel your visit to <span className="font-semibold text-foreground">{cancellingApt.propertyTitle}</span>? 
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
                >
                  Go Back
                </Button>
                <Button 
                  className="flex-1 bg-destructive hover:bg-destructive/90 rounded-xl"
                  onClick={handleCancelSubmit}
                >
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
