import React, { useState } from "react"
import PropTypes from "prop-types"
import "./SearchInput.scss"
import CloseIcon from "../../assets/icons/close.svg"

const SearchInput = ({ description, placeholder }) => {
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
    <div className="search-input">
      <span className="search-input__description">{description}</span>
      <input
        value={inputText}
        onChange={onInputChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        placeholder={placeholder}
        className="search-input__text-field"
        type="text"
      />
      <img
        onKeyPress
        alt="close"
        role="none"
        onMouseDown={onCloseClick}
        className={
          isCloseVisible
            ? "search-input__close"
            : "search-input__close disabled"
        }
        src={CloseIcon}
      />
      <div
        className={
          isDatalistVisible
            ? "search-input__datalist"
            : "search-input__datalist disabled"
        }>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
        <span className="search-input__data-element">Ульяновск</span>
      </div>
    </div>
  )
}

SearchInput.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string
}

SearchInput.defaultProps = {
  description: undefined,
  placeholder: undefined
}

export default SearchInput
