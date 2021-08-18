import React, { useEffect, useContext, useState } from "react"
import PropTypes from "prop-types"
import "./SummaryTab.scss"
import { Redirect } from "react-router-dom"
import ModalConfirm from "../ModalConfirm/ModalConfirm"
import { fetchStatus, postOrder } from "./SummaryTabApi"
import OrderPageContext from "../../pages/OrderPage/OrderPageContext"
import OrderCard from "../OrderCard/OrderCard"

const moment = require("moment")

const SummaryTab = ({ isActive }) => {
  const [error, setError] = useState(false)
  const [orderStatus, setOrderStatus] = useState()
  const [orderData, setOrderData] = useState()
  const { additionsData, carData, locationData, price } =
    useContext(OrderPageContext)

  useEffect(() => {
    fetchStatus(setOrderStatus, setError)
  }, [])

  const confirmOrder = () => {
    if (orderStatus) {
      const currentStatus = orderStatus.find((el) => el.name === "Новые")
      postOrder(
        {
          orderStatusId: { id: currentStatus.id },
          cityId: { id: locationData.city.id },
          pointId: { id: locationData.point.id },
          carId: { id: carData.id },
          color: additionsData.color,
          dateFrom: moment(additionsData.startDate).valueOf(),
          dateTo: moment(additionsData.endDate).valueOf(),
          rateId: { id: additionsData.tariff.id },
          price,
          isFullTank: additionsData.isFullTank,
          isNeedChildChair: additionsData.isBabyChair,
          isRightWheel: additionsData.isRighthand
        },
        setOrderData,
        setError
      )
    }
  }

  if (orderData?.id) {
    return <Redirect to={`/myorder/${orderData.id}`} />
  }

  if (!isActive || error) {
    return null
  }
  return (
    <div className="summary-tab">
      <ModalConfirm onConfirmClick={confirmOrder} />
      <OrderCard additionsData={additionsData} carData={carData} />
    </div>
  )
}
SummaryTab.propTypes = {
  isActive: PropTypes.bool
}

export default SummaryTab
