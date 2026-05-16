import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useUploadDocuments } from '../hooks/useUploadDocuments';
import { useDocuments } from '../hooks/useDocuments';

export function VerificationForm({ profile }) {
    const { data: documentData, isLoading: docsLoading } = useDocuments();
    const uploadDocumentsMutation = useUploadDocuments();

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

        const formData = new FormData();
        formData.append(type, file);
        uploadDocumentsMutation.mutate(formData);

        // Reset input
        e.target.value = null;
    };

    // Helper to find document status in response
    const getDocInfo = (docType) => {
        const uploadedDocs = documentData?.data?.uploadedFiles || [];
        const doc = uploadedDocs.find(d => d.documentType === docType);
        return doc;
    };

    const steps = [
        { label: 'Email Verified', status: profile?.emailVerified ? 'complete' : 'pending' },
        {
            label: 'Documents Uploaded',
            status: documentData?.data?.uploadedFiles?.length > 0 ? (documentData?.data?.overallStatus === 'verified' ? 'complete' : 'current') : 'pending'
        },
        { label: 'Admin Review', status: documentData?.data?.overallStatus === 'pending' ? 'current' : (documentData?.data?.overallStatus === 'verified' ? 'complete' : 'pending') },
        { label: 'Verified Owner', status: profile?.isVerified ? 'complete' : 'pending' },
    ];

    return (
        <div className="space-y-6">
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
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Upload documents to verify your identity and property ownership.
                    </p>

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
                            const isVerified = documentData?.data?.overallStatus === 'verified' || documentData?.data?.overallStatus === 'approved';

                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border p-4 transition-all ${isVerified ? 'border-emerald-200 bg-emerald-50/30' : (doc ? 'border-primary/20 bg-primary/5' : 'border-amber-200 bg-amber-50/30')}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {isVerified ? (
                                                <CheckCircle2 size={18} className="text-emerald-500" />
                                            ) : doc ? (
                                                <CheckCircle2 size={18} className="text-primary" />
                                            ) : (
                                                <AlertCircle size={18} className="text-amber-500" />
                                            )}
                                            <div>
                                                <p className="text-foreground text-sm font-bold">{config.label}</p>
                                                <p className="text-muted-foreground mt-0.5 text-xs">{config.description}</p>
                                                {doc && (
                                                    <p className="text-muted-foreground/70 mt-0.5 text-[10px]">
                                                        📎 {doc.file}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${isVerified ? 'bg-emerald-100 text-emerald-700'
                                                        : doc ? 'bg-primary/20 text-primary'
                                                            : 'bg-amber-100 text-amber-700'
                                                    }`}
                                            >
                                                {isVerified ? 'Verified' : doc ? 'Uploaded' : 'Pending'}
                                            </span>
                                            <label className="cursor-pointer">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="pointer-events-none h-7 gap-1 text-xs"
                                                    disabled={isVerified}
                                                >
                                                    <Upload size={12} /> {doc ? 'Replace' : 'Upload'}
                                                </Button>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    ref={config.ref}
                                                    onChange={(e) => handleFileUpload(config.type, e)}
                                                    disabled={isVerified || uploadDocumentsMutation.isPending}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    {!doc && (
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
