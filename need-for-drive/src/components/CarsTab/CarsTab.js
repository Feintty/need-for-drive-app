import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { fetchCars, fetchCategories } from "./CarsTabApi"
import CarCard from "../CarCard/CarCard"
import "./CarsTab.scss"

const CarsTab = ({ returnData, isActive, isCanReset, isCanResetChange }) => {
  const [currentError, setError] = useState()
  const [cars, setCars] = useState()
  const [selectedCar, setSelectedCar] = useState()
  const [currentFilterName, setCurrentFilterName] = useState("Все модели")
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchCars(setCars, setError)
    fetchCategories(setCategories, setError)
  }, [])

  useEffect(() => {
    if(isCanReset){
      setSelectedCar()
      isCanResetChange(false)
    }
  }, [isCanReset]);

  const filterCars = () => {
    if (currentFilterName === "Все модели") {
      return cars.filter((car) => {
        if (car.categoryId?.name && car.colors.length > 0) {
          return car
        }
        return false
      })
    }
    return cars.filter((car) => {
      if (car.categoryId?.name) {
        if (car.categoryId.name === currentFilterName) {
          return car
        }
      }
      return false
    })
  }

  const createRadios = () =>
    ["Все модели", ...categories.map((el) => el.name)]
      .filter((el) => el.length > 3 && !/[a-zA-Z]/.test(el))
      .map((el, index) => (
        <label className="radio-container" htmlFor>
          <input
            className="radio-input"
            type="radio"
            defaultChecked={index === 0}
            name="contact"
            value={el}
          />
          <span className="radio-text">{el}</span>
        </label>
      ))

  const radioChanged = (e) => {
    setCurrentFilterName(e.target.value)
  }
  if (!isActive) {
    return null
  }

  if (!currentError && cars) {
    return (
      <div className="cars-tab">
        <div
          className="cars-tab__radios radio-container"
          onChange={radioChanged}>
          {createRadios()}
        </div>
        <div className="cars-tab__table">
          {filterCars(cars).map((el) => (
            <CarCard
              id={el.id}
              key={el.id}
              setSelectedCar={setSelectedCar}
              selectedCar={selectedCar}
              carData={el}
              carClick={returnData}
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
  returnData: PropTypes.func,
  isActive: PropTypes.func,
  isCanReset: PropTypes.bool,
isCanResetChange: PropTypes.func
}

export default CarsTab
