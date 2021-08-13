const mainHeaders = {
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
    Authorization: process.env.REACT_APP_AUTHORIZATION
  }
}

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
