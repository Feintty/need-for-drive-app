import mainHeaders from "../ApiHeaders"

const fetchTariffs = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/rate`, {
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

export default fetchTariffs
