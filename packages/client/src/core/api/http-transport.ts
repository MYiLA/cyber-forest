import axios, { Axios } from 'axios'
import { API_URL } from '@config/constants'

export class HttpTransport {
  constructor(
    protected _axios: Axios = axios.create({
      baseURL: API_URL,
      timeout: 3000,
      withCredentials: true,
    })
  ) {
    this._axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(
          (error.response &&
            error.response.data &&
            error.response.data.reason) ||
            'Something wrong'
        )
      }
    )
  }
}
