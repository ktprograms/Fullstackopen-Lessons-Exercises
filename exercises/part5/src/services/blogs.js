import axios from 'axios'
const baseUrl = '/api/blogs'

let authorizationConfig

const setAuthorization = (token) => {
  authorizationConfig = {
    headers: { Authorization: `Bearer ${token}` },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, authorizationConfig)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, authorizationConfig)
  return response.data
}

const remove = async (id) => {
  console.log(authorizationConfig.Authorization)
  await axios.delete(`${baseUrl}/${id}`, authorizationConfig)
}

export default { setAuthorization, getAll, create, update, remove }