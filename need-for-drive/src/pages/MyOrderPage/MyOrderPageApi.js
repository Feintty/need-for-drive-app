import mainHeaders from "../../components/ApiHeaders"

export const fetchOrder = (id, correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/order/${id}`, {
    method: "GET",
    ...mainHeaders
  })
    .then((res) => res.json())
    .then(
      (result) => {
        console.log(result.data)
        correct(result.data)
      },
      (error) => {
        err(error.toString())
      }
    )
}

export const deleteOrder = (id, newOrder, correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/order/${id}`, {
    method: "PUT",
    ...mainHeaders,
    body: JSON.stringify(newOrder)
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
