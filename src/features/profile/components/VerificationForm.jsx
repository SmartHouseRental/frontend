import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Upload, CheckCircle2, AlertCircle, Loader2, X, ExternalLink, ZoomIn, Clock, EyeOff, RefreshCw, XCircle } from 'lucide-react';
import { useUploadDocuments } from '../hooks/useUploadDocuments';
import { useDocuments } from '../hooks/useDocuments';
import { getImageUrl } from '@/lib/utils';

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

export function VerificationForm({ profile }) {
    const { t } = useTranslation();
    const { data: documentData, isLoading: docsLoading } = useDocuments();
    const uploadDocumentsMutation = useUploadDocuments();

    const [selectedFiles, setSelectedFiles] = useState({});
    const [previews, setPreviews] = useState({});
    const [modalConfig, setModalConfig] = useState(null);

    const nationalIdFrontRef = useRef(null);
    const nationalIdBackRef = useRef(null);
    const ownerPhotoRef = useRef(null);

    const handleFileUpload = (type, e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert(t('owner.profile.verificationForm.fileSizeWarning'));
            return;
        }

        setSelectedFiles((prev) => ({ ...prev, [type]: file }));

        const previewUrl = URL.createObjectURL(file);
        setPreviews((prev) => ({ ...prev, [type]: previewUrl }));

        e.target.value = null;
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
            },
        });
    };

    useEffect(() => {
        return () => {
            Object.values(previews).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const getDocInfo = (docType) => {
        const uploadedDocs = documentData?.data?.uploadedFiles || [];
        return uploadedDocs.find((doc) => doc.documentType === docType);
    };

    const currentDocStatus = documentData?.data?.status || documentData?.data?.overallStatus;
    const normalizedDocStatus = currentDocStatus === 'verified' ? 'approved' : currentDocStatus;
    const hasDocuments = documentData?.data && (documentData?.data?.uploadedFiles?.length > 0 || normalizedDocStatus);
    const isVerified = normalizedDocStatus === 'approved' || profile?.isVerified;
    const canUpload = !isVerified && (normalizedDocStatus === 'pending' || normalizedDocStatus === 'resubmit' || normalizedDocStatus === 'rejected' || !normalizedDocStatus);
    const isMissingFiles = Object.keys(selectedFiles).length < 3;

    const statusConfig = {
        pending: { key: 'pending', icon: <Clock size={16} />, color: 'bg-amber-100 text-amber-700 border-amber-200' },
        under_review: { key: 'underReview', icon: <EyeOff size={16} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
        approved: { key: 'approved', icon: <CheckCircle2 size={16} />, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        rejected: { key: 'rejected', icon: <XCircle size={16} />, color: 'bg-red-100 text-red-700 border-red-200' },
        resubmit: { key: 'resubmit', icon: <RefreshCw size={16} />, color: 'bg-orange-100 text-orange-700 border-orange-200' },
    };

    const currentStatus = statusConfig[normalizedDocStatus] || statusConfig.pending;

    const steps = [
        { key: 'emailVerified', status: profile?.emailVerified ? 'complete' : 'pending' },
        { key: 'documentsUploaded', status: hasDocuments ? 'complete' : 'pending' },
        {
            key: 'adminReview',
            status: !hasDocuments
                ? 'pending'
                : normalizedDocStatus === 'pending' || normalizedDocStatus === 'under_review'
                    ? 'current'
                    : normalizedDocStatus === 'approved' || normalizedDocStatus === 'rejected' || normalizedDocStatus === 'resubmit'
                        ? 'complete'
                        : 'pending',
        },
        {
            key: 'verifiedOwner',
            status: isVerified ? 'complete' : normalizedDocStatus === 'rejected' || normalizedDocStatus === 'resubmit' ? 'error' : 'pending',
        },
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
                        <Shield size={16} /> {t('owner.profile.verificationForm.title')}
                    </h3>

                    {hasDocuments && (
                        <div className={`flex items-center gap-3 rounded-lg border p-4 ${currentStatus.color}`}>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50">
                                {currentStatus.icon}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold">{t(`owner.profile.verificationForm.statusLabels.${currentStatus.key}`)}</p>
                                <p className="text-muted-foreground text-xs">
                                    {t(`owner.profile.verificationForm.statusDescriptions.${normalizedDocStatus || 'pending'}`)}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center gap-0">
                        {steps.map((step, i, arr) => (
                            <div key={i} className="flex flex-1 items-center last:flex-none">
                                <div className="flex flex-col items-center text-center">
                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${step.status === 'complete'
                                            ? 'bg-emerald-500 text-white'
                                            : step.status === 'current'
                                                ? 'bg-primary text-primary-foreground ring-primary/20 ring-4'
                                                : step.status === 'error'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {step.status === 'complete' ? <CheckCircle2 size={14} /> : step.status === 'error' ? <XCircle size={14} /> : i + 1}
                                    </div>
                                    <p
                                        className={`mt-1.5 max-w-16 text-[10px] font-semibold ${step.status === 'current' ? 'text-primary' : step.status === 'complete' ? 'text-emerald-600' : step.status === 'error' ? 'text-red-600' : 'text-muted-foreground'}`}
                                    >
                                        {t(`owner.profile.verificationForm.steps.${step.key}`)}
                                    </p>
                                </div>
                                {i < arr.length - 1 && (
                                    <div
                                        className={`mx-1 h-0.5 flex-1 rounded-full ${step.status === 'complete' ? 'bg-emerald-400' : step.status === 'error' ? 'bg-red-400' : 'bg-muted'}`}
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
                            <Shield size={16} /> {t('owner.profile.verificationForm.documentsTitle')}
                        </h3>
                        {uploadDocumentsMutation.isPending && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Loader2 className="animate-spin" size={14} /> {t('owner.profile.verificationForm.uploading')}
                            </div>
                        )}
                        {!uploadDocumentsMutation.isPending && (
                            <Button
                                onClick={handleBundleUpload}
                                disabled={isMissingFiles || (documentData?.data && !canUpload)}
                                size="sm"
                                className="font-bold"
                            >
                                {t('owner.profile.verificationForm.submitAllDocuments')}
                            </Button>
                        )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                        {t('owner.profile.verificationForm.description')}
                    </p>

                    {(normalizedDocStatus === 'rejected' || normalizedDocStatus === 'resubmit') && documentData?.data?.note && (
                        <div className="rounded-lg border border-red-200 bg-red-50/50 p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-red-600 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-red-700 text-xs font-bold uppercase tracking-wider">
                                        {t('owner.profile.verificationForm.adminNote')}
                                    </p>
                                    <p className="text-foreground mt-1 text-sm">
                                        {documentData.data.note}
                                    </p>
                                    {documentData.data.reviewedAt && (
                                        <p className="text-muted-foreground mt-2 text-[10px]">
                                            {t('owner.profile.verificationForm.reviewedOn')} {new Date(documentData.data.reviewedAt).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
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
                                labelKey: 'nationalIdFront',
                                descriptionKey: 'nationalIdFrontDescription',
                                ref: nationalIdFrontRef,
                            },
                            {
                                type: 'nationalIdBack',
                                docType: 'NATIONAL_ID_BACK',
                                labelKey: 'nationalIdBack',
                                descriptionKey: 'nationalIdBackDescription',
                                ref: nationalIdBackRef,
                            },
                            {
                                type: 'ownerPhoto',
                                docType: 'OWNER_PHOTO',
                                labelKey: 'ownerPhoto',
                                descriptionKey: 'ownerPhotoDescription',
                                ref: ownerPhotoRef,
                            },
                        ].map((config, i) => {
                            const doc = getDocInfo(config.docType);
                            const docReady = Boolean(doc || selectedFiles[config.type]);
                            const docStatus = normalizedDocStatus;
                            const isDocumentVerified = docStatus === 'approved';

                            return (
                                <div
                                    key={i}
                                    className={`rounded-xl border p-4 transition-all ${isDocumentVerified ? 'border-emerald-200 bg-emerald-50/30' : docReady ? 'border-primary/20 bg-primary/5' : 'border-amber-200 bg-amber-50/30'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {isDocumentVerified ? (
                                                <CheckCircle2 size={18} className="text-emerald-500" />
                                            ) : docReady ? (
                                                <CheckCircle2 size={18} className="text-primary" />
                                            ) : (
                                                <AlertCircle size={18} className="text-amber-500" />
                                            )}
                                            <div>
                                                <p className="text-foreground text-sm font-bold">{t(`owner.profile.verificationForm.docs.${config.labelKey}`)}</p>
                                                <p className="text-muted-foreground mt-0.5 text-xs">{t(`owner.profile.verificationForm.docs.${config.descriptionKey}`)}</p>
                                                {docReady && (
                                                    <p className="text-muted-foreground/70 mt-0.5 text-[10px]">
                                                        📎 {selectedFiles[config.type]?.name || doc?.file}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${isDocumentVerified ? 'bg-emerald-100 text-emerald-700' : docReady ? 'bg-primary/20 text-primary' : 'bg-amber-100 text-amber-700'}`}
                                            >
                                                {isDocumentVerified
                                                    ? t('owner.profile.verificationForm.badges.verified')
                                                    : docReady
                                                        ? t('owner.profile.verificationForm.badges.selected')
                                                        : t('owner.profile.verificationForm.badges.pending')}
                                            </span>
                                            <label className="cursor-pointer">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="pointer-events-none h-7 gap-1 text-xs"
                                                    disabled={!canUpload}
                                                >
                                                    <Upload size={12} /> {docReady ? t('owner.profile.verificationForm.actions.replace') : t('owner.profile.verificationForm.actions.upload')}
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

                                    {(previews[config.type] || doc?.url) && (
                                        <div
                                            className="mt-4 h-32 w-full rounded-lg overflow-hidden border border-primary/10 relative group cursor-pointer"
                                            onClick={() => setModalConfig({ url: previews[config.type] || getImageUrl(doc?.url), title: t(`owner.profile.verificationForm.docs.${config.labelKey}`) })}
                                        >
                                            <img
                                                src={previews[config.type] || getImageUrl(doc?.url)}
                                                alt={t(`owner.profile.verificationForm.docs.${config.labelKey}`)}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                                <div className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-zinc-800">
                                                    <ZoomIn size={14} /> {t('owner.profile.verificationForm.actions.viewFullSize')}
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
                                            <span className="text-xs font-medium">{t('owner.profile.verificationForm.actions.clickToUpload')}</span>
                                            <span className="text-muted-foreground/60 text-[10px]">
                                                {t('owner.profile.verificationForm.actions.fileHint')}
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
