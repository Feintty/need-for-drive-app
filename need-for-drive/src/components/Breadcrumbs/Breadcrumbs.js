import React from "react"
import "./Breadcrumbs.scss"
import Separator from "../../assets/icons/arrow-breadcrumbs.svg"

const Breadcrumbs = () => {
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

  const generateAccess = (completedSteps, currentStep) =>
    arr.map((el, index) => {
      if (index === currentStep) {
        return createCrumb(el, "current")
      }
      if (index <= completedSteps) {
        return createCrumb(el, "completed")
      }
      return createCrumb(el)
    })

  return <div className="breadcrumbs">{generateAccess(0, 0)}</div>
}

export default Breadcrumbs
