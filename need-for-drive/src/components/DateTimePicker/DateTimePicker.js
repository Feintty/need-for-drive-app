import React, { useState } from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "./DateTimePicker.scss"
import Close from "../../assets/icons/close.svg"

const DateTimePicker = ({ value, setValue, minDate,maxDate }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div className="data-time">
      <h3 className="data-time__description">С</h3>
      <DatePicker
        selected={value}
        placeholderText="Введите дату и время"
        className="date-time__picker"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(date) => setValue(date)}
        isClearable
        showTimeInput
        clearButtonClassName="disabled"
        dateFormat="dd.MM.yyyy h:mm"
        minDate={minDate || new Date()}
        maxDate={maxDate && maxDate}
      />
      <img
        className={`data-time__close${focused ? "" : " disabled"}`}
        src={Close}
        alt="close"
        role="none"
        onMouseDown={() => {
          setValue("")
          setFocused(false)
        }}
      />
    </div>
  )
}

DateTimePicker.propTypes = {
  value: PropTypes.objectOf,
  setValue: PropTypes.func,
  minDate: PropTypes.func,
  maxDate: PropTypes.func
}

export default DateTimePicker
