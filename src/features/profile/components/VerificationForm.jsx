import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Upload, CheckCircle2, AlertCircle, Loader2, X, ExternalLink, ZoomIn } from 'lucide-react';

function DocModal({ url, title, onClose }) {
    if (!url) return null;
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-card relative max-h-[90vh] max-w-3xl w-full overflow-hidden rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h4 className="text-primary font-bold">{title}</h4>
                    <div className="flex gap-2">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:bg-muted rounded-lg p-2 transition-colors"
                        >
                            <ExternalLink size={16} />
                        </a>
                        <button onClick={onClose} className="hover:bg-muted rounded-lg p-2 transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center overflow-auto bg-zinc-950 p-4">
                    <img
                        src={url}
                        alt={title}
                        className="max-h-[70vh] w-auto rounded-lg object-contain shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
}
import { useUploadDocuments } from '../hooks/useUploadDocuments';
import { useDocuments } from '../hooks/useDocuments';
import { getImageUrl } from '@/lib/utils';

export function VerificationForm({ profile }) {
    const { data: documentData, isLoading: docsLoading } = useDocuments();
    const uploadDocumentsMutation = useUploadDocuments();

    const [selectedFiles, setSelectedFiles] = useState({});
    const [previews, setPreviews] = useState({});
    const [modalConfig, setModalConfig] = useState(null);

    // Create refs for multiple inputs
    const nationalIdFrontRef = useRef(null);
    const nationalIdBackRef = useRef(null);
    const ownerPhotoRef = useRef(null);

    const handleFileUpload = (type, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be under 5MB');
            return;
        }

        setSelectedFiles(prev => ({ ...prev, [type]: file }));

        const previewUrl = URL.createObjectURL(file);
        setPreviews(prev => ({ ...prev, [type]: previewUrl }));

        e.target.value = null; // Reset input
    };

    const handleBundleUpload = () => {
        const formData = new FormData();
        Object.entries(selectedFiles).forEach(([key, file]) => {
            formData.append(key, file);
        });
        uploadDocumentsMutation.mutate(formData, {
            onSuccess: () => {
                setSelectedFiles({});
                setPreviews({});
            }
        });
    };

    useEffect(() => {
        return () => {
            Object.values(previews).forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    // Helper to find document status in response
    const getDocInfo = (docType) => {
        const uploadedDocs = documentData?.data?.uploadedFiles || [];
        return uploadedDocs.find(d => d.documentType === docType);
    };

    const isMissingFiles = Object.keys(selectedFiles).length < 3;

    const docStatus = documentData?.data?.status || documentData?.data?.overallStatus;
    const steps = [
        { label: 'Email Verified', status: profile?.emailVerified ? 'complete' : 'pending' },
        {
            label: 'Documents Uploaded',
            status: documentData?.data ? (docStatus === 'approved' || docStatus === 'verified' ? 'complete' : 'current') : 'pending'
        },
        { label: 'Admin Review', status: docStatus === 'under_review' || docStatus === 'approved' || docStatus === 'verified' ? 'current' : (docStatus === 'rejected' || docStatus === 'resubmit' ? 'complete' : 'pending') },
        { label: 'Verified Owner', status: profile?.isVerified || docStatus === 'approved' || docStatus === 'verified' ? 'complete' : 'pending' },
    ];

    return (
        <div className="space-y-6">
            {modalConfig && (
                <DocModal
                    url={modalConfig.url}
                    title={modalConfig.title}
                    onClose={() => setModalConfig(null)}
                />
            )}
            <Card>
                <CardContent className="space-y-4 pt-6">
                    <h3 className="text-foreground flex items-center gap-2 font-bold">
                        <Shield size={16} /> Verification Status
                    </h3>
                    <div className="flex items-center gap-0">
                        {steps.map((step, i, arr) => (
                            <div key={i} className="flex flex-1 items-center last:flex-none">
                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${step.status === 'complete'
                                            ? 'bg-emerald-500 text-white'
                                            : step.status === 'current'
                                                ? 'bg-primary text-primary-foreground ring-primary/20 ring-4'
                                                : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {step.status === 'complete' ? <CheckCircle2 size={14} /> : i + 1}
                                    </div>
                                    <p
                                        className={`mt-1.5 max-w-16 text-[10px] font-semibold ${step.status === 'current' ? 'text-primary' : step.status === 'complete' ? 'text-emerald-600' : 'text-muted-foreground'}`}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                                {i < arr.length - 1 && (
                                    <div
                                        className={`mx-1 h-0.5 flex-1 rounded-full ${step.status === 'complete' ? 'bg-emerald-400' : 'bg-muted'}`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-5 pt-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-foreground flex items-center gap-2 font-bold">
                            <Shield size={16} /> Verification Documents
                        </h3>
                        {uploadDocumentsMutation.isPending && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="animate-spin" size={14} /> Uploading...
                            </div>
                        )}
                        {!uploadDocumentsMutation.isPending && (
                            <Button
                                onClick={handleBundleUpload}
                                disabled={isMissingFiles || (documentData?.data && !canUpload)}
                                size="sm"
                                className="font-bold"
                            >
                                Submit All Documents
                            </Button>
                        )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Upload all three documents simultaneously to verify your identity and property ownership.
                    </p>

                    {/* Admin Note Display */}
                    {documentData?.data?.note && (
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-primary mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-primary text-xs font-bold uppercase tracking-wider">
                                        Admin Note
                                    </p>
                                    <p className="text-foreground mt-1 text-sm">
                                        {documentData.data.note}
                                    </p>
                                    {documentData.data.reviewedAt && (
                                        <p className="text-muted-foreground mt-2 text-[10px]">
                                            Reviewed on {new Date(documentData.data.reviewedAt).toLocaleDateString('en-US', { 
                                                month: 'long', 
                                                day: 'numeric', 
                                                year: 'numeric' 
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {docsLoading ? (
                        <div className="py-8 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
                    ) : (
                        [
                            {
                                type: 'nationalIdFront',
                                docType: 'NATIONAL_ID_FRONT',
                                label: 'National ID - Front',
                                description: 'Government-issued photo ID',
                                ref: nationalIdFrontRef
                            },
                            {
                                type: 'nationalIdBack',
                                docType: 'NATIONAL_ID_BACK',
                                label: 'National ID - Back',
                                description: 'Back side of ID or Valid business license',
                                ref: nationalIdBackRef
                            },
                            {
                                type: 'ownerPhoto',
                                docType: 'OWNER_PHOTO',
                                label: 'Your Photo',
                                description: 'Proof of you own the ID',
                                ref: ownerPhotoRef
                            },
                        ].map((config, i) => {
                            const doc = getDocInfo(config.docType);
                            const docStatus = documentData?.data?.status || documentData?.data?.overallStatus;
                            const isVerified = docStatus === 'approved' || docStatus === 'verified';
                            const canUpload = !isVerified && (docStatus === 'pending' || docStatus === 'resubmit' || docStatus === 'rejected' || !docStatus);

                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border p-4 transition-all ${isVerified ? 'border-emerald-200 bg-emerald-50/30' : (doc ? 'border-primary/20 bg-primary/5' : 'border-amber-200 bg-amber-50/30')}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {isVerified ? (
                                                <CheckCircle2 size={18} className="text-emerald-500" />
                                            ) : (doc || selectedFiles[config.type]) ? (
                                                <CheckCircle2 size={18} className="text-primary" />
                                            ) : (
                                                <AlertCircle size={18} className="text-amber-500" />
                                            )}
                                            <div>
                                                <p className="text-foreground text-sm font-bold">{config.label}</p>
                                                <p className="text-muted-foreground mt-0.5 text-xs">{config.description}</p>
                                                {(doc || selectedFiles[config.type]) && (
                                                    <p className="text-muted-foreground/70 mt-0.5 text-[10px]">
                                                        📎 {selectedFiles[config.type]?.name || doc?.file}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${isVerified ? 'bg-emerald-100 text-emerald-700'
                                                    : (doc || selectedFiles[config.type]) ? 'bg-primary/20 text-primary'
                                                        : 'bg-amber-100 text-amber-700'
                                                    }`}
                                            >
                                                {isVerified ? 'Verified' : (doc || selectedFiles[config.type]) ? 'Selected' : 'Pending'}
                                            </span>
                                            <label className="cursor-pointer">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="pointer-events-none h-7 gap-1 text-xs"
                                                    disabled={!canUpload}
                                                >
                                                    <Upload size={12} /> {(doc || selectedFiles[config.type]) ? 'Replace' : 'Upload'}
                                                </Button>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    ref={config.ref}
                                                    onChange={(e) => handleFileUpload(config.type, e)}
                                                    disabled={!canUpload || uploadDocumentsMutation.isPending}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Preview Section */}
                                    {(previews[config.type] || doc?.url) && (
                                        <div
                                            className="mt-4 h-32 w-full rounded-lg overflow-hidden border border-primary/10 relative group cursor-pointer"
                                            onClick={() => setModalConfig({ url: previews[config.type] || getImageUrl(doc?.url), title: config.label })}
                                        >
                                            <img
                                                src={previews[config.type] || getImageUrl(doc?.url)}
                                                alt={`${config.label} Preview`}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-zinc-800">
                                                    <ZoomIn size={14} /> View Full Size
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!(doc || selectedFiles[config.type]) && canUpload && (
                                        <div
                                            className="text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 mt-3 flex h-20 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-amber-300 transition-all"
                                            onClick={() => config.ref.current?.click()}
                                        >
                                            <Upload size={16} />
                                            <span className="text-xs font-medium">Click to upload</span>
                                            <span className="text-muted-foreground/60 text-[10px]">
                                                PDF, JPG, PNG up to 5MB
                                            </span>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
