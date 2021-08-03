import React, { useState } from "react"
import PropTypes from "prop-types"
import "./TextInput.scss"
import CloseIcon from "../../assets/icons/close.svg"

const TextInput = ({ description, placeholder }) => {
  const [inputText, setInputText] = useState("")
  const [isCloseVisible, setIsCloseVisible] = useState(false)
  const [isDatalistVisible, setIsDatalistVisible] = useState(false)

  const onInputFocus = () => {
    setIsCloseVisible(true)
  }

  const onInputBlur = () => {
    setIsCloseVisible(false)
    setIsDatalistVisible(false)
  }

  const onInputChange = (e) => {
    setInputText(e.target.value)
    if (e.target.value === "") {
      setIsDatalistVisible(false)
    } else {
      setIsDatalistVisible(true)
    }
  }

  const onCloseClick = () => {
    setInputText("")
  }

  return (
    <div className="text-input">
      <span className="text-input__description">{description}</span>
      <input
        value={inputText}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        placeholder={placeholder}
        className="text-input__text-field"
        type="text"
      />
      <img
        onKeyPress
        alt="close"
        role="none"
        onMouseDown={onCloseClick}
        className={
          isCloseVisible ? "text-input__close" : "text-input__close disabled"
        }
        src={CloseIcon}
      />
      <div
        className={
          isDatalistVisible
            ? "text-input__datalist"
            : "text-input__datalist disabled"
        }>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
        <span className="text-input__data-element">Ульяновск</span>
      </div>
    </div>
  )
}

TextInput.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string
}

TextInput.defaultProps = {
  description: undefined,
  placeholder: undefined
}

export default TextInput
