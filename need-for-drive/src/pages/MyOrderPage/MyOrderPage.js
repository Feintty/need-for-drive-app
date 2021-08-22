import React from "react"
import { useParams } from "react-router-dom"

const MyOrderPage = () => {
  const { id } = useParams()
  return <div>Тут будет страничка заказа по номеру {id}</div>
}
export default MyOrderPage
