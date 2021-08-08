import React from "react"
import PropTypes from "prop-types"
import "./CarCard.scss"

const CarCard = ({ name, priceMin, priceMax, image, carClick, carData }) => (
  <div
    className="car-card"
    onKeyDown
    role="button"
    onClick={() => carClick(carData)}
    tabIndex="0">
    <div className="car-card__info">
      <h2 className="car-card__name">{name}</h2>
      <h3 className="car-card__price">
        {priceMin} - {priceMax} ₽
      </h3>
    </div>
    <img
      src={
        image.split("")[0] === "/"
          ? `${process.env.REACT_APP_API_URL}${image}`
          : image
      }
      alt="car"
      className="car-card__image"
    />
  </div>
)

CarCard.propTypes = {
  name: PropTypes.string,
  priceMin: PropTypes.number,
  priceMax: PropTypes.number,
  image: PropTypes.string,
  carClick: PropTypes.func,
  carData: PropTypes.objectOf()
}
export default CarCard
