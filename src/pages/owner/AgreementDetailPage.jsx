import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router';
import StatusBadge from '@/components/StatusBadge';
import PageHeader from '@/components/PageHeader';
import {
    FileText, Download, CheckCircle2, Clock, DollarSign,
    MessageSquare, Send, User, MapPin, Calendar, AlertCircle,
    MoreVertical, Eye, Upload, Image as ImageIcon, XCircle,
    ArrowRight, Loader2, Shield, AlertTriangle,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const agreementStatusFlow = [
    { key: 'draft', label: 'Draft', icon: FileText, description: 'Agreement created' },
    { key: 'pending_renter', label: 'Pending Renter', icon: Clock, description: 'Waiting for renter acceptance' },
    { key: 'pending_owner', label: 'Pending Payment', icon: DollarSign, description: 'Awaiting payment confirmation' },
    { key: 'active', label: 'Active', icon: CheckCircle2, description: 'Agreement is in effect' },
];

const paymentHistory = [
    { month: 'March 2026', amount: '45,000 ETB', date: 'Mar 5, 2026', status: 'Confirmed' },
    { month: 'February 2026', amount: '45,000 ETB', date: 'Feb 5, 2026', status: 'Confirmed' },
    { month: 'January 2026', amount: '45,000 ETB', date: 'Jan 15, 2026', status: 'Confirmed' },
];

const initialMessages = [
    { id: 1, sender: 'Mulugeta K.', text: 'Hello, I have a question about the parking space. Is it included in the agreement?', time: '2 days ago', isOwner: false },
    { id: 2, sender: 'You', text: 'Yes, parking for one vehicle is included. I can add a second spot for an additional 3,000 ETB/month.', time: '2 days ago', isOwner: true },
    { id: 3, sender: 'Mulugeta K.', text: 'Perfect, one spot is enough. Thank you!', time: '1 day ago', isOwner: false },
];

function AgreementDetailPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [showTerminateConfirm, setShowTerminateConfirm] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('active');
    const [paymentProof, setPaymentProof] = useState(null);
    const [isConfirmingPayment, setIsConfirmingPayment] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        setMessages(prev => [...prev, {
            id: Date.now(), sender: 'You', text: newMessage,
            time: 'Just now', isOwner: true,
        }]);
        setNewMessage('');
    };

    const handlePaymentProofUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPaymentProof({ name: file.name, url: URL.createObjectURL(file), type: file.type });
        }
    };

    const handleConfirmPayment = () => {
        setIsConfirmingPayment(true);
        setTimeout(() => {
            setIsConfirmingPayment(false);
            setPaymentConfirmed(true);
            if (currentStatus === 'pending_owner') {
                setCurrentStatus('active');
            }
        }, 1500);
    };

    const totalPaid = 135000;
    const totalContract = 540000;
    const progressPercent = Math.round((totalPaid / totalContract) * 100);

    const currentStepIndex = agreementStatusFlow.findIndex(s => s.key === currentStatus);

    const statusMap = {
        Active: 'bg-emerald-100 text-emerald-700',
        Draft: 'bg-slate-100 text-slate-600',
        'Pending Renter': 'bg-amber-100 text-amber-700',
        'Pending Payment': 'bg-blue-100 text-blue-700',
        Terminated: 'bg-rose-100 text-rose-700',
    };

    const displayStatus = agreementStatusFlow.find(s => s.key === currentStatus)?.label || currentStatus;

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            {/* Header */}
            <PageHeader
                title="Agreement #AG-2001"
                description="Bole Skyline Apartment — Mulugeta Kebede"
                backLink="/owner/agreements"
            >
                <StatusBadge status={displayStatus} statusMap={statusMap} />
                <Button variant="outline" className="gap-2"><Download size={14} /> Download PDF</Button>
                {!showTerminateConfirm ? (
                    <Button variant="outline" className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/5" onClick={() => setShowTerminateConfirm(true)}>Terminate</Button>
                ) : (
                    <div className="flex items-center gap-2 animate-in fade-in-0">
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><AlertCircle size={12} /> Are you sure?</span>
                        <Button variant="destructive" size="sm" className="h-8 text-xs" onClick={() => { setCurrentStatus('terminated'); setShowTerminateConfirm(false); }}>Yes, Terminate</Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setShowTerminateConfirm(false)}>Cancel</Button>
                    </div>
                )}
            </PageHeader>

            {/* Status Timeline */}
            <Card>
                <CardContent>
                    <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2"><Shield size={16} /> Agreement Status</h3>
                    <div className="flex items-center justify-between">
                        {agreementStatusFlow.map((step, i) => {
                            const Icon = step.icon;
                            const isCompleted = i < currentStepIndex;
                            const isActive = i === currentStepIndex;
                            const isPending = i > currentStepIndex;
                            return (
                                <div key={step.key} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${isCompleted ? 'bg-emerald-500 text-white shadow-md' :
                                                isActive ? 'bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 scale-110' :
                                                    'bg-muted text-muted-foreground'
                                            }`}>
                                            {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                                        </div>
                                        <p className={`text-[11px] font-bold mt-2 ${isActive ? 'text-primary' : isCompleted ? 'text-emerald-600' : 'text-muted-foreground'}`}>{step.label}</p>
                                        <p className="text-[9px] text-muted-foreground max-w-20">{step.description}</p>
                                    </div>
                                    {i < agreementStatusFlow.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors ${isCompleted ? 'bg-emerald-400' : 'bg-muted'}`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Demo controls */}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex-1">Demo: Change  Status</p>
                        {agreementStatusFlow.map(s => (
                            <button
                                key={s.key}
                                onClick={() => { setCurrentStatus(s.key); setPaymentConfirmed(false); }}
                                className={`text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${currentStatus === s.key ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Agreement Terms */}
                    <Card>
                        <CardContent className="space-y-5">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><FileText size={16} /> Agreement Terms</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: 'Property', value: 'Bole Skyline Apartment', sub: 'Bole, Addis Ababa', subIcon: MapPin },
                                    { label: 'Renter', value: 'Mulugeta Kebede', sub: 'mulugeta.k@email.com' },
                                    { label: 'Start Date', value: 'January 15, 2026', icon: Calendar },
                                    { label: 'End Date', value: 'January 14, 2027', icon: Calendar },
                                    { label: 'Monthly Rent', value: '45,000 ETB', highlight: true },
                                    { label: 'Security Deposit', value: '90,000 ETB' },
                                    { label: 'Duration', value: '12 Months' },
                                    { label: 'Payment Day', value: '5th of each month' },
                                ].map((item, i) => {
                                    const SubIcon = item.subIcon;
                                    const ItemIcon = item.icon;
                                    return (
                                        <div key={i}>
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.label}</p>
                                            <p className={`text-sm font-bold mt-1 flex items-center gap-1 ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                                                {ItemIcon && <ItemIcon size={12} />} {item.value}
                                            </p>
                                            {item.sub && <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">{SubIcon && <SubIcon size={10} />} {item.sub}</p>}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Proof Upload — Only visible in pending_owner state */}
                    {(currentStatus === 'pending_owner' || paymentProof) && (
                        <Card className="border-blue-200 bg-blue-50/30 animate-in fade-in-0 slide-in-from-top-2 duration-300">
                            <CardContent className="space-y-4">
                                <h3 className="font-bold text-foreground flex items-center gap-2">
                                    <Upload size={16} className="text-blue-600" /> Payment Confirmation
                                </h3>
                                <p className="text-xs text-muted-foreground -mt-2">
                                    Upload payment proof and confirm receipt to activate this agreement.
                                </p>

                                {!paymentProof ? (
                                    <label className="flex h-32 rounded-xl border-2 border-dashed border-blue-300 items-center justify-center gap-3 text-muted-foreground hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer">
                                        <ImageIcon size={24} />
                                        <div>
                                            <p className="text-sm font-medium">Upload payment screenshot or receipt</p>
                                            <p className="text-[10px] text-muted-foreground">JPG, PNG, PDF up to 5MB</p>
                                        </div>
                                        <input type="file" accept="image/*,.pdf" onChange={handlePaymentProofUpload} className="hidden" />
                                    </label>
                                ) : (
                                    <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-white/80 p-4">
                                        {paymentProof.type?.startsWith('image/') ? (
                                            <img src={paymentProof.url} alt="Payment proof" className="h-20 w-20 rounded-lg object-cover" />
                                        ) : (
                                            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-muted">
                                                <FileText size={28} className="text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-foreground">{paymentProof.name}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">Uploaded successfully</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setPaymentProof(null)}>
                                            <XCircle size={16} />
                                        </Button>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <Button
                                        className="gap-2 flex-1"
                                        onClick={handleConfirmPayment}
                                        disabled={!paymentProof || isConfirmingPayment || paymentConfirmed}
                                    >
                                        {isConfirmingPayment ? (
                                            <><Loader2 size={14} className="animate-spin" /> Confirming...</>
                                        ) : paymentConfirmed ? (
                                            <><CheckCircle2 size={14} /> Payment Confirmed</>
                                        ) : (
                                            <><CheckCircle2 size={14} /> Confirm Payment Received</>
                                        )}
                                    </Button>
                                </div>

                                {paymentConfirmed && (
                                    <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 flex items-start gap-2 animate-in fade-in-0">
                                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold text-emerald-700">Payment confirmed successfully!</p>
                                            <p className="text-[10px] text-emerald-600">Agreement is now active. Confirmed at {new Date().toLocaleString()}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment History */}
                    <Card>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-foreground flex items-center gap-2"><DollarSign size={16} /> Payment History</h3>
                                <Link to="/owner/payments" className="text-xs text-primary font-bold hover:underline">View All</Link>
                            </div>
                            <div className="space-y-3">
                                {paymentHistory.map((p, i) => (
                                    <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0 hover:bg-muted/10 rounded-lg px-2 -mx-2 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                                                <CheckCircle2 size={16} className="text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{p.month}</p>
                                                <p className="text-xs text-muted-foreground">Paid on {p.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-foreground">{p.amount}</p>
                                                <p className="text-[10px] font-bold text-emerald-500 uppercase">{p.status}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <MoreVertical size={14} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Eye size={14} /> View Receipt</DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 cursor-pointer"><Download size={14} /> Download PDF</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Renter Info */}
                    <Card>
                        <CardContent className="space-y-4">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><User size={16} /> Renter Info</h3>
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">M</div>
                                <div>
                                    <p className="font-bold text-foreground">Mulugeta Kebede</p>
                                    <p className="text-xs text-muted-foreground">mulugeta.k@email.com</p>
                                    <p className="text-xs text-muted-foreground">+251 91 234 5678</p>
                                </div>
                            </div>
                            <Link to="/owner/messages">
                                <Button variant="outline" className="w-full gap-2 mt-2"><MessageSquare size={14} /> Send Message</Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Agreement Summary */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground text-sm">Agreement Summary</h3>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Total Paid</span>
                                    <span className="font-bold text-sm text-primary">{totalPaid.toLocaleString()} ETB</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Remaining</span>
                                    <span className="font-bold text-sm">9 months</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-1"><CheckCircle2 size={12} /> Up to date</span>
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                                    <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                                <p className="text-[10px] text-muted-foreground text-center mt-1.5">3 of 12 payments completed ({progressPercent}%)</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages */}
                    <Card>
                        <CardContent className="space-y-3">
                            <h3 className="font-bold text-foreground flex items-center gap-2"><MessageSquare size={16} /> Messages</h3>
                            <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                                {messages.map((m) => (
                                    <div key={m.id} className={`flex flex-col ${m.isOwner ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[85%] rounded-xl px-3 py-2 ${m.isOwner ? 'bg-primary/10 text-foreground' : 'bg-muted text-foreground'}`}>
                                            <p className="text-xs font-semibold mb-0.5">{m.sender}</p>
                                            <p className="text-xs leading-relaxed">{m.text}</p>
                                        </div>
                                        <p className="text-[10px] text-muted-foreground mt-1">{m.time}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-border">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type a message..."
                                    className="flex-1 h-8 rounded-lg border border-border bg-muted/30 px-3 text-xs outline-none focus:ring-1 focus:ring-primary/30"
                                />
                                <Button size="icon" className="h-8 w-8" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                    <Send size={14} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AgreementDetailPage;
