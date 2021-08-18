import React from "react"
import PropTypes from "prop-types"

const AdditionsTabColorRadios = ({
  carColors,
  currentColor,
  setCurrentColor
}) => {
  const radioOnChange = (e) => {
    if (e.target.name === "colors") {
      setCurrentColor(e.target.value)
    }
  }

  return (
    <>
      {["Любой", ...carColors].map((color) => (
        <label className="radio-container" onChange={radioOnChange} htmlFor>
          <input
            className="radio-input"
            type="radio"
            name="colors"
            value={color}
            checked={color === currentColor}
          />
          <span className="radio-text">{color}</span>
        </label>
      ))}
    </>
  )
}

AdditionsTabColorRadios.propTypes = {
  carColors: PropTypes.arrayOf(),
  currentColor: PropTypes.string,
  setCurrentColor: PropTypes.func
}

export default AdditionsTabColorRadios
