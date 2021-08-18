import React from "react"
import PropTypes from "prop-types"

const AdditionsTabTariffRadios = ({
  tariffs,
  time,
  currentTariff,
  setCurrentTariff
}) => {
  const radioOnChange = (e) => {
    if (e.target.name === "tariffs") {
      setCurrentTariff(
        tariffs.find((tariff) => tariff.rateTypeId.name === e.target.value)
      )
    }
  }

  const createTariffRadios = () =>
    tariffs.map((tariff) => {
      if (
        (time?.days || time?.hours) &&
        ((tariff.rateTypeId.unit === "сутки" && time.days > 0) ||
          (tariff.rateTypeId.unit === "7 дней" && time.days >= 7) ||
          (tariff.rateTypeId.unit === "30 дней" && time.days >= 30) ||
          tariff.rateTypeId.unit === "мин")
      ) {
        return (
          <label className="radio-container" onChange={radioOnChange} htmlFor>
            <input
              className="radio-input"
              type="radio"
              name="tariffs"
              checked={
                currentTariff &&
                currentTariff.rateTypeId.name === tariff.rateTypeId.name
              }
              value={tariff.rateTypeId.name}
            />
            <span className="radio-text">{`${tariff.rateTypeId.name}, ${tariff.price}₽ / ${tariff.rateTypeId.unit}`}</span>
          </label>
        )
      }

      return (
        <label className="radio-container" onChange={radioOnChange} htmlFor>
          <input
            className="radio-input"
            type="radio"
            name="tariffs"
            disabled
            checked={false}
          />
          <span className="radio-text">
            <s>{tariff.rateTypeId.name}</s>
          </span>
        </label>
      )
    })

  return <>{createTariffRadios()}</>
}

AdditionsTabTariffRadios.propTypes = {
  tariffs: PropTypes.arrayOf(),
  time: PropTypes.objectOf(),
  currentTariff: PropTypes.objectOf(),
  setCurrentTariff: PropTypes.func
}

export default AdditionsTabTariffRadios
