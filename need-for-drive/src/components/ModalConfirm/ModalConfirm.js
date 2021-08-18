import React, { useContext } from "react"
import "./ModalConfirm.scss"
import PropTypes from "prop-types"
import OrderPageContext from "../../pages/OrderPage/OrderPageContext"

const ModalConfirm = ({ onConfirmClick }) => {
  const { setIsOrderCompleted, isOrderCompleted } = useContext(OrderPageContext)

  const onCancelClick = () => {
    setIsOrderCompleted(false)
  }
  if (!isOrderCompleted) {
    return null
  }
  return (
    <div className="modal-confirm">
      <div className="modal-confirm__content">
        <h3 className="modal-confirm__heading">Потвердить заказ</h3>
        <div className="modal-confirm__buttons">
          <button
            onClick={onConfirmClick}
            type="button"
            className="modal-confirm__confirm button-default">
            Потвердить
          </button>
          <button
            onClick={onCancelClick}
            type="button"
            className="modal-confirm__cancel button-colorized-red">
            Вернуться
          </button>
        </div>
      </div>
    </div>
  )
}

ModalConfirm.propTypes = {
  onConfirmClick: PropTypes.func
}

export default ModalConfirm
