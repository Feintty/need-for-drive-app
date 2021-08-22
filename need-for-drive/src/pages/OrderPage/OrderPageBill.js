import React, { useEffect, useContext } from "react"
import Bill from "../../components/Bill/Bill"
import OrderPageContext from "./OrderPageContext"
import { calculatePriceByTime, datesToTime } from "./TimePriceNormalizer"

const OrderPageBill = () => {
  const {
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
    nextTab,
    setIsOrderCompleted
  } = useContext(OrderPageContext)

  useEffect(() => {
    setTime(datesToTime(additionsData.startDate, additionsData.endDate))
  }, [additionsData])

  useEffect(
    () =>
      time &&
      additionsData.tariff &&
      setPrice(calculatePriceByTime(time, additionsData)),
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
      setIsOrderCompleted={setIsOrderCompleted}
    />
  )
}

export default OrderPageBill
