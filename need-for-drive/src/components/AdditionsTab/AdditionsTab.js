import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import fetchTariffs from "./AdditionsTabApi"
import "./AdditionsTab.scss"
import adds from "./AdditionsTabData"
import DateTimeInterval from "../DateTimeInterval/DateTimeInterval"
import AdditionsTabTariffRadios from "./AdditionsTabTariffRadios"
import AdditionsTabColorRadios from "./AdditionsTabColorRadios"
import AdditionsTabCheckboxes from "./AdditionsTabCheckboxes"

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

  if (!isActive) {
    return null
  }
  if (isDataLoaded && !error) {
    return (
      <div className="additions-tab">
        <div className="additions-tab__colors-container">
          <h3 className="additions-tab__description">Цвет</h3>
          <div className="additions-tab__colors">
            <AdditionsTabColorRadios
              carColors={carColors}
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
          </div>
        </div>
        <div className="additions-tab__date-container">
          <h3 className="additions-tab__description">Дата аренды</h3>
          <div className="additions-tab__date">
            <DateTimeInterval
              valueFirst={firstDate}
              valueSecond={secondDate}
              setValueFirst={setFirstDate}
              setValueSecond={setSecondDate}
            />
          </div>
        </div>
        <div className="additions-tab__tariff-container">
          <h3 className="additions-tab__description">Тариф</h3>
          <div className="additions-tab__tariff">
            <AdditionsTabTariffRadios
              tariffs={tariffs}
              time={time}
              currentTariff={currentTariff}
              setCurrentTariff={setCurrentTariff}
            />
          </div>
        </div>
        <div className="additions-tab__adds-container">
          <h3 className="additions-tab__description">Доп услуги</h3>
          <div className="additions-tab__adds">
            <AdditionsTabCheckboxes
              adds={adds}
              setIsFullTank={setIsFullTank}
              isFullTank={isFullTank}
              setIsBabyChair={setIsBabyChair}
              isBabyChair={isBabyChair}
              setIsRighthand={setIsRighthand}
              isRighthand={isRighthand}
            />
          </div>
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
