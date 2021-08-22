import React, { useState, useEffect } from "react"
import "./OrderPage.scss"
import BurgerNav from "../../components/Burger/BurgerNav"
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import LocationTab from "../../components/LocationTab/LocationTab"
import CarsTab from "../../components/CarsTab/CarsTab"
import AdditionsTab from "../../components/AdditionsTab/AdditionsTab"
import OrderPageBill from "./OrderPageBill"
import SummaryTab from "../../components/SummaryTab/SummaryTab"
import OrderPageContext from "./OrderPageContext"
import {
  defaultCompletedLocations,
  defaultAdditionsData
} from "./OrderPageDefaultStates"

const OrderPage = () => {
  const [swapBurger, setSwapBurger] = useState(true)
  const [currentTab, setCurrentTab] = useState(0)
  const [locationData, setLocationData] = useState({ city: null, point: null })
  const [carData, setCarData] = useState()
  const [additionsData, setAdditionsData] = useState(defaultAdditionsData)
  const [time, setTime] = useState()
  const [price, setPrice] = useState()
  const [isCurrentTabCompleted, setIsCurrentTabCompleted] = useState(false)
  const [isAdditionsCanReset, setIsAdditionsCanReset] = useState(false)
  const [isCarCanReset, setIsCarCanReset] = useState(false)
  const [isPriceCorrect, setIsPriceCorrect] = useState(false)
  const [completedLocations, setCompletedLocations] = useState(
    defaultCompletedLocations
  )
  const [isOrderCompleted, setIsOrderCompleted] = useState(false)

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
    if (carData) {
      setPrice([carData.priceMin, carData.priceMax])
    }
  }, [carData])

  useEffect(() => {
    resetAdditons()
    resetCar()
  }, [locationData])

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
      changeBoolLocation(0, false)
    }
    if (carData) {
      changeBoolLocation(1, true)
    } else {
      changeBoolLocation(1, false)
    }
    if (
      Object.values(additionsData).every((value) => value !== null) &&
      isPriceCorrect
    ) {
      changeBoolLocation(2, true)
      changeBoolLocation(3, true)
    } else {
      changeBoolLocation(2, false)
      changeBoolLocation(3, false)
    }
  }, [carData, locationData, additionsData, price])

  const changeLocationClick = (tab) => {
    if (completedLocations[tab]) {
      setCurrentTab(tab)
    }
  }

  useEffect(() => {
    setIsCurrentTabCompleted(completedLocations[currentTab].isCompleted)
  }, [locationData, carData, additionsData, currentTab, price])

  return (
    <div className="order-page">
      <OrderPageContext.Provider
        value={{
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
          isOrderCompleted,
          setIsOrderCompleted
        }}>
        <SideBar
          isBurgerHiding={swapBurger}
          setIsBurgerHiding={setSwapBurger}
        />
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
              isCanReset={isAdditionsCanReset}
              isCanResetChange={setIsAdditionsCanReset}
            />
            <SummaryTab isActive={currentTab === 3} />
            <OrderPageBill />
          </div>
        </div>
      </OrderPageContext.Provider>
    </div>
  )
}

export default OrderPage
