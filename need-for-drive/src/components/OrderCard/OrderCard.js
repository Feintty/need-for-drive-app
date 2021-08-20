import React from "react"
import PropTypes from "prop-types"
import "./OrderCard.scss"

const moment = require("moment")

const OrderCard = ({ carData, additionsData }) => {
  const normalizeCarNumber = (number) => {
    if (number && number.length === 9) {
      const returnNumber = number.split("")
      returnNumber.splice(1, 0, " ")
      returnNumber.splice(5, 0, " ")
      returnNumber.splice(8, 0, " ")
      return returnNumber.join("")
    }
    if (number && number.length > 3) {
      return number
    }
    return "нет данных"
  }

  return (
    <div className="order-card">
      <div className="order-card__content">
        <h3 className="order-card__car-name">{carData.name}</h3>
        <div className="order-card__number car-license-card">
          {normalizeCarNumber(carData.number)}
        </div>
        <div className="order-card__tank">
          <b>Топливо</b>{" "}
          {additionsData.isFullTank
            ? "100%"
            : `${carData.tank ? `${carData.tank}%` : "нет данных"}`}
        </div>
        <div className="order-card__start">
          <b>Доступна с</b>{" "}
          {moment(additionsData.startDate).format("DD.MM.YYYY HH:mm")}
        </div>
      </div>
      <img
        alt="car"
        className="order-card__img"
        src={
          carData.thumbnail.path.split("")[0] === "/"
            ? `${process.env.REACT_APP_API_URL}${carData.thumbnail.path}`
            : carData.thumbnail.path
        }
      />
    </div>
  )
}
OrderCard.propTypes = {
  carData: PropTypes.objectOf(),
  additionsData: PropTypes.objectOf()
}
export default OrderCard
