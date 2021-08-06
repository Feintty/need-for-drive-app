import React from "react"
import PropTypes from "prop-types"
import DestinationIcon from "../../assets/icons/destination.svg"
import "./Header.scss"

const Header = ({ addClassname }) => (
  <header className={addClassname ? `header ${addClassname}` : "header"}>
    <h1 className="header__logo">Need for drive</h1>
    <div className="header__destination">
      <img
        alt="destination-pin"
        src={DestinationIcon}
        className="destination__icon"
      />
      <div className="destination__name">Ульяновск</div>
    </div>
  </header>
)

Header.propTypes = {
  addClassname: PropTypes.string
}

export default Header
