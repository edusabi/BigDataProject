import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import services from "../../services.json"; 
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const LocalizacaoAgrupada = () => {
  
  const aggregatedLocations = services.reduce((acc, currentService) => {
    const key = `${currentService.lat},${currentService.lng}`;

    if (!currentService.lat || !currentService.lng) {
      return acc; 
    }

    if (!acc[key]) {
      acc[key] = {
        lat: currentService.lat,
        lng: currentService.lng,
        mainProvider: currentService.provider.name,
        endereco: currentService.endereco,
        serviceNames: [], 
        services: [], 
      };
    }

    acc[key].serviceNames.push(currentService.name);
    acc[key].services.push(currentService);

    return acc;
  }, {});
  
  const mapEndpoints = Object.values(aggregatedLocations);


  return (
    <div style={{ height: "100vh", width: "100%", padding: 20 }}>
      
      <NavLink to="/"><FaArrowLeftLong style={{fontSize:"1.5rem", color:"black"}}/></NavLink>
      
      <h1 style={{ marginBottom: 10, fontSize: "1.5rem", textAlign: "center" }}>
        Localização dos Serviços
      </h1>

      <MapContainer
        center={[-8.28455, -35.9703]} 
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "90%", width: "100%", borderRadius: "10px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {mapEndpoints.map((location, index) => (
          <Marker key={index} position={[location.lat, location.lng]}>
            
            <Tooltip permanent direction="top" offset={[0, -10]}>
              {location.mainProvider} ({location.serviceNames.length} Serviços)
            </Tooltip>
            
            <Popup>
              <strong>{location.mainProvider}</strong> 
              <br/>
              Endereço: {location.endereco}
              <br />
              <br/>
              Serviços Disponíveis Neste Local:
              <ul>
                {location.serviceNames.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
              
            </Popup>
            
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocalizacaoAgrupada;