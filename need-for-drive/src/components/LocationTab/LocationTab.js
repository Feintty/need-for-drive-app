import React from "react"
import "./LocationTab.scss"
import Map from "../Map/Map"
import TextInput from "../TextInput/TextInput"

const LocationTab = () => (
  <div className="location-tab">
    <div className="location-tab__inputs">
      <TextInput description="Город" placeholder="Начните вводить город ..." />
      <TextInput
        description="Пункт выдачи"
        placeholder="Начните вводить пункт ..."
      />
    </div>
    <div className="location-tab__map">
      <h4 className="location-tab__description">Выбрать на карте:</h4>
      <Map />
    </div>
  </div>
)

export default LocationTab
