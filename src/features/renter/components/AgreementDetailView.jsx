import { FileText, Download, User, MapPin, Calendar, CreditCard, Clock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useParams } from 'react-router';

export default function AgreementDetailView() {
  const { id } = useParams();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link to="/renter/agreements">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Agreement #{id}</h1>
          <Badge className="bg-emerald-500 mt-1">Active</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">Sunset Boulevard Villa</CardTitle>
                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1 text-sm font-medium">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>101 Sunset Blvd, Malibu, CA</span>
                    </div>
                  </div>
                </div>
                <Button className="font-bold">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="space-y-6">
                <h3 className="font-bold text-slate-900">Agreement Terms</h3>
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3"><div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> Monthly rent must be paid by the 5th.</li>
                  <li className="flex gap-3"><div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> Security deposit is refundable upon termination.</li>
                  <li className="flex gap-3"><div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" /> No pets allowed without prior consent.</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-white p-6">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Property Owner</h4>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                <User className="h-6 w-6 text-slate-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Sarah Jenkins</p>
                <p className="text-xs text-muted-foreground">Owner / Host</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
