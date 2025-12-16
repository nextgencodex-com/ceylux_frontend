import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create numbered marker icon, highlight if selected
const createNumberedIcon = (number, isSelected) =>
  L.divIcon({
    html: `
      <div style="
        background: ${isSelected ? "#1e40af" : "white"};
        color: ${isSelected ? "white" : "#1e40af"};
        border: 2px solid #1e40af;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: background-color 0.3s, color 0.3s;
      ">
        ${number}
      </div>
    `,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

const locations = [
  { id: 1, name: "Sigiriya", description: "Ancient rock fortress and palace with lion paws at the base.", image: "/images/sigiriya.jpg", position: [7.957, 80.760] },
  { id: 2, name: "Dambulla Temple", description: "Sacred cave temple complex with stunning Buddhist murals.", image: "/images/dambulla.jpg", position: [7.855, 80.651] },
  { id: 3, name: "Yala National Park", description: "Sri Lanka's top wildlife destination famous for leopards.", image: "/images/yala.jpg", position: [6.4746, 81.5181] },
  { id: 4, name: "Nine Arches Bridge", description: "Colonial-era railway bridge in the lush hills of Ella.", image: "/images/nine-arches.jpg", position: [6.8756, 81.0579] },
  { id: 5, name: "Coconut Tree Hill", description: "Scenic coconut-covered headland near Mirissa Beach.", image: "/images/coconut-hill.jpg", position: [5.9436, 80.4559] },
  { id: 6, name: "Polonnaruwa", description: "Ancient kingdom ruins with temples and Buddha statues.", image: "/images/polonnaruwa.jpg", position: [7.939, 81.0039] },
  { id: 7, name: "Anuradhapura", description: "Historical capital with stupas, palaces, and ancient trees.", image: "/images/anuradhapura.jpg", position: [8.3114, 80.4037] },
  { id: 8, name: "Adam's Peak", description: "Sacred mountain pilgrimage with sunrise views.", image: "/images/adams-peak.jpg", position: [6.809, 80.499] },
  { id: 9, name: "Horton Plains", description: "Highland plateau with misty trails and World’s End cliff.", image: "/images/horton.jpg", position: [6.809, 80.8021] },
  { id: 10, name: "Wilpattu Park", description: "Large national park with natural lakes and leopards.", image: "/images/wilpattu.jpg", position: [8.4717, 80.0415] },
  { id: 11, name: "Mannar Island", description: "Quiet island famous for wild donkeys and churches.", image: "/images/mannar.jpg", position: [8.9765, 79.9181] },
  { id: 12, name: "Nilaveli Beach", description: "Unspoiled sandy beach near Trincomalee.", image: "/images/nilaveli.jpg", position: [8.7293, 81.1765] },
  { id: 13, name: "Arugam Bay", description: "Surfing capital of Sri Lanka on the east coast.", image: "/images/arugam.jpg", position: [6.839, 81.832] },
  { id: 14, name: "Jaffna", description: "Northern city with rich Tamil culture and Hindu temples.", image: "/images/jaffna.png", position: [9.6615, 80.0255] },
  { id: 15, name: "Kalpitiya", description: "Popular for dolphin watching and kitesurfing.", image: "/images/kalpitiya.jpg", position: [8.2435, 79.7553] },
  { id: 16, name: "Kandy", description: "Hill country city home to Temple of the Tooth.", image: "/images/kandy.jpg", position: [7.2906, 80.6337] },
  { id: 17, name: "Galle Fort", description: "UNESCO colonial Dutch fort with cafes and beaches.", image: "/images/galle.jpg", position: [6.0267, 80.217] },
  { id: 18, name: "Colombo", description: "Bustling capital with modern and colonial buildings.", image: "/images/colombo.jpg", position: [6.9271, 79.8612] },
  { id: 19, name: "Udawalawe", description: "Elephant haven with open grasslands and lakes.", image: "/images/udawalawe.jpg", position: [6.4748, 80.891] },
  { id: 20, name: "Chilaw", description: "Town known for the Munneswaram Hindu Temple.", image: "/images/chilaw.jpg", position: [7.5758, 79.7975] },
];

// Map container styles and popup card styles
const styles = `
  .leaflet-container {
    background-color: white !important;
    position: relative;
  }

  /* Fixed popup card on right inside map */
  .fixed-popup-card {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 320px;
    background-color: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(30, 64, 175, 0.5);
    z-index: 1000;
    font-family: "Inter", sans-serif;
    user-select: none;
  }
  .fixed-popup-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 12px;
  }
  .fixed-popup-card h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 8px;
  }
  .fixed-popup-card p {
    font-size: 1rem;
    line-height: 1.4;
  }
`;

export default function SriLankaMapLeaflet() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <style>{styles}</style>
      <div className="w-full h-[750px] rounded-xl shadow-lg overflow-hidden border border-gray-200 relative">
        <MapContainer
          center={[7.8731, 80.7718]}
          zoom={8}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          zoomControl={false}
          touchZoom={false}
          boxZoom={false}
          keyboard={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.position}
              icon={createNumberedIcon(loc.id, selectedLocation?.id === loc.id)}
              eventHandlers={{
                click: () => {
                  setSelectedLocation(loc);
                },
              }}
            />
          ))}
        </MapContainer>

        {/* Fixed info card inside map container, right side */}
        {selectedLocation && (
          <div className="fixed-popup-card">
            <h2>{selectedLocation.name}</h2>
            <img src={selectedLocation.image} alt={selectedLocation.name} />
            <p>{selectedLocation.description}</p>
          </div>
        )}
      </div>
    </>
  );
}
