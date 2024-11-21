import axios from 'axios'
import { config } from '../constant/config'

axios.defaults.baseURL = config.apiURL
const handleError = (error) => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data)
    console.log(error.response.status)
    console.log(error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message)
  }

  throw error
}

export default function apiCaller(path, data = {}, method = 'POST') {
  const methods = {
    DELETE: 'delete',
    GET: 'get',
    HEAD: 'head',
    OPTIONS: 'options',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put'
  }

  axios.defaults.headers.AuthorizationPath = "/public"
  axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
  // axios.defaults.headers.Language = `${localStorage.getItem('Language')}`

  /** @type {(url: string, data?: any, config?: AxiosRequestConfig) => AxiosResponse}  */
  const func = axios[methods[method] || 'post']

  return func(path, data)
    .then((response) => response.data)
    .catch(handleError)
}
