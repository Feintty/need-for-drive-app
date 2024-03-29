import React from "react"
import "./StartScreen.scss"
import { Link } from "react-router-dom"
import Header from "../Header/Header"

const StartScreen = () => (
  <div className="start-screen">
    <Header addClassname="main-page-padding" />
    <div className="start-screen__content">
      <h2 className="content__heading-main">Каршеринг</h2>
      <h2 className="content__heading-second">Need for drive</h2>
      <h3 className="content__subheading">
        Поминутная аренда авто твоего города
      </h3>
      <Link to="/order">
        <button type="button" className="content__button button-default">
          Забронировать
        </button>
      </Link>
    </div>
    <footer className="start-screen__footer">
      <h4 className="footer__info">© 2016-2019 «Need for drive»</h4>
      <a href="tel:+8(495)234-22-44" className="footer__number link-light">
        8 (495) 234-22-44
      </a>
    </footer>
  </div>
)

export default StartScreen
