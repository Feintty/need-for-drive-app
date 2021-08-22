import React from "react"
import "./ModalConfirm.scss"
import PropTypes from "prop-types"

const ModalConfirm = ({ onConfirmClick, isOpened, setIsOpened, isCancel }) => {
  const onCancelClick = () => {
    setIsOpened(false)
  }
  if (!isOpened) {
    return null
  }
  return (
    <div className="modal-confirm">
      <div className="modal-confirm__content">
        <h3 className="modal-confirm__heading">
          {isCancel ? "Отменить заказ" : "Потвердить заказ"}
        </h3>
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
  onConfirmClick: PropTypes.func,
  isOpened: PropTypes.bool,
  setIsOpened: PropTypes.func,
  isCancel: PropTypes.bool
}

export default ModalConfirm
