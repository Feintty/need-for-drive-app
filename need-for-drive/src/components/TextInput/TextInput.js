import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "./TextInput.scss"
import CloseIcon from "../../assets/icons/close.svg"

const TextInput = ({
  description,
  placeholder,
  datalistItems,
  setDataElement,
  text
}) => {
  const [inputText, setInputText] = useState(text)
  const [filteredData, setFilteredData] = useState()
  const [isCloseVisible, setIsCloseVisible] = useState(false)
  const [isDatalistVisible, setIsDatalistVisible] = useState(false)

  useEffect(() => {
    setInputText(text)
    setDataElement(text)
  }, [text])

  const onInputFocus = () => {
    setIsCloseVisible(true)
    setIsDatalistVisible(true)
  }

  const onInputBlur = () => {
    setIsCloseVisible(false)
    setIsDatalistVisible(false)
  }

  const onItemClick = (e) => {
    if (setDataElement) {
      setDataElement(e.target.innerText)
    }
    setInputText(e.target.innerText)
  }

  const onInputChange = (e) => {
    setInputText(e.target.value)
  }

  const onCloseClick = () => {
    setInputText("")
    setDataElement("")
  }

  useEffect(() => {
    if (!!datalistItems && inputText !== "") {
      setFilteredData(
        datalistItems.filter((item) =>
          RegExp(`^${inputText.toLowerCase()}`).test(item.name.toLowerCase())
        )
      )
    } else if (datalistItems) {
      setFilteredData(datalistItems)
    }
  }, [datalistItems, inputText])

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
        {filteredData &&
          filteredData.map((item) => (
            <span
              className="text-input__data-element"
              onMouseDown={onItemClick}
              role="none">
              {item.name}
            </span>
          ))}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string,
  datalistItems: PropTypes.arrayOf(PropTypes.string),
  setDataElement: PropTypes.func,
  text: PropTypes.string
}

export default TextInput
