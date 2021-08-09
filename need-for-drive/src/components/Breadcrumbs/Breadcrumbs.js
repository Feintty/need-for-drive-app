import React from "react"
import "./Breadcrumbs.scss"
import PropTypes from "prop-types"
import Separator from "../../assets/icons/arrow-breadcrumbs.svg"

const Breadcrumbs = ({ completedSteps, currentStep }) => {
  const arr = ["Местоположение", "Модель", "Дополнительно", "Итого"]
  const createCrumb = (name, type = "") => (
    <>
      <button type="button" className={`breadcrumbs__element${` ${type}`}`}>
        {" "}
        {name}
      </button>
      <img src={Separator} alt="sep" />
    </>
  )

  const generateAccess = (completed, current) =>
    arr.map((el, index) => {
      if (index === current) {
        return createCrumb(el, "current")
      }
      if (index <= completed - 1) {
        return createCrumb(el, "completed")
      }
      return createCrumb(el)
    })

  return (
    <div className="breadcrumbs">
      {generateAccess(completedSteps, currentStep)}
    </div>
  )
}

Breadcrumbs.propTypes = {
  completedSteps: PropTypes.number,
  currentStep: PropTypes.number
}

export default Breadcrumbs
