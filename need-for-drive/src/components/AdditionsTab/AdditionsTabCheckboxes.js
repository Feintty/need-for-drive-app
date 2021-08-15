import React from "react"
import PropTypes from "prop-types"

const AdditionsTabCheckboxes = ({
  adds,
  setIsFullTank,
  isFullTank,
  setIsBabyChair,
  isBabyChair,
  setIsRighthand,
  isRighthand
}) => {
  const checkboxOnChange = (e) => {
    if (e.target.value === adds[0]) {
      setIsFullTank(!isFullTank)
    } else if (e.target.value === adds[1]) {
      setIsBabyChair(!isBabyChair)
    } else if (e.target.value === adds[2]) {
      setIsRighthand(!isRighthand)
    }
  }

  const defaultCheckbox = (value) => {
    if (value === adds[0] && isFullTank) {
      return true
    }
    if (value === adds[1] && isBabyChair) {
      return true
    }
    if (value === adds[2] && isRighthand) {
      return true
    }
    return false
  }

  const createAddsCheckboxes = () =>
    adds.map((add) => (
      <label className="checkbox-container" htmlFor onChange={checkboxOnChange}>
        <input
          className="checkbox-input"
          type="checkbox"
          name="adds"
          value={add}
          checked={defaultCheckbox(add)}
        />
        <span className="checkbox-text">{add}</span>
      </label>
    ))

  return <>{createAddsCheckboxes()}</>
}

AdditionsTabCheckboxes.propTypes = {
  adds: PropTypes.arrayOf(PropTypes.string),
  setIsFullTank: PropTypes.func,
  isFullTank: PropTypes.bool,
  setIsBabyChair: PropTypes.func,
  isBabyChair: PropTypes.bool,
  setIsRighthand: PropTypes.func,
  isRighthand: PropTypes.bool
}

export default AdditionsTabCheckboxes
