import axios from 'axios'

const apiClient = axios.create({
  baseURL: API_URL
})

export default apiClient
