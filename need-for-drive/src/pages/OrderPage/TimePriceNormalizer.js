const moment = require("moment")

export const datesToTime = (startDate, endDate) => {
  if (startDate && endDate && startDate.toString() !== endDate.toString()) {
    const start = moment(startDate, "DD-MM-YYYY HH:mm")
    const end = moment(endDate, "DD-MM-YYYY HH:mm")
    const diff = end.diff(start, "minutes")

    const numdays = Math.floor(diff / 1440)
    const numhours = Math.floor((diff % 1440) / 60)
    return { days: numdays, hours: numhours }
  }
  return null
}

export const calculatePriceByTime = (time, additionsData) => {
  let calculated
  const timeAsMinutes = time.days * 24 * 60
  const timeAsHours = time.hours * 60
  const totalMinutes = timeAsHours + timeAsMinutes
  if (additionsData.tariff.rateTypeId.unit === "мин") {
    calculated = totalMinutes * additionsData.tariff.price
  } else if (additionsData.tariff.rateTypeId.unit === "сутки") {
    calculated = totalMinutes * (additionsData.tariff.price / 24 / 60)
  } else if (additionsData.tariff.rateTypeId.unit === "7 дней") {
    calculated = totalMinutes * (additionsData.tariff.price / 7 / 24 / 60)
  } else if (additionsData.tariff.rateTypeId.unit === "30 дней") {
    calculated = totalMinutes * (additionsData.tariff.price / 30 / 24 / 60)
  }
  if (additionsData.isFullTank) {
    calculated += 500
  }
  if (additionsData.isBabyChair) {
    calculated += 200
  }
  if (additionsData.isRighthand) {
    calculated += 1600
  }
  if (time.hours || time.days) {
    return [Math.round(calculated)]
  }
  return null
}
