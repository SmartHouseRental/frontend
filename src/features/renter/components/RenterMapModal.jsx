import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { X, MapPin, Loader2 } from 'lucide-react';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, setAddress, setLoading }) {
  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      setAddress(data.display_name || '');
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    } finally {
      setLoading(false);
    }
  };

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      reverseGeocode(lat, lng);
    },
  });

  if (!position) return null;

  return (
    <Marker
      position={position}
      draggable
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

export default function RenterMapModal({ isOpen, onClose, onConfirm }) {
  const [position, setPosition] = useState([9.03, 38.74]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!position || !address) return;
    onConfirm({
      name: address,
      lat: position[0],
      lng: position[1],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <h3 className="text-xl font-bold text-foreground">Pick exact location</h3>
            <p className="text-sm text-muted-foreground">Click or drag the pin to your preferred spot</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-muted/50"
            aria-label="Close map picker"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        <div className="relative h-[420px]">
          <MapContainer center={position} zoom={13} scrollWheelZoom className="h-full w-full">
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

        <div className="border-t border-border p-6">
          <div className="mb-6 flex items-start gap-4 rounded-xl border border-muted bg-muted/30 p-4">
            <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${loading ? 'bg-primary/10' : 'bg-primary text-primary-foreground'}`}>
              {loading ? <Loader2 size={14} className="animate-spin text-primary" /> : <MapPin size={14} />}
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Selected Address</p>
              <p className="text-[15px] font-medium leading-relaxed text-foreground">
                {loading ? 'Fetching address...' : address || 'Click on the map to select a location'}
              </p>
              {position && (
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                  Coordinates: {position[0].toFixed(4)}, {position[1].toFixed(4)}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="h-12 flex-1 rounded-xl font-bold">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading || !address}
              className="h-12 flex-[2] rounded-xl font-bold shadow-md"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
