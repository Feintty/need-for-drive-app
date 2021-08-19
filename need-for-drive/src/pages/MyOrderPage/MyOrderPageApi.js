import mainHeaders from "../../components/ApiHeaders"

const fetchOrder = (id, correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/order/${id}`, {
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

export default fetchOrder
