import React, { useState, useEffect } from "react";
import "./BurgerNav.scss";
import TelegramIcon from "../../assets/icons/telegram.svg";
import InstagramIcon from "../../assets/icons/instagram.svg";
import FacebookIcon from "../../assets/icons/facebook.svg";

const BurgerNav = ({ isHiding }) => {
  const [langSwap,setLangSwap] = useState(true)
  return (
    <React.Fragment>
      <div className={isHiding ? "burger-nav--main hide" : "burger-nav--main"}>
        <nav className="burger-nav__container">
          <a href="/" className="burger-nav__link link-dark">
            ПАРКОВКА
          </a>
          <a href="/" className="burger-nav__link link-dark">
            СТРАХОВКА
          </a>
          <a href="/" className="burger-nav__link link-dark">
            БЕНЗИН
          </a>
          <a href="/" className="burger-nav__link link-dark">
            ОБСЛУЖИВАНИЕ
          </a>
        </nav>
        <div className="burger-nav__socials">
          <img src={TelegramIcon} className="socials__icon"></img>
          <img src={FacebookIcon} className="socials__icon"></img>
          <img src={InstagramIcon} className="socials__icon"></img>
        </div>
        <button className="lang__button--burger button-round" onClick={()=>setLangSwap(!langSwap)}>{langSwap?<h4>Eng</h4>:<h4>Рус</h4>}</button>
      </div>
      <div
        className={isHiding ? "burger-nav--second hide" : "burger-nav--second"}
      ></div>
    </React.Fragment>
  );
};

export default BurgerNav;
