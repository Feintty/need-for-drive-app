import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./RadioButton.scss"

const RadioButton = ({ description, onChecked, active }) => {
  const [isChecked, setIsChecked] = useState(active === description)

  useEffect(() => {
    setIsChecked(active === description)
  }, [active])

  const checkClick = () => {
    onChecked(description)
  }

  return (
    <div className={`radio-button ${isChecked ? " checked" : ""}`}>
      <div role="none" onClick={checkClick} className="radio-button__marker" />
      <div className="radio-button__description">{description}</div>
    </div>
  )
}
RadioButton.propTypes = {
  description: PropTypes.string,
  onChecked: PropTypes.func,
  active: PropTypes.string
}

export default RadioButton
