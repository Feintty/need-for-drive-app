import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Bill from "../../components/Bill/Bill"

const moment = require("moment")

const OrderPageBill = ({
  time,
  additionsData,
  setTime,
  price,
  isPriceCorrect,
  setIsPriceCorrect,
  locationData,
  carData,
  currentTab,
  isCurrentTabCompleted,
  setPrice,
  nextTab
}) => {
  const calculatePrice = () => {
    let calculated
    const timeAsMinutes = time.days * 24 * 60
    const timeAsHours = time.hours * 60
    const totalMinutes = timeAsHours + timeAsMinutes
    if (additionsData.tariff.rateTypeId.unit === "мин") {
      calculated = totalMinutes * additionsData.tariff.price
    } else if (additionsData.tariff.rateTypeId.unit === "сутки") {
      calculated = totalMinutes * (additionsData.tariff.price / 24 / 60)
    } else if (additionsData.tariff.rateTypeId.unit === "7 дней") {
      calculated = totalMinutes * (additionsData.tariff.price / 7 / 24 / 60)
    } else if (additionsData.tariff.rateTypeId.unit === "30 дней") {
      calculated = totalMinutes * (additionsData.tariff.price / 30 / 24 / 60)
    }
    if (additionsData.isFullTank) {
      calculated += 500
    }
    if (additionsData.isBabyChair) {
      calculated += 200
    }
    if (additionsData.isRighthand) {
      calculated += 1600
    }
    if (time.hours || time.days) {
      setPrice([Math.round(calculated)])
    }
  }

  useEffect(() => {
    if (additionsData.startDate && additionsData.endDate) {
      const start = moment(additionsData.startDate, "DD-MM-YYYY HH:mm")
      const end = moment(additionsData.endDate, "DD-MM-YYYY HH:mm")
      const diff = end.diff(start, "minutes")

      const numdays = Math.floor(diff / 1440)
      const numhours = Math.floor((diff % 1440) / 60)
      return diff > 0 && setTime({ days: numdays, hours: numhours })
    }
    setTime()

    return false
  }, [additionsData])

  useEffect(
    () => time && additionsData.tariff && calculatePrice(),
    [time, additionsData]
  )

  useEffect(() => {
    if (
      price &&
      price.length < 2 &&
      price[0] >= carData.priceMin &&
      price[0] <= carData.priceMax
    ) {
      setIsPriceCorrect(true)
    } else {
      setIsPriceCorrect(false)
    }
  }, [price, additionsData])

  return (
    <Bill
      point={
        locationData.city &&
        locationData.point &&
        `${locationData.point.cityId.name}, ${locationData.point.address}`
      }
      price={price}
      tab={currentTab}
      isCompleted={isCurrentTabCompleted}
      nextTab={nextTab}
      carData={carData}
      time={time && `${time.days}д ${time.hours}ч`}
      additionsData={!!additionsData && additionsData}
      isPriceCorrect={isPriceCorrect}
    />
  )
}

OrderPageBill.propTypes = {
  time: PropTypes.objectOf(),
  additionsData: PropTypes.objectOf(),
  setTime: PropTypes.func,
  price: PropTypes.arrayOf(PropTypes.number),
  isPriceCorrect: PropTypes.bool,
  setIsPriceCorrect: PropTypes.func,
  locationData: PropTypes.objectOf(),
  carData: PropTypes.objectOf(),
  currentTab: PropTypes.number,
  isCurrentTabCompleted: PropTypes.bool,
  setPrice: PropTypes.func,
  nextTab: PropTypes.func
}

export default OrderPageBill
