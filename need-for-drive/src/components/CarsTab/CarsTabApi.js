const mainHeaders = {
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
    Authorization: process.env.REACT_APP_AUTHORIZATION
  }
}

export const fetchCars = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/car`, {
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
export const fetchCategories = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/category`, {
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
