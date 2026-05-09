import { User, Mail, Phone, Save, Camera, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfileSettings() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your personal information.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="font-bold h-11 px-8 shadow-lg shadow-primary/20">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-none shadow-sm bg-white text-center p-8">
            <div className="relative mx-auto w-32 h-32 mb-6 group">
              <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                <User className="h-12 w-12 text-slate-300" />
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">John Doe</h3>
            <p className="text-sm text-muted-foreground font-medium">Renter</p>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <Card className="border-none shadow-sm bg-white p-8">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-2xl font-bold text-slate-900">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                  <Input placeholder="John Doe" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
                  <Input placeholder="+1 (555) 000-0000" className="h-12 rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
