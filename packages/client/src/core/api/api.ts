import axios, { Axios } from 'axios'
import { API, API_URL } from '../config/constants'
import { TUserLogin, TUserRegister } from '../config/user-types'

class Api {
  private _axios: Axios
  constructor() {
    this._axios = axios.create({
      baseURL: API_URL,
      timeout: 1000,
      withCredentials: true,
    })
    this._axios.interceptors.response.use(
      response => response,
      error => {
        return Promise.reject(error.response.data.reason)
      }
    )
  }

  public userLogin(data: TUserLogin) {
    return this._axios.post(API.USER_LOGIN, data)
  }

  public userLogout() {
    return this._axios.post(API.USER_LOGOUT)
  }

  public userGetInfo() {
    return this._axios.get(API.USER_INFO)
  }

  public userRegister(data: TUserRegister) {
    return this._axios.post(API.USER_REGISTER, data)
  }
}

export default new Api()
