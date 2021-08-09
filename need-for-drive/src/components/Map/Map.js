import React from "react"
import "./Map.scss"
import PropTypes from "prop-types"
import { TileLayer, MapContainer, Marker, useMap } from "react-leaflet"
import MapMarker from "./MapMarker"

function FocusChange({ position, zoom }) {
  const map = useMap()
  map.setView(position)
  map.setZoom(zoom)
  return null
}

const Map = ({ focus, zoom, markers, setCityAndPoint }) => {
  const createMarkers = () =>
    markers.map((marker) => {
      const latlng = marker.locations.find(
        (location) => location.adminArea1 === "RU"
      ).latLng
      const city = marker.providedLocation.location.split(",")[0]
      const address = marker.providedLocation.location
        .split(",")
        .slice(1)
        .toString()
      return (
        <Marker
          position={[latlng.lat, latlng.lng]}
          icon={MapMarker}
          city={city}
          address={address}
          fullAddress={marker.providedLocation.location}
          eventHandlers={{
            mousedown: (e) => {
              setCityAndPoint(e.target.options.city, e.target.options.address)
            }
          }}
        />
      )
    })

  return (
    <MapContainer
      className="map"
      attributionControl={false}
      zoomControl={false}
      center={focus}
      zoom={zoom}
      dragging
      animate
      easeLinearity={0.35}>
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        url={`https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=${process.env.REACT_APP_LEAFLET_KEY}`}
      />
      {createMarkers().map((el) => el)}
      <FocusChange position={focus} zoom={zoom} />
    </MapContainer>
  )
}

Map.propTypes = {
  zoom: PropTypes.number,
  focus: PropTypes.arrayOf(PropTypes.number),
  markers: PropTypes.objectOf,
  setCityAndPoint: PropTypes.func
}

export default Map
