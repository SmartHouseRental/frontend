import { House, Info, Calendar, Star, Check, EyeOff, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
function OverviewTab() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <House />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Total Assets</span>
          </div>
          <h3 className="text-primary text-3xl font-black">8</h3>
          <p className="text-primary/60 text-sm font-medium">Active Listings</p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="bg-accent/10 text-accent rounded-lg p-2">
              <Calendar />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Engagement</span>
          </div>
          <h3 className="text-primary text-3xl font-black">45000</h3>
          <p className="text-primary/60 text-sm font-medium">Total Appointments</p>
        </Card>
        <Card className="border-primary/10 gap-0 rounded-xl p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded-lg bg-yellow-400/10 p-2 text-yellow-600">
              <Star />
            </span>
            <span className="text-primary/40 text-[10px] font-bold uppercase">Reputation</span>
          </div>
          <h3 className="text-primary text-3xl font-black">4.8</h3>
          <p className="text-primary/60 text-sm font-medium">Average Rating</p>
        </Card>
      </div>

      <Card className="border-primary/10 gap-0 overflow-hidden py-0">
        <div className="bg-primary/5 border-primary/10 border-b px-6 py-4">
          <h3 className="text-primary flex items-center gap-2 font-bold">
            <Info className="text-[18px]" />
            Personal Details
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 p-8 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Email Address
            </label>
            <p className="text-primary font-bold">dawit.gebre@example.et</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Phone Number
            </label>
            <p className="text-primary font-bold">+251 911 234 567</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Registration Date
            </label>
            <p className="text-primary font-bold">October 14, 2023</p>
          </div>
          <div className="space-y-1">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Preferred Language
            </label>
            <p className="text-primary font-bold">Amharic (Primary), English</p>
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-primary/40 text-[10px] font-bold tracking-widest uppercase">
              Residential Address
            </label>
            <p className="text-primary font-bold">
              Bole Sub City, House #452, Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default OverviewTab;
