import React from "react"
import "./Breadcrumbs.scss"
import PropTypes from "prop-types"
import Separator from "../../assets/icons/arrow-breadcrumbs.svg"

const Breadcrumbs = ({ completedSteps, currentStep, onBreadcrumbClick }) => {
  const arr = ["Местоположение", "Модель", "Дополнительно", "Итого"]
  const createCrumb = (name, type = "", id) => (
    <>
      <button
        onClick={() => onBreadcrumbClick(id)}
        type="button"
        className={`breadcrumbs__element${` ${type}`}`}>
        {" "}
        {name}
      </button>
      <img src={Separator} alt="sep" />
    </>
  )

  const generateAccess = (completed, current) =>
    arr.map((el, index) => {
      if (index === current) {
        return createCrumb(el, "current", index)
      }
      if (index <= completed) {
        return createCrumb(el, "completed", index)
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
  currentStep: PropTypes.number,
  onBreadcrumbClick: PropTypes.func
}

export default Breadcrumbs
