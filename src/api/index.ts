import axios from 'axios'
const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string
})

request.interceptors.response.use(
  response => {
    return response.data.data
  },
  error => {
    return Promise.reject(error)
  }
)

export const getErrorList = (params: any) => {
  return request.post('/error/list', params)
}

export const getApiDataList = (params: any) => {
  return request.post('/http/list', params)
}
