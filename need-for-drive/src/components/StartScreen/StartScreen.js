import React, { useState, useEffect } from "react";
import "./StartScreen.scss";
import DestinationIcon from "../../assets/icons/destination.svg";

const StartScreen = () => {
  return (
    <div className="start-screen">
      <header className="start-screen__header">
        <h1 className="header__logo">Need for drive</h1>
        <div className="header__destination">
          <img src={DestinationIcon} className="destination__icon" />
          <div className="destination__name">Ульяновск</div>
        </div>
      </header>
      <div className="start-screen__content">
        <h2 className="content__heading-main">Каршеринг</h2>
        <h2 className="content__heading-second">Need for drive</h2>
        <h3 className="content__subheading">
          Поминутная аренда авто твоего города
        </h3>
        <button className="content__button button-default">Забронировать</button>
      </div>
      <footer className="start-screen__footer">
        <h4 className="footer__info">© 2016-2019 «Need for drive»</h4>
        <h4 className="footer__number">8 (495) 234-22-44</h4>
      </footer>
    </div>
  );
};

export default StartScreen;