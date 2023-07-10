import axios, { Axios } from 'axios'
import { API_URL, API_USER } from '@config/constants'
import { User, UserPassword } from '@config/user-types'

class UserApi {
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
        return Promise.reject(
          (error.response &&
            error.response.data &&
            error.response.data.reason) ||
            'Something wrong'
        )
      }
    )
  }

  public userChangeData(data: User) {
    return this._axios.put(API_USER.USER_DATA, data)
  }

  public userChangeAvatar(avatar: object) {
    return this._axios.put(API_USER.USER_AVATAR, avatar)
  }

  public userChangePassword(password: UserPassword) {
    return this._axios.put(API_USER.USER_PASSWORD, password)
  }
}

export default new UserApi()
