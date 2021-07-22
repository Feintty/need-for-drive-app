import React from "react"
import "./Slider.scss"
import ImgOne from "../../assets/images/car-1-min.png"

import LeftIcon from "../../assets/icons/arrow-left.svg"
import RightIcon from "../../assets/icons/arrow-right.svg"

const Slider = () => (
  <div className="slider">
    <img src={ImgOne} alt="background" className="slider__image" />
    <div className="slider__control--left" role="button" tabIndex="0">
      <img src={LeftIcon} alt="left_arrow" className="control__image" />
    </div>
    <article className="slider__article">
      <h2 className="slider__heading">Бесплатная парковка</h2>
      <section className="slider__section">
        Оставляйте машину на платных городских парковках и разрешенных местах,
        не нарушая ПДД, а также в аэропортах.
      </section>
      <button type="button" className="slider__button button-default">
        Подробнее
      </button>
    </article>
    <div className="slider__state">
      <div className="state__dot active" />
      <div className="state__dot" />
      <div className="state__dot" />
      <div className="state__dot" />
    </div>
    <div className="slider__control--right">
      <img src={RightIcon} alt="right_arrow" className="control__image" />
    </div>
  </div>
)

export default Slider

// TODO: сделать конструкцию свитч-кейса на основе стейта
