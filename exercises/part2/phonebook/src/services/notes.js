import axios from 'axios'
const baseUrl = 'http://192.168.1.103:3000/persons'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data)
}

export default { getAll, create }