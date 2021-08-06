import React, { useState } from "react"
import "./Slider.scss"
import ImgOne from "../../assets/images/car-1-min.png"
import ImgTwo from "../../assets/images/car-2-min.png"
import ImgThree from "../../assets/images/car-3-min.png"
import ImgFour from "../../assets/images/car-4-min.png"
import LeftIcon from "../../assets/icons/arrow-left.svg"
import RightIcon from "../../assets/icons/arrow-right.svg"
import { buttonClasses } from "./SliderButtonClasses"
import { content } from "./SliderContent"

const Slider = () => {
  const [currentBlock, setCurrentBlock] = useState(0)
  const headers = ["Бесплатная парковка", "Страховка", "Бензин", "Обслуживание"]
  const backgrounds = [ImgOne, ImgTwo, ImgThree, ImgFour]
  const dots = () =>
    new Array(4)
      .fill()
      .map((el, index) => (
        <div
          className={
            currentBlock === index ? "state__dot active" : "state__dot"
          }
        />
      ))

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
        <button
          type="button"
          className={`slider__button ${buttonClasses[currentBlock]}`}>
          Подробнее
        </button>
      </article>
      <div className="slider__state">{dots()}</div>
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
