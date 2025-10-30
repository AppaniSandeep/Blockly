import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import { calculateSpeedKmH } from "./utils";

// 🚗 Vehicle icon
const vehicleIcon = L.divIcon({
  className: "text-2xl",
  html: '<span class="text-red-600">🚗</span>',
  iconSize: [24, 24],
});

const INITIAL_CENTER = [17.385044, 78.486671];

export default function VehicleMap() {
  const [routeData, setRouteData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Fetch JSON data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/dummy-route.json");
        const data = await response.json();
        setRouteData(
          data.map((p) => ({
            lat: p.latitude,
            lng: p.longitude,
            timestamp: p.timestamp,
          }))
        );
      } catch (err) {
        console.error("Failed to load route:", err);
      }
    };
    loadData();
  }, []);

  // Simulate movement
  useEffect(() => {
    if (isPlaying && routeData.length > 0 && currentIndex < routeData.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentIndex, routeData]);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const currentPosition = routeData[currentIndex] || routeData[0];
  const traveledRoute = routeData.slice(0, currentIndex + 1);

  return (
    <div className="h-screen w-full relative">
      <MapContainer
        center={INITIAL_CENTER}
        zoom={16}
        scrollWheelZoom
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Full Route */}
        {routeData.length > 0 && (
          <Polyline
            pathOptions={{ color: "gray", weight: 3, opacity: 0.5 }}
            positions={routeData.map((p) => [p.lat, p.lng])}
          />
        )}

        {/* Traveled Route */}
        {traveledRoute.length > 0 && (
          <Polyline
            pathOptions={{ color: "red", weight: 5, opacity: 0.8 }}
            positions={traveledRoute.map((p) => [p.lat, p.lng])}
          />
        )}

        {/* Vehicle Marker */}
        {currentPosition && (
          <Marker
            position={[currentPosition.lat, currentPosition.lng]}
            icon={vehicleIcon}
          />
        )}
      </MapContainer>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 z-[1000] p-4 bg-white shadow-xl rounded-lg w-full max-w-xs">
        <h2 className="text-lg font-bold mb-3">Vehicle Status</h2>

        {currentPosition ? (
          <div className="space-y-1 text-sm">
            <p>
              <strong>Coordinates:</strong>{" "}
              <span className="font-mono text-blue-600">
                {currentPosition.lat.toFixed(6)},{" "}
                {currentPosition.lng.toFixed(6)}
              </span>
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(currentPosition.timestamp).toLocaleTimeString()}
            </p>
            <p>
              <strong>Speed:</strong>{" "}
              {calculateSpeedKmH(currentIndex, routeData)} km/h
            </p>
          </div>
        ) : (
          <p>Loading route...</p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            onClick={togglePlay}
            className={`flex-1 px-4 py-2 text-white font-semibold rounded-lg transition ${
              isPlaying ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isPlaying ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetSimulation}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
