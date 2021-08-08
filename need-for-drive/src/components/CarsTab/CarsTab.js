import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import CarCard from "../CarCard/CarCard"
import RadioButton from "../RadioButton/RadioButton"
import "./CarsTab.scss"

const CarsTab = ({ carToOrder }) => {
  const [currentError, setError] = useState()
  const [cars, setCars] = useState()
  const [currentFilterName, setCurrentFilterName] = useState("Все модели")

  const fetchCars = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/db/car`, {
      method: "GET",
      headers: {
        "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
        Authorization: process.env.REACT_APP_AUTHORIZATION
      }
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setCars(result.data)
        },
        (error) => {
          setError(error)
        }
      )
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const filterCars = () => {
    if (currentFilterName === "Все модели") {
      return cars.filter((car) => {
        if (car.categoryId) {
          if (car.categoryId.name) {
            return car
          }
        }
        return false
      })
    }
    return cars.filter((car) => {
      if (car.categoryId) {
        if (car.categoryId.name) {
          if (car.categoryId.name === currentFilterName) {
            return car
          }
        }
      }
      return false
    })
  }

  const createRadios = () => {
    const categories = [
      "Все модели",
      ...new Set(
        cars
          .filter((el) => {
            if (el.categoryId) {
              if (el.categoryId.name) {
                return el.categoryId.name
              }
            }
            return false
          })
          .map((el) => el.categoryId.name)
      )
    ]

    return categories.map((el) => (
      <RadioButton
        active={currentFilterName}
        onChecked={setCurrentFilterName}
        description={el}
      />
    ))
  }

  if (!currentError && cars) {
    return (
      <div className="cars-tab">
        <div className="cars-tab__radios">{createRadios()}</div>
        <div className="cars-tab__table">
          {filterCars(cars).map((el) => (
            <CarCard
              carData={el}
              carClick={carToOrder}
              name={el.name}
              priceMin={el.priceMin}
              priceMax={el.priceMax}
              image={el.thumbnail.path}
            />
          ))}
        </div>
      </div>
    )
  }
  return <div>загрузка</div>
}

CarsTab.propTypes = {
  carToOrder: PropTypes.func
}

export default CarsTab
