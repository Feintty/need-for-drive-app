import React from "react"
import PropTypes from "prop-types"
import DateTimePicker from "../DateTimePicker/DateTimePicker"

const DateTimeInterval = ({
  valueFirst,
  valueSecond,
  setValueFirst,
  setValueSecond
}) => (
  <>
    <DateTimePicker
      value={valueFirst}
      setValue={setValueFirst}
      maxDate={valueSecond && valueSecond}
    />
    <DateTimePicker
      value={valueSecond}
      setValue={setValueSecond}
      minDate={setValueFirst && valueFirst}
    />
  </>
)

DateTimeInterval.propTypes = {
  valueFirst: PropTypes.objectOf(),
  valueSecond: PropTypes.objectOf(),
  setValueFirst: PropTypes.func,
  setValueSecond: PropTypes.func
}
export default DateTimeInterval
