import React, { useState } from "react"
import "./Slider.scss"
import ImgOne from "../../assets/images/car-1-min.png"
import ImgTwo from "../../assets/images/car-2-min.png"
import ImgThree from "../../assets/images/car-3-min.png"
import ImgFour from "../../assets/images/car-4-min.png"
import LeftIcon from "../../assets/icons/arrow-left.svg"
import RightIcon from "../../assets/icons/arrow-right.svg"

const Slider = () => {
  const [currentBlock, setCurrentBlock] = useState(0)
  const headers = ["Бесплатная парковка", "Страховка", "Бензин", "Обслуживание"]
  const content = [
    "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
    "Полная страховка страховка автомобиля",
    "Полный бак на любой заправке города за наш счёт",
    "Автомобиль проходит еженедельное ТО"
  ]
  const buttonClasses = [
    "slider__button button-colorized-green",
    "slider__button button-colorized-mint",
    "slider__button button-colorized-red",
    "slider__button button-colorized-purple"
  ]
  const dots = [
    <div className={currentBlock === 0 ? "state__dot active" : "state__dot"} />,
    <div className={currentBlock === 1 ? "state__dot active" : "state__dot"} />,
    <div className={currentBlock === 2 ? "state__dot active" : "state__dot"} />,
    <div className={currentBlock === 3 ? "state__dot active" : "state__dot"} />
  ]
  const backgrounds = [ImgOne, ImgTwo, ImgThree, ImgFour]

  const onClickLeft = () => {
    if (currentBlock === 0) {
      setCurrentBlock(3)
    } else {
      setCurrentBlock(currentBlock - 1)
    }
  }

  const onClickRight = () => {
    if (currentBlock === 3) {
      setCurrentBlock(0)
    } else {
      setCurrentBlock(currentBlock + 1)
    }
  }

  return (
    <div className="slider">
      <img
        src={backgrounds[currentBlock]}
        alt="background"
        className="slider__image"
      />
      <div
        onClick={onClickLeft}
        onKeyPress
        className="slider__control--left"
        role="button"
        tabIndex="0">
        <img src={LeftIcon} alt="left_arrow" className="control__image" />
      </div>
      <article className="slider__article">
        <h2 className="slider__heading">{headers[currentBlock]}</h2>
        <section className="slider__section">{content[currentBlock]}</section>
        <button type="button" className={buttonClasses[currentBlock]}>
          Подробнее
        </button>
      </article>
      <div className="slider__state">{dots.map((el) => el)}</div>
      <div
        onKeyPress
        onClick={onClickRight}
        role="button"
        tabIndex="0"
        className="slider__control--right">
        <img src={RightIcon} alt="right_arrow" className="control__image" />
      </div>
    </div>
  )
}

export default Slider
