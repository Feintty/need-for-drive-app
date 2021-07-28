import React from "react"
// import PropTypes from "prop-types"
import "./Breadcrumbs.scss"
import Data from "./BreadCrumbsData"

const Breadcrumbs = () => (
  <div className="breadcrumbs">{Data.map((crumb) => crumb)}</div>
)

// Breadcrumbs.propTypes = {
//   completedSteps: PropTypes.number,
//   activeStep: PropTypes.number
// }

// Breadcrumbs.defaultProps = {
//   completedSteps: 0,
//   activeStep: 0
// }

export default Breadcrumbs
