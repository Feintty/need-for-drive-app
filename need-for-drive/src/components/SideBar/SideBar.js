import React, { useState } from "react"
import "./SideBar.scss"
import PropTypes from "prop-types"
import Burger from "../../assets/icons/sidebar-burger.svg"
import Close from "../../assets/icons/close.svg"

const SideBar = ({ isBurgerHiding, setIsBurgerHiding }) => {
  const [langSwap, setLangSwap] = useState(true)
  const [burgerSwap, setBurgerSwap] = useState(true)

  const onBurgerClick = () => {
    setBurgerSwap(!burgerSwap)
    setIsBurgerHiding(!isBurgerHiding)
  }

  return (
    <div className="side-bar">
      <aside className="side-bar__burger">
        <button
          type="button"
          className="burger__button button-nullstyle"
          onClick={onBurgerClick}>
          <img
            alt="burger"
            className={burgerSwap ? "burger__img" : "burger__img--close"}
            src={burgerSwap ? Burger : Close}
          />
        </button>
      </aside>
      <aside className="side-bar__lang">
        <button
          type="button"
          className="lang__button button-round"
          onClick={() => setLangSwap(!langSwap)}>
          {langSwap ? <h4>Eng</h4> : <h4>Рус</h4>}
        </button>
      </aside>
    </div>
  )
}

SideBar.propTypes = {
  isBurgerHiding: PropTypes.bool,
  setIsBurgerHiding: PropTypes.func
}

SideBar.defaultProps = {
  isBurgerHiding: true,
  setIsBurgerHiding: undefined
}

export default SideBar
