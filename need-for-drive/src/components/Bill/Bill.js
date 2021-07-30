import React from "react"
import PropTypes from "prop-types"
import "./Bill.scss"

const Bill = ({
  point,
  model,
  color,
  time,
  tariff,
  fullTank,
  babyChair,
  rightHand,
  price
}) => {
  //
  //   .toString()
  //   .split("")
  //   .slice(startWord.split("").length)

  const createBillElement = (elementName, option) =>
    option ? (
      <div className="bill__element">
        <span className="bill__dots">
          .......................................................
        </span>
        <span className="bill__element-name">{elementName}</span>
        <span className="bill__option">{option}</span>
      </div>
    ) : null

  const createPrice = () => {
    let normalizedPrice = false
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
        {time ? (
          <div className="bill__element">
            Длительность аренды:<div className="bill__option">{time}</div>
          </div>
        ) : null}
        {tariff ? (
          <div className="bill__element">
            Тариф:<div className="bill__option">{tariff}</div>
          </div>
        ) : null}
        {fullTank ? (
          <div className="bill__element">
            Полный бак:<div className="bill__option">{fullTank}</div>
          </div>
        ) : null}
        {babyChair ? (
          <div className="bill__element">
            Детское кресло:<div className="bill__option">{babyChair}</div>
          </div>
        ) : null}
        {rightHand ? (
          <div className="bill__element">
            Правый руль:<div className="bill__option">{rightHand}</div>
          </div>
        ) : null}
      </div>
      <div className="bill__price">Цена: {createPrice()}</div>
      <button type="button" className="bill__button button-disabled">
        Выбрать модель
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
  price: PropTypes.arrayOf([PropTypes.number, PropTypes.number])
}

Bill.defaultProps = {
  point: false,
  model: false,
  color: false,
  time: false,
  tariff: false,
  fullTank: false,
  babyChair: false,
  rightHand: false,
  price: false
}

export default Bill
