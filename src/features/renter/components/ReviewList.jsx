import { Star, Calendar, MessageSquare, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const mockReviews = [
  {
    id: '1',
    propertyTitle: 'Modern Apartment in Downtown',
    rating: 5,
    comment: 'Absolutely amazing stay! The views were breathtaking.',
    date: '2026-05-02',
    canEdit: true
  }
];

export default function ReviewList() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Reviews</h1>
        <p className="text-muted-foreground mt-1">Manage the feedback you've shared.</p>
      </div>

      <div className="grid gap-6">
        {mockReviews.map((review) => (
          <Card key={review.id} className="border-none shadow-sm bg-white overflow-hidden group">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors cursor-pointer mb-1">{review.propertyTitle}</h3>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="relative bg-slate-50/50 p-6 rounded-2xl border border-slate-100 italic text-slate-700 leading-relaxed text-sm">
                    "{review.comment}"
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
