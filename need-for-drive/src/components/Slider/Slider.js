import React, { useState, useEffect } from "react";
import "./Slider.scss";
import ImgOne from "../../assets/images/car-1-min.png";
import ImgTwo from "../../assets/images/car-2-min.png";
import ImgThree from "../../assets/images/car-3-min.png";
import ImgFour from "../../assets/images/car-4-min.png";
import LeftIcon from "../../assets/icons/arrow-left.svg";
import RightIcon from "../../assets/icons/arrow-right.svg";

const Slider = () => {
  return (
    <div className="slider">
      <img src={ImgOne} className="slider__image visible"></img>
      <div className="slider__control--left">
        <img src={LeftIcon} className="control__image"></img>
      </div>
      <article className="slider__article">
        <h2 className="slider__heading">Бесплатная парковка</h2>
        <section className="slider__section">
          Оставляйте машину на платных городских парковках и разрешенных местах,
          не нарушая ПДД, а также в аэропортах.
        </section>
        <button className="slider__button button-default">Подробнее</button>
      </article>
      <div className="slider__control--right">
        <img src={RightIcon} className="control__image"></img>
      </div>
    </div>
  );
};

export default Slider;

//TODO: сделать конструкцию свитч-кейса на основе стейта
