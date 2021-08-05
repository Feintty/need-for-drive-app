import React, { useState } from "react"
import "./OrderPage.scss"
import BurgerNav from "../../components/Burger/BurgerNav"
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import Bill from "../../components/Bill/Bill"
import LocationTab from "../../components/LocationTab/LocationTab"

const OrderPage = () => {
  const [swapBurger, setSwapBurger] = useState(true)
  const [currentTab] = useState(0)
  const [order, setOrder] = useState({
    orderStatusId: {},
    cityId: {},
    pointId: {},
    carId: {},
    color: "string",
    dateFrom: 0,
    dateTo: 0,
    rateId: {},
    price: 0,
    isFullTank: true,
    isNeedChildChair: true,
    isRightWheel: true
  })

  const cityAndPointToOrder = (cityId, pointId) => {
    setOrder({ ...order, cityId, pointId })
  }

  return (
    <div className="order-page">
      <SideBar isBurgerHiding={swapBurger} setIsBurgerHiding={setSwapBurger} />
      <BurgerNav isHiding={swapBurger} />
      <div className="order-page__content">
        <Header addClassname="order-page-padding" />
        <Breadcrumbs />
        <div className="order-page__tabs">
          {currentTab === 0 && (
            <LocationTab cityAndPointToOrder={cityAndPointToOrder} />
          )}
          <Bill
            point="Ульяновск,
Нариманова 42"
            price={[8000, 12000]}
          />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
