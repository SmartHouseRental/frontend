import { useParams, useNavigate } from 'react-router';
import { usePropertyDetail } from '@/features/properties/hooks/usePropertyDetail';
import { PropertyForm } from '@/features/properties/components/PropertyForm';
import { Loader2 } from 'lucide-react';

function EditPropertyPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: propertyData, isLoading: isLoadingProperty } = usePropertyDetail(id);

    const property = propertyData?.data;

    const handleSuccess = () => {
        navigate('/owner/properties');
    };

    const handleCancel = () => {
        navigate('/owner/properties');
    };

    if (isLoadingProperty) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-muted-foreground">Property not found</p>
            </div>
        );
    }

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Edit Property</h1>
                <p className="text-muted-foreground mt-1">Property ID: #{property.id}</p>
            </div>
            <PropertyForm
                property={property}
                isEditMode={true}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        </div>
    );
}

export default EditPropertyPage;
