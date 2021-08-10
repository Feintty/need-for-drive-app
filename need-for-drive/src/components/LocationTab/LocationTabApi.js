const mainHeaders = {
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
    Authorization: process.env.REACT_APP_AUTHORIZATION
  }
}

export const fetchCities = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/city`, {
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

export const fetchPoints = (correct, err) => {
  fetch(`${process.env.REACT_APP_API_URL}/api/db/point`, {
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

export const fetchCitiesLocation = (correct, err, citiesList) => {
  const cityNames = citiesList.map((el) => `&location=${el.name}`).join("")
  console.log(cityNames)
  fetch(
    `${process.env.REACT_APP_MAPQUEST_BATCH_URL}${process.env.REACT_APP_MAPQUEST_KEY}${cityNames}`,
    {
      method: "GET"
    }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        correct(result.results)
      },
      (error) => {
        err(error.toString())
      }
    )
}

export const fetchPointsLocation = (
  correct,
  err,
  citiesList,
  filterPointsByCityName
) => {
  const pointsAdress = citiesList
    .map((el) => filterPointsByCityName(el.name))
    .filter((el) => el.length !== 0)
    .flat(1)
    .reduce(
      (finalString, el) =>
        `${finalString}&location=${el.cityId.name},${el.address}`,
      ""
    )

    console.log(pointsAdress)
  fetch(
    `${process.env.REACT_APP_MAPQUEST_BATCH_URL}${process.env.REACT_APP_MAPQUEST_KEY}${pointsAdress}`,
    {
      method: "GET"
    }
  )
    .then((res) => res.json())
    .then(
      (result) => {
        correct(result.results)
      },
      (error) => {
        err(error.toString())
      }
    )
}
