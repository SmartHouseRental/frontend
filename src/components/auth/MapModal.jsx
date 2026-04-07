import { useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { X, MapPin, Loader2 } from 'lucide-react';

// Fix for Leaflet default icon issues in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, setAddress, setLoading }) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            reverseGeocode(lat, lng);
        },
    });

    const reverseGeocode = async (lat, lng) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            setAddress(data.display_name);
        } catch (error) {
            console.error('Error reverse geocoding:', error);
        } finally {
            setLoading(false);
        }
    };

    return position === null ? null : (
        <Marker
            position={position}
            draggable={true}
            eventHandlers={{
                dragend: (e) => {
                    const marker = e.target;
                    const { lat, lng } = marker.getLatLng();
                    setPosition([lat, lng]);
                    reverseGeocode(lat, lng);
                },
            }}
        />
    );
}

export default function MapModal({ isOpen, onClose, onConfirm }) {
    const [position, setPosition] = useState([9.0300, 38.7400]); // Addis Ababa
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        if (position && address) {
            onConfirm({
                name: address,
                lat: position[0],
                lon: position[1],
            });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-border flex items-center justify-between bg-card">
                    <div>
                        <h3 className="text-xl font-bold text-foreground">Pick exact location</h3>
                        <p className="text-sm text-muted-foreground">Click or drag the pin to your preferred spot</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors"
                    >
                        <X size={20} className="text-muted-foreground" />
                    </button>
                </div>

                <div className="relative" style={{ height: '420px' }}>
                    <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker
                            position={position}
                            setPosition={setPosition}
                            setAddress={setAddress}
                            setLoading={setLoading}
                        />
                    </MapContainer>
                </div>

                <div className="p-6 bg-card border-t border-border">
                    <div className="mb-6 flex items-start gap-4 p-4 rounded-xl bg-muted/30 border border-muted">
                        <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${loading ? 'bg-primary/10' : 'bg-primary text-primary-foreground'}`}>
                            {loading ? <Loader2 size={14} className="animate-spin text-primary" /> : <MapPin size={14} />}
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Selected Address</p>
                            <p className="text-[15px] font-medium text-foreground leading-relaxed">
                                {loading ? 'Fetching address...' : address || 'Click on the map to select a location'}
                            </p>
                            {position && (
                                <p className="text-[11px] text-muted-foreground mt-1 font-mono">
                                    Coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl font-bold">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirm}
                            disabled={loading || !address}
                            className="flex-[2] h-12 rounded-xl font-bold shadow-md"
                        >
                            Confirm Location
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
