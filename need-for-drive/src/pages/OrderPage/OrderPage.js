import React, { useState, useEffect } from "react"
import "./OrderPage.scss"
import BurgerNav from "../../components/Burger/BurgerNav"
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import Bill from "../../components/Bill/Bill"
import LocationTab from "../../components/LocationTab/LocationTab"
import CarsTab from "../../components/CarsTab/CarsTab"
import AdditionsTab from "../../components/AdditionsTab/AdditionsTab"

const moment = require("moment")

const OrderPage = () => {
  const defaultAdditionsData = {
    color: null,
    startDate: null,
    endDate: null,
    tariff: null,
    isFullTank: false,
    isBabyChair: false,
    isRighthand: false
  }

  const [swapBurger, setSwapBurger] = useState(true)
  const [currentTab, setCurrentTab] = useState(0)
  const [locationData, setLocationData] = useState({ city: null, point: null })
  const [carData, setCarData] = useState()
  const [additionsData, setAdditionsData] = useState(defaultAdditionsData)
  const [time, setTime] = useState()
  const [isCurrentTabCompleted, setIsCurrentTabCompleted] = useState(false)
  const [isAdditionsCanReset, setIsAdditionsCanReset] = useState(false)
  const [isCarCanReset, setIsCarCanReset] = useState(false)
  const [completedLocations, setCompletedLocations] = useState([
    { isCompleted: false },
    { isCompleted: false },
    { isCompleted: false },
    { isCompleted: false }
  ])

  const resetAdditons = () => {
    setIsAdditionsCanReset(true)
    setAdditionsData(defaultAdditionsData)
    setTime()
  }

  const resetCar = () => {
    setIsCarCanReset(true)
    setCarData()
  }

  useEffect(() => {
    resetAdditons()
  }, [carData])

  useEffect(() => {
    resetAdditons()
    resetCar()
  }, [locationData])

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
    if (additionsData) {
      return [Math.round(calculated)]
    }
    return [carData.priceMin, carData.priceMax]
  }

  const nextTab = () => {
    setCurrentTab(currentTab + 1)
  }

  const changeBoolLocation = (tab, bool) => {
    const altLocation = completedLocations
    altLocation[tab].isCompleted = bool
    setCompletedLocations(altLocation)
  }

  useEffect(() => {
    if (locationData.city && locationData.point) {
      changeBoolLocation(0, true)
    } else {
      changeBoolLocation(1, false)
    }
    if (carData) {
      changeBoolLocation(1, true)
    } else {
      changeBoolLocation(1, false)
    }
    if (Object.values(additionsData).every((value) => value !== null)) {
      changeBoolLocation(2, true)
    } else {
      changeBoolLocation(2, false)
    }
  }, [carData, locationData, additionsData])

  const changeLocationClick = (tab) => {
    if (completedLocations[tab]) {
      setCurrentTab(tab)
    }
  }

  useEffect(() => {
    setIsCurrentTabCompleted(completedLocations[currentTab].isCompleted)
  }, [locationData, carData, additionsData, currentTab])

  return (
    <div className="order-page">
      <SideBar isBurgerHiding={swapBurger} setIsBurgerHiding={setSwapBurger} />
      <BurgerNav isHiding={swapBurger} />
      <div className="order-page__content">
        <Header addClassname="order-page-padding" />
        <Breadcrumbs
          completedSteps={
            completedLocations.filter((el) => el.isCompleted === true).length
          }
          currentStep={currentTab}
          onBreadcrumbClick={changeLocationClick}
        />
        <div className="order-page__tabs">
          <LocationTab
            isActive={currentTab === 0}
            returnData={setLocationData}
          />
          <CarsTab
            isActive={currentTab === 1}
            returnData={setCarData}
            isCanReset={isCarCanReset}
            isCanResetChange={setIsCarCanReset}
          />
          <AdditionsTab
            isActive={currentTab === 2}
            carColors={carData && carData.colors}
            returnData={setAdditionsData}
            additionsData={additionsData}
            isCanReset={isAdditionsCanReset}
            isCanResetChange={setIsAdditionsCanReset}
            time={time}
          />
          <Bill
            point={
              locationData.city &&
              locationData.point &&
              `${locationData.point.cityId.name}, ${locationData.point.address}`
            }
            price={time && additionsData.tariff && calculatePrice()}
            tab={currentTab}
            isCompleted={isCurrentTabCompleted}
            nextTab={nextTab}
            model={carData && carData.name}
            tariff={
              additionsData.tariff && additionsData.tariff.rateTypeId.name
            }
            time={time && `${time.days}д ${time.hours}ч`}
            color={additionsData.color}
            fullTank={additionsData.isFullTank}
            babyChair={additionsData.isBabyChair}
            rightHand={additionsData.isRighthand}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
