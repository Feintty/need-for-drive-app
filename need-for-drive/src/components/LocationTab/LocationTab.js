import React, { useEffect, useState } from "react"
import "./LocationTab.scss"
import PropTypes from "prop-types"
import {
  fetchCitiesLocation,
  fetchPoints,
  fetchPointsLocation,
  fetchCities
} from "./LocationTabApi"
import Map from "../Map/Map"
import TextInput from "../TextInput/TextInput"

const LocationTab = ({ cityAndPointToOrder }) => {
  const [citiesList, setCitiesList] = useState()
  const [pointsList, setPointsList] = useState()
  const [currentCity, setCurrentCity] = useState("")
  const [currentPoint, setCurrentPoint] = useState("")
  const [citiesLocation, setCitiesLocation] = useState()
  const [pointsLocation, setPointsLocation] = useState()
  const [focus, setFocus] = useState([55.751244, 37.618423])
  const [currentError, setError] = useState()

  const filterCities = () =>
    citiesList.filter((city) => /^[а-яА-Я]*$/.test(city.name))

  const filterPointsByCityName = (city) =>
    pointsList.filter((point) => {
      if (Object.prototype.hasOwnProperty.call(point, "cityId")) {
        if (point.cityId !== null) {
          if (point.cityId.name === city) {
            return point
          }
        }
      }
      return false
    })
  const getLocationByCity = (city) => {
    const location = citiesLocation
      .find((el) => el.providedLocation.location === city)
      .locations.find((el) => el.adminArea1 === "RU")
    return [location.latLng.lat, location.latLng.lng]
  }

  const getLocationByPoint = (point) => {
    console.log(point)
    const address = `${currentCity},${
      pointsList.find((el) => el.address === point).address
    }`
    const location = pointsLocation
      .find((el) => el.providedLocation.location === address)
      .locations.find((el) => el.adminArea1 === "RU")
    return [location.latLng.lat, location.latLng.lng]
  }

  const setCityAndPoint = (city = "", address = "") => {
    console.log(city, address)
    const findPoint = pointsList.find((el) => el.address === address).address
    setCurrentCity(city)
    setCurrentPoint(findPoint)
  }

  useEffect(() => {
    fetchCities(setCitiesList, setError)
    fetchPoints(setPointsList, setError)
  }, [])

  useEffect(() => {
    if (citiesList) {
      fetchCitiesLocation(setCitiesLocation, setError, citiesList)
      if (pointsList) {
        fetchPointsLocation(
          setPointsLocation,
          setError,
          citiesList,
          filterPointsByCityName
        )
      }
    }
  }, [citiesList, pointsList])

  useEffect(() => {
    if (currentCity && citiesLocation) {
      setFocus(getLocationByCity(currentCity))
    }
    if (pointsList && currentPoint) {
      cityAndPointToOrder(currentCity, currentPoint)
    }
  }, [currentCity, currentPoint])

  useEffect(() => {
    if (currentPoint && pointsLocation) {
      setFocus(getLocationByPoint(currentPoint))
    }
  }, [currentPoint])

  if (
    citiesList &&
    pointsList &&
    pointsLocation &&
    citiesLocation &&
    !currentError
  ) {
    return (
      <div className="location-tab">
        <div className="location-tab__inputs">
          <TextInput
            text={currentCity}
            description="Город"
            placeholder="Начните вводить город ..."
            datalistItems={
              citiesList
                ? filterCities(citiesList).map((el) => el.name)
                : citiesList.map((el) => el.name)
            }
            setDataElement={setCurrentCity}
          />
          <TextInput
            text={currentPoint}
            description="Пункт выдачи"
            placeholder="Начните вводить пункт ..."
            datalistItems={
              currentCity
                ? filterPointsByCityName(currentCity).map((el) => el.address)
                : pointsList.map((el) => el.address)
            }
            setDataElement={setCurrentPoint}
          />
        </div>
        <div className="location-tab__map">
          <h4 className="location-tab__description">Выбрать на карте:</h4>
          <Map
            focus={focus}
            setCityAndPoint={setCityAndPoint}
            zoom={currentPoint ? 25 : 10}
            markers={pointsLocation}
          />
        </div>
      </div>
    )
  }
  if (currentError) {
    return <div>{currentError}</div>
  }
  return <div>загрузка</div>
}

LocationTab.propTypes = {
  cityAndPointToOrder: PropTypes.func
}

export default LocationTab
