import React, { useState, useEffect } from "react"
import "./OrderPage.scss"
import BurgerNav from "../../components/Burger/BurgerNav"
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import Bill from "../../components/Bill/Bill"
import LocationTab from "../../components/LocationTab/LocationTab"
import CarsTab from "../../components/CarsTab/CarsTab"

const OrderPage = () => {
  const [swapBurger, setSwapBurger] = useState(true)
  const [currentTab, setCurrentTab] = useState(0)
  const [isCurrentTabCompleted, setIsCurrentTabCompleted] = useState(false)
  const [completedLocations, setCompletedLocations] = useState([
    { isCompleted: false },
    { isCompleted: false },
    { isCompleted: false },
    { isCompleted: false }
  ])

  const [order, setOrder] = useState({
    orderStatusId: {},
    cityId: { pointId: null },
    pointId: { pointId: null },
    carId: null,
    color: null,
    dateFrom: 0,
    dateTo: 0,
    rateId: {},
    price: 0,
    isFullTank: true,
    isNeedChildChair: true,
    isRightWheel: true
  })

  const cityAndPointToOrder = (cityId, pointId) => {
    setOrder({ ...order, cityId: { cityId }, pointId: { pointId } })
  }

  const carToOrder = (car) => {
    setOrder({ ...order, carId: car })
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
    if (order.cityId.cityId && order.pointId.pointId) {
      changeBoolLocation(0, true)
    } else {
      changeBoolLocation(1, false)
    }
    if (order.carId) {
      changeBoolLocation(1, true)
    } else {
      changeBoolLocation(1, false)
    }
  }, [order])

  useEffect(() => {
    setIsCurrentTabCompleted(completedLocations[currentTab].isCompleted)
  }, [order, currentTab])

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
        />
        <div className="order-page__tabs">
          {currentTab === 0 && (
            <LocationTab cityAndPointToOrder={cityAndPointToOrder} />
          )}
          {currentTab === 1 && <CarsTab carToOrder={carToOrder} />}
          <Bill
            point={
              order.pointId.pointId &&
              order.cityId.cityId &&
              `${order.cityId.cityId}, ${order.pointId.pointId}`
            }
            price={order.carId && [order.carId.priceMin, order.carId.priceMax]}
            tab={currentTab}
            isCompleted={isCurrentTabCompleted}
            nextTab={nextTab}
            model={order.carId && order.carId.name}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
