import React, { useState } from "react"
import "./OrderPage.scss"
import BurgerNav from "../../components/Burger/BurgerNav"
import Header from "../../components/Header/Header"
import SideBar from "../../components/SideBar/SideBar"
import Map from "../../components/Map/Map"
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"

const OrderPage = () => {
  const [swapBurger, setSwapBurger] = useState(true)

  return (
    <div className="order-page">
      <SideBar isBurgerHiding={swapBurger} setIsBurgerHiding={setSwapBurger} />
      <BurgerNav isHiding={swapBurger} />
      <div className="order-page__content">
        <Header addClassname="order-page-padding" />
        <Breadcrumbs />
        <div className="order-page__order">
          <Map />
        </div>
      </div>
    </div>
  )
}

export default OrderPage
