import React, { useContext } from "react"
import PropTypes from "prop-types"
import "./Bill.scss"
import { classes, content } from "./BillButtons"
import OrderPageContext from "../../pages/OrderPage/OrderPageContext"

const Bill = ({
  point,
  time,
  price,
  tab,
  isCompleted,
  nextTab,
  additionsData,
  carData,
  isPriceCorrect
}) => {
  const { setIsOrderCompleted } = useContext(OrderPageContext)
  const { color, isFullTank, isBabyChair, isRighthand, tariff } = additionsData
  const createBillElement = (elementName, option, isBool = false) => {
    if (!option) {
      return null
    }
    return (
      <div className="bill__element">
        <span className="bill__dots" />
        <span className="bill__element-name">{elementName}</span>
        <span className="bill__option">{isBool ? "Да" : option}</span>
      </div>
    )
  }
  const createPrice = () => {
    const normalizedPrice = null
    if (price && carData) {
      if (price.length === 2) {
        return (
          <div className="bill__price">
            Цена: от {price[0]}₽ до {price[1]}₽
          </div>
        )
      }
      if (isPriceCorrect) {
        return <div className="bill__price">Цена: {price[0]}₽</div>
      }
      return (
        <div className="bill__price error">
          Цена: {price[0]}₽ (от {carData.priceMin}₽ до {carData.priceMax}₽)
        </div>
      )
    }
    return normalizedPrice
  }

  return (
    <div className="bill">
      <h2 className="bill__heading">Ваш заказ:</h2>
      <div className="bill__pricelist">
        {createBillElement("Пункт выдачи", point)}
        {createBillElement("Модель", carData && carData.name)}
        {createBillElement("Цвет", color)}
        {createBillElement("Длительность аренды:", time)}
        {createBillElement("Тариф:", tariff && tariff.rateTypeId.name)}
        {createBillElement("Полный бак:", isFullTank, true)}
        {createBillElement("Детское кресло:", isBabyChair, true)}
        {createBillElement("Правый руль:", isRighthand, true)}
      </div>
      {createPrice()}
      {isCompleted ? (
        <button
          type="button"
          onClick={tab === 3 ? () => setIsOrderCompleted(true) : nextTab}
          className={`bill__button ${classes[tab]}`}>
          {content[tab]}
        </button>
      ) : (
        <button
          type="button"
          onClick={nextTab}
          disabled
          className="bill__button button-disabled">
          {content[tab]}
        </button>
      )}
    </div>
  )
}

Bill.propTypes = {
  additionsData: PropTypes.objectOf(),
  carData: PropTypes.objectOf(),
  point: PropTypes.string,
  price: PropTypes.arrayOf([PropTypes.number, PropTypes.number]),
  tab: PropTypes.number,
  isCompleted: PropTypes.bool,
  nextTab: PropTypes.func,
  isPriceCorrect: PropTypes.bool,
  time: PropTypes.arrayOf(PropTypes.number)
}

export default Bill
