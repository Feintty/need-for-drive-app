import React, { useState } from "react"
import "./Map.scss"
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet"
import MapMarker from "./MapMarker"

const Map = () => {
  const [position] = useState([54.3107593, 48.3642771])
  return (
    <MapContainer
      className="map"
      attributionControl={false}
      zoomControl={false}
      center={position}
      zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=b4b52b45-73fc-4229-ad23-4bf5255d0f7f"
      />
      <Marker position={position} icon={MapMarker}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
