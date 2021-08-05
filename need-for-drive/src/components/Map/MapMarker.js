import L from "leaflet"
import Marker from "../../assets/icons/marker.svg"

const MapMarker = new L.Icon({
  iconUrl: Marker,
  iconRetinaUrl: Marker,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(18, 18),
  className: "leaflet-div-icon"
})
export default MapMarker
