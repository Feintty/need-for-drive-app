const mainHeaders = {
  headers: {
    "X-Api-Factory-Application-Id": process.env.REACT_APP_APPLICATION_ID,
    Authorization: process.env.REACT_APP_AUTHORIZATION,
    "Content-Type": "application/json"
  }
}

export default mainHeaders
