import React from "react"
import PropTypes from "prop-types"
import "./Bill.scss"
import { classes, content } from "./BillButtons"

const Bill = ({
  point,
  model,
  color,
  time,
  tariff,
  fullTank,
  babyChair,
  rightHand,
  price,
  tab,
  isCompleted,
  nextTab
}) => {
  const createBillElement = (elementName, option) => {
    if (!option) {
      return null
    }
    return (
      <div className="bill__element">
        <span className="bill__dots" />
        <span className="bill__element-name">{elementName}</span>
        <span className="bill__option">{option}</span>
      </div>
    )
  }
  const createPrice = () => {
    let normalizedPrice = null
    if (price) {
      normalizedPrice =
        price.length === 2 ? `от ${price[0]} до ${price[1]} ₽` : `${price[0]} ₽`
    }
    return normalizedPrice
  }

  return (
    <div className="bill">
      <h2 className="bill__heading">Ваш заказ:</h2>
      <div className="bill__pricelist">
        {createBillElement("Пункт выдачи", point)}
        {createBillElement("Модель", model)}
        {createBillElement("Цвет", color)}
        {createBillElement("Длительность аренды:", time)}
        {createBillElement("Тариф:", tariff)}
        {createBillElement("Полный бак:", fullTank)}
        {createBillElement("Детское кресло:", babyChair)}
        {createBillElement("Правый руль:", rightHand)}
      </div>
      <div className="bill__price">Цена: {createPrice()}</div>
      <button
        type="button"
        onClick={nextTab}
        className={`bill__button ${
          isCompleted ? classes[tab] : "button-disabled"
        }`}>
        {content[tab]}
      </button>
    </div>
  )
}

Bill.propTypes = {
  point: PropTypes.string,
  model: PropTypes.string,
  color: PropTypes.string,
  time: PropTypes.string,
  tariff: PropTypes.string,
  fullTank: PropTypes.string,
  babyChair: PropTypes.string,
  rightHand: PropTypes.string,
  price: PropTypes.arrayOf([PropTypes.number, PropTypes.number]),
  tab: PropTypes.number,
  isCompleted: PropTypes.bool,
  nextTab: PropTypes.func
}

export default Bill
