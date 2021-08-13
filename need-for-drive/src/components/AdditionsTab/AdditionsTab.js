import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import fetchTariffs from "./AdditionsTabApi"
import "./AdditionsTab.scss"
import DateTimePicker from "../DateTimePicker/DateTimePicker"

const AdditionsTab = ({
  isActive,
  carColors,
  returnData,
  isCanReset,
  isCanResetChange,
  time
}) => {
  const [tariffs, setTariffs] = useState()
  const [currentColor, setCurrentColor] = useState(null)
  const [currentTariff, setCurrentTariff] = useState(null)
  const [isFullTank, setIsFullTank] = useState(false)
  const [isBabyChair, setIsBabyChair] = useState(false)
  const [isRighthand, setIsRighthand] = useState(false)
  const [firstDate, setFirstDate] = useState(null)
  const [secondDate, setSecondDate] = useState(null)
  const [error, setError] = useState()

  const adds = [
    "Полный бак, 500₽",
    "Детское кресло, 200₽",
    "Правый руль, 1600₽"
  ]
  const isDataLoaded = !!tariffs

  useEffect(() => {
    setCurrentTariff(null)
  }, [firstDate, secondDate])

  const dropStates = () => {
    setCurrentColor(null)
    setCurrentTariff(null)
    setIsFullTank(false)
    setIsBabyChair(false)
    setIsRighthand(false)
    setFirstDate(null)
    setSecondDate(null)
  }

  useEffect(() => {
    if (isCanReset) {
      dropStates()
      isCanResetChange(false)
    }
  }, [isCanReset])

  useEffect(() => {
    returnData({
      color: currentColor,
      startDate: firstDate,
      endDate: secondDate,
      tariff: currentTariff,
      isFullTank,
      isBabyChair,
      isRighthand
    })
  }, [
    currentColor,
    currentTariff,
    firstDate,
    secondDate,
    isFullTank,
    isBabyChair,
    isRighthand
  ])

  useEffect(() => {
    fetchTariffs(setTariffs, setError)
  }, [])

  const radioOnChange = (e) => {
    if (e.target.name === "colors") {
      setCurrentColor(e.target.value)
    }
    if (e.target.name === "tariffs") {
      setCurrentTariff(
        tariffs.find((tariff) => tariff.rateTypeId.name === e.target.value)
      )
    }
  }

  const checkboxOnChange = (e) => {
    if (e.target.value === adds[0]) {
      setIsFullTank(!isFullTank)
    } else if (e.target.value === adds[1]) {
      setIsBabyChair(!isBabyChair)
    } else if (e.target.value === adds[2]) {
      setIsRighthand(!isRighthand)
    }
  }

  const defaultCheckbox = (value) => {
    if (value === adds[0] && isFullTank) {
      return true
    }
    if (value === adds[1] && isBabyChair) {
      return true
    }
    if (value === adds[2] && isRighthand) {
      return true
    }
    return false
  }

  const createAddsCheckboxes = () =>
    adds.map((add) => (
      <label className="checkbox-container" htmlFor onChange={checkboxOnChange}>
        <input
          className="checkbox-input"
          type="checkbox"
          name="adds"
          value={add}
          checked={defaultCheckbox(add)}
        />
        <span className="checkbox-text">{add}</span>
      </label>
    ))

  const createColorRadios = () =>
    ["Любой", ...carColors].map((color) => (
      <label className="radio-container" onChange={radioOnChange} htmlFor>
        <input
          className="radio-input"
          type="radio"
          name="colors"
          value={color}
          checked={color === currentColor}
        />
        <span className="radio-text">{color}</span>
      </label>
    ))

  const createTariffRadios = () =>
    tariffs.map((tariff) => {
      if (
        (time?.days || time?.hours) &&
        ((tariff.rateTypeId.unit === "сутки" && time.days > 0) ||
          (tariff.rateTypeId.unit === "7 дней" && time.days >= 7) ||
          (tariff.rateTypeId.unit === "30 дней" && time.days >= 30) ||
          tariff.rateTypeId.unit === "мин")
      ) {
        return (
          <label className="radio-container" onChange={radioOnChange} htmlFor>
            <input
              className="radio-input"
              type="radio"
              name="tariffs"
              checked={
                currentTariff &&
                currentTariff.rateTypeId.name === tariff.rateTypeId.name
              }
              value={tariff.rateTypeId.name}
            />
            <span className="radio-text">{`${tariff.rateTypeId.name}, ${tariff.price}₽ / ${tariff.rateTypeId.unit}`}</span>
          </label>
        )
      }

      return (
        <label className="radio-container" onChange={radioOnChange} htmlFor>
          <input
            className="radio-input"
            type="radio"
            name="tariffs"
            disabled
            checked={false}
          />
          <span className="radio-text">
            <s>{tariff.rateTypeId.name}</s>
          </span>
        </label>
      )
    })

  if (!isActive) {
    return null
  }
  if (isDataLoaded && !error) {
    return (
      <div className="additions-tab">
        <div className="additions-tab__colors-container">
          <h3 className="additions-tab__description">Цвет</h3>
          <div className="additions-tab__colors">{createColorRadios()}</div>
        </div>
        <div className="additions-tab__date-container">
          <h3 className="additions-tab__description">Дата аренды</h3>
          <div className="additions-tab__date">
            <DateTimePicker value={firstDate} setValue={setFirstDate} />
            <DateTimePicker
              value={secondDate}
              setValue={setSecondDate}
              minDate={firstDate && firstDate}
            />
          </div>
        </div>
        <div className="additions-tab__tariff-container">
          <h3 className="additions-tab__description">Тариф</h3>
          <div className="additions-tab__tariff">{createTariffRadios()}</div>
        </div>
        <div className="additions-tab__adds-container">
          <h3 className="additions-tab__description">Доп услуги</h3>
          <div className="additions-tab__adds">{createAddsCheckboxes()}</div>
        </div>
      </div>
    )
  }

  return <div>загрузка</div>
}

AdditionsTab.propTypes = {
  isActive: PropTypes.bool,
  carColors: PropTypes.arrayOf(PropTypes.string),
  returnData: PropTypes.func,
  isCanReset: PropTypes.bool,
  isCanResetChange: PropTypes.func,
  time: PropTypes.objectOf()
}

export default AdditionsTab
