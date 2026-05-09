import { FileText, Download, User, MapPin, Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router';

const mockAgreements = [
  {
    id: '101',
    propertyTitle: 'Sunset Boulevard Villa',
    address: '101 Sunset Blvd, Malibu, CA',
    ownerName: 'Sarah Jenkins',
    startDate: '2026-06-01',
    monthlyRent: '$4,500',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
  }
];

export default function AgreementList() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Agreements</h1>
        <p className="text-muted-foreground mt-1">Review and manage your rental contracts.</p>
      </div>

      <div className="grid gap-6">
        {mockAgreements.map((agreement) => (
          <Card key={agreement.id} className="overflow-hidden border-slate-200">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 relative overflow-hidden">
                <img src={agreement.image} alt={agreement.propertyTitle} className="h-full w-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-emerald-500">{agreement.status}</Badge>
                </div>
              </div>
              
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{agreement.propertyTitle}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{agreement.address}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{agreement.monthlyRent}</p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase">per month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Owner</p>
                      <span className="text-sm font-semibold">{agreement.ownerName}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">Starts</p>
                      <span className="text-sm font-semibold">{agreement.startDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <Button variant="outline" size="sm" className="font-semibold">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                  <Link to={`/renter/agreements/${agreement.id}`}>
                    <Button variant="ghost" className="font-bold text-primary">
                      Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
