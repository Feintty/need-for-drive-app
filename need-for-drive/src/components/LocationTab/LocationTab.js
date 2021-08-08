import React, { useEffect, useState } from "react"
import "./LocationTab.scss"
import PropTypes from "prop-types"
import Map from "../Map/Map"
import TextInput from "../TextInput/TextInput"

const LocationTab = ({ cityAndPointToOrder }) => {
  const [citiesList, setCitiesList] = useState()
  const [pointsList, setPointsList] = useState()
  const [currentCity, setCurrentCity] = useState("")
  const [currentPoint, setCurrentPoint] = useState("")
  const [citiesLocation, setCitiesLocation] = useState()
  const [pointsLocation, setPointsLocation] = useState()
  const [focus, setFocus] = useState([60, 90])
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

  const fetchCitiesLocation = () => {
    const cityNames = citiesList.map((el) => `&location=${el.name}`).join("")
    fetch(
      `http://mapquestapi.com/geocoding/v1/batch?key=${process.env.REACT_APP_MAPQUEST_KEY}${cityNames}`,
      {
        method: "GET"
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCitiesLocation(result.results)
        },
        (error) => {
          setError(error)
        }
      )
  }

  const fetchPointsLocation = () => {
    const pointsAdress = citiesList
      .map((el) => filterPointsByCityName(el.name))
      .filter((el) => el.length !== 0)
      .flat(1)
      .reduce(
        (finalString, el) =>
          `${finalString}&location=${el.cityId.name},${el.address}`,
        ""
      )

    fetch(
      `http://mapquestapi.com/geocoding/v1/batch?key=${process.env.REACT_APP_MAPQUEST_KEY}${pointsAdress}`,
      {
        method: "GET"
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setPointsLocation(result.results)
        },
        (error) => {
          setError(error)
        }
      )
  }

  const getLocationByCity = (city) => {
    const location = citiesLocation
      .find((el) => el.providedLocation.location === city)
      .locations.find((el) => el.adminArea1 === "RU")
    return [location.latLng.lat, location.latLng.lng]
  }

  const getLocationByPoint = (point) => {
    const address = `${currentCity},${
      pointsList.find((el) => el.name === point).address
    }`
    const location = pointsLocation
      .find((el) => el.providedLocation.location === address)
      .locations.find((el) => el.adminArea1 === "RU")
    return [location.latLng.lat, location.latLng.lng]
  }

  const fetchCities = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/db/city`, {
      method: "GET",
      headers: {
        "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
        Authorization: process.env.REACT_APP_AUTHORIZATION
      }
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCitiesList(result.data)
        },
        (error) => {
          setError(error)
        }
      )
  }

  const fetchPoints = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/db/point`, {
      method: "GET",
      headers: {
        "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
        Authorization: process.env.REACT_APP_AUTHORIZATION
      }
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setPointsList(result.data)
        },
        (error) => {
          setError(error)
        }
      )
  }

  const setCityAndPoint = (city = "", address = "") => {
    const findPoint = pointsList.find((el) => el.address === address).name
    setCurrentCity(city)
    setCurrentPoint(findPoint)
  }

  useEffect(() => {
    fetchCities()
    fetchPoints()
  }, [])

  useEffect(() => {
    if (citiesList) {
      fetchCitiesLocation()
    }
  }, [citiesList])

  useEffect(() => {
    if (pointsList && citiesList) {
      fetchPointsLocation()
    }
  }, [pointsList])

  useEffect(() => {
    if (currentPoint && pointsLocation) {
      setFocus(getLocationByPoint(currentPoint))
    }
  }, [currentPoint])

  useEffect(() => {
    if (currentCity && citiesLocation) {
      setFocus(getLocationByCity(currentCity))
    }
  }, [currentCity])

  useEffect(() => {
    cityAndPointToOrder(currentCity, currentPoint)
  }, [currentCity, currentPoint])

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
            datalistItems={citiesList ? filterCities(citiesList) : citiesList}
            setDataElement={setCurrentCity}
          />
          <TextInput
            text={currentPoint}
            description="Пункт выдачи"
            placeholder="Начните вводить пункт ..."
            datalistItems={
              currentCity ? filterPointsByCityName(currentCity) : pointsList
            }
            setDataElement={setCurrentPoint}
          />
        </div>
        <div className="location-tab__map">
          <h4 className="location-tab__description">Выбрать на карте:</h4>
          <Map
            focus={focus}
            setCityAndPoint={setCityAndPoint}
            zoom={10}
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
