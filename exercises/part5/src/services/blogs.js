import axios from 'axios'
const baseUrl = '/api/blogs'

let authorization

const setAuthorization = (token) => {
  authorization = `Bearer ${token}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: authorization },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setAuthorization }