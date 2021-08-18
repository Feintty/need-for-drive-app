import mainHeaders from "../ApiHeaders"

export const fetchStatus = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/orderStatus`, {
    method: "GET",
    ...mainHeaders
  })
    .then((res) => res.json())
    .then(
      (result) => {
        correct(result.data)
      },
      (error) => {
        err(error.toString())
      }
    )
}

export const postOrder = (order,correct,err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/order`, {
    method: "POST",
    body: JSON.stringify(order),
    ...mainHeaders
  })
    .then((res) => res.json())
    .then(
      (result) => {
        correct(result.data)
      },
      (error) => {
        err(error.toString())
      }
    )
}

