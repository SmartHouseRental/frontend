import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { Home, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./MapStyles.css";

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Lucide Icon for Markers
const createCustomIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="marker-pin">
      <Home />
    </div>
  );

  return L.divIcon({
    html: iconMarkup,
    className: "custom-div-icon",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

const customIcon = createCustomIcon();

// Component to handle map center changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function PropertyMap({ 
  properties = [], 
  center = [9.0128, 38.7508], // Addis Ababa center
  zoom = 13,
  mode = "full" 
}) {
  const navigate = useNavigate();

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-border ${mode === 'preview' ? 'grayscale-[0.5] hover:grayscale-0 transition-all duration-700' : ''}`}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={mode !== 'preview'}
        className="w-full h-full"
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
          <Marker 
            key={property.id} 
            position={[property.lat, property.lng]}
            icon={customIcon}
          >
            <Popup closeButton={false} className="custom-popup">
              <div 
                className="map-popup-card" 
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="map-popup-image"
                />
                <div className="map-popup-info">
                  <h3 className="map-popup-title">{property.title}</h3>
                  <p className="map-popup-price">{property.price}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest font-bold">Click to view details</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
