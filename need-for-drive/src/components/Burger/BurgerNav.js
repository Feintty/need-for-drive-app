import React, { useState } from "react"
import "./BurgerNav.scss"
import PropTypes from "prop-types"
import TelegramIcon from "../../assets/icons/telegram.svg"
import InstagramIcon from "../../assets/icons/instagram.svg"
import FacebookIcon from "../../assets/icons/facebook.svg"

const BurgerNav = ({ isHiding }) => {
  const [langSwap, setLangSwap] = useState(true)
  const listElements = [
    <li href="/" className="burger-nav__link link-dark">
      ПАРКОВКА
    </li>,
    <li href="/" className="burger-nav__link link-dark">
      СТРАХОВКА
    </li>,
    <li href="/" className="burger-nav__link link-dark">
      БЕНЗИН
    </li>,
    <li href="/" className="burger-nav__link link-dark">
      ОБСЛУЖИВАНИЕ
    </li>
  ]
  return (
    <>
      <div className={isHiding ? "burger-nav--main hide" : "burger-nav--main"}>
        <ul className="burger-nav__container">
          {listElements.map((el) => el)}
        </ul>
        <div className="burger-nav__socials">
          <img alt="icon" src={TelegramIcon} className="socials__icon" />
          <img alt="icon" src={FacebookIcon} className="socials__icon" />
          <img alt="icon" src={InstagramIcon} className="socials__icon" />
        </div>
        <button
          type="button"
          className="lang__button--burger button-round"
          onClick={() => setLangSwap(!langSwap)}>
          {langSwap ? <h4>Eng</h4> : <h4>Рус</h4>}
        </button>
      </div>
      <div
        className={isHiding ? "burger-nav--second hide" : "burger-nav--second"}
      />
    </>
  )
}

BurgerNav.propTypes = {
  isHiding: PropTypes.bool
}

BurgerNav.defaultProps = {
  isHiding: "true"
}

export default BurgerNav
