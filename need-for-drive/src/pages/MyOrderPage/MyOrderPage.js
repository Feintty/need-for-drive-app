import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../../components/Header/Header"
import { fetchOrder, deleteOrder } from "./MyOrderPageApi"
import "./MyOrderPage.scss"
import SideBar from "../../components/SideBar/SideBar"
import BurgerNav from "../../components/Burger/BurgerNav"
import Bill from "../../components/Bill/Bill"
import OrderCard from "../../components/OrderCard/OrderCard"
import {
  calculatePriceByTime,
  datesToTime
} from "../OrderPage/TimePriceNormalizer"
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm"

const moment = require("moment")

const MyOrderPage = () => {
  const { id } = useParams()
  const [orderData, setOrderData] = useState()
  const [error, setError] = useState(false)
  const [swapBurger, setSwapBurger] = useState(true)
  const [time, setTime] = useState(null)
  const [isModalOpened, setIsModalOpened] = useState(false)

  useEffect(() => {
    fetchOrder(id, setOrderData, setError)
  }, [id])

  const convertAdditionsData = () => ({
    color: orderData.color,
    startDate: orderData.dateFrom,
    endDate: orderData.dateTo,
    tariff: orderData.rateId,
    isFullTank: orderData.isFullTank,
    isBabyChair: orderData.isNeedChildChair,
    isRighthand: orderData.isRightWheel
  })

  const createCanceledOrder = () => ({
    orderStatusId: "5e26a1f5099b810b946c5d8c",
    cityId: orderData.cityId.id,
    pointId: orderData.pointId.id,
    carId: orderData.carId.id,
    rateId: orderData.rateId.id,
    dateFrom: orderData.dateFrom,
    dateTo: orderData.dateTo,
    color: orderData.color,
    price: orderData.price,
    isFullTank: orderData.isFullTank,
    isNeedChildChair: orderData.isNeedChildChair,
    isRightWheel: orderData.isRightWheel
  })

  useEffect(() => {
    if (orderData) {
      const firstDate = moment(orderData.dateFrom).format("DD-MM-YYYY HH:mm")
      const secondDate = moment(orderData.dateTo).format("DD-MM-YYYY HH:mm")
      setTime(datesToTime(firstDate, secondDate))
    }
  }, [orderData])

  if (error) {
    return (
      <div className="myorder-page">
        <SideBar
          isBurgerHiding={swapBurger}
          setIsBurgerHiding={setSwapBurger}
        />
        <BurgerNav isHiding={swapBurger} />
        <div className="myorder-page__wrap">
          <Header addClassname="myorder-page-padding" />
          <div className="myorder-page__id">
            <h3>Заказ не найден</h3>
          </div>
          <div className="myorder-page__content">
            <h3 className="myorder-page__heading">Ваш заказ отсутствует</h3>
          </div>
        </div>
      </div>
    )
  }
  if (orderData && time) {
    return (
      <div className="myorder-page">
        <ModalConfirm
          onConfirmClick={() => {
            deleteOrder(id, createCanceledOrder(), setOrderData, setError)
            setIsModalOpened(false)
          }}
          isOpened={isModalOpened}
          setIsOpened={setIsModalOpened}
          isCancel
        />
        <SideBar
          isBurgerHiding={swapBurger}
          setIsBurgerHiding={setSwapBurger}
        />
        <BurgerNav isHiding={swapBurger} />
        <div className="myorder-page__wrap">
          <Header addClassname="myorder-page-padding" />
          <div className="myorder-page__id">
            <h3>Заказ номер {id}</h3>
          </div>
          <div className="myorder-page__content">
            <div className="myorder-page__order-details">
              <h3 className="myorder-page__heading">
                {orderData.orderStatusId.name === "Новые"
                  ? "Ваш заказ потвержден"
                  : "Ваш заказ отменен"}
              </h3>
              <OrderCard
                carData={orderData.carId}
                additionsData={convertAdditionsData()}
              />
            </div>
            <Bill
              point={`${orderData.cityId.name}, ${orderData.pointId.address}`}
              tab={4}
              time={time && `${time.days}д ${time.hours}ч`}
              price={calculatePriceByTime(time, convertAdditionsData())}
              isCompleted={orderData.orderStatusId.name === "Новые"}
              nextTab={() => setIsModalOpened(true)}
              additionsData={convertAdditionsData()}
              carData={orderData.carId}
              isPriceCorrect
            />
          </div>
        </div>
      </div>
    )
  }
  return <div>загрузка</div>
}
export default MyOrderPage
