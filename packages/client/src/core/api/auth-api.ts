import axios, { Axios } from 'axios'
import { API_AUTH, API_URL } from '@config/constants'
import { UserLogin, UserRegister } from '@config/user-types'

class AuthApi {
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

  public userLogin(data: UserLogin) {
    return this._axios.post(API_AUTH.USER_LOGIN, data)
  }

  public userLogout() {
    return this._axios.post(API_AUTH.USER_LOGOUT)
  }

  public userGetInfo() {
    return this._axios.get(API_AUTH.USER_INFO)
  }

  public userRegister(data: UserRegister) {
    return this._axios.post(API_AUTH.USER_REGISTER, data)
  }
}

export default new AuthApi()
