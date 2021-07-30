import React from "react"
import "./LocationTab.scss"
import Map from "../Map/Map"
import SearchInput from "../SearchInput/SearchInput"

const LocationTab = () => (
  <div className="location-tab">
    <div className="location-tab__inputs">
      <SearchInput
        description="Город"
        placeholder="Начните вводить город ..."
      />
      <SearchInput
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
