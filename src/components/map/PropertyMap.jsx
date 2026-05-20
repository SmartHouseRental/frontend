import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Home, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router';
import './MapStyles.css';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Lucide Icon for Markers
const createCustomIcon = () => {
  const iconMarkup = renderToStaticMarkup(
    <div className="marker-pin">
      <Home />
    </div>,
  );

  return L.divIcon({
    html: iconMarkup,
    className: 'custom-div-icon',
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
  mode = 'full',
}) {
  const navigate = useNavigate();

  // Filter out any properties with invalid/missing coordinates
  const validProperties = properties.filter((property) => {
    const lat = parseFloat(property?.lat);
    const lng = parseFloat(property?.lng);
    return !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;
  });

  // Dynamically center the map on the first valid property if the default Addis Ababa center is used
  let mapCenter = center;
  if (
    center &&
    center[0] === 9.0128 &&
    center[1] === 38.7508 &&
    validProperties.length > 0
  ) {
    mapCenter = [validProperties[0].lat, validProperties[0].lng];
  }

  return (
    <div
      className={`border-border relative h-full w-full overflow-hidden rounded-2xl border shadow-inner ${mode === 'preview' ? 'grayscale-[0.5] transition-all duration-700 hover:grayscale-0' : ''}`}
    >
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={mode !== 'preview'}
        className="h-full w-full"
      >
        <ChangeView center={mapCenter} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validProperties.map((property) => {
          const title = (property.title && typeof property.title === 'object') ? (property.title.en || property.title.am) : (property.titleStr || property.title || "Property Details");
          const price = (property.price && typeof property.price === 'object') ? `${property.price.value} ${property.price.currency || 'ETB'}` : (property.priceStr || property.price || "0 ETB");
          const image = property.image || property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

          return (
            <Marker key={property.id} position={[property.lat, property.lng]} icon={customIcon}>
              <Popup closeButton={false} className="custom-popup">
                <div className="map-popup-card" onClick={() => navigate(`/property/${property.id}`)}>
                  <img src={image} alt={title} className="map-popup-image" />
                  <div className="map-popup-info">
                    <h3 className="map-popup-title">{title}</h3>
                    <p className="map-popup-price">{price}</p>
                    <p className="text-muted-foreground mt-1 text-[10px] font-bold tracking-widest uppercase">
                      Click to view details
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
