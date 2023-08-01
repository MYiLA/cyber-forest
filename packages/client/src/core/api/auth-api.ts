import { API_AUTH } from "@config/constants";
import { User, UserLogin, UserRegister } from "@config/user-types";
import { HttpTransport } from "@api/http-transport";

class AuthApi extends HttpTransport {
  // eslint-disable-next-line class-methods-use-this
  private _setAuthCookie(cookie: string) {
    document.cookie = `authCookie=${cookie}; Path=/; Expires=${new Date(
      Date.now() + 60 * 24 * 60 * 60 * 1000
    )}`;
  }

  public userLogin(data: UserLogin) {
    return this._axios
      .post(API_AUTH.USER_LOGIN, data)
      .then((res) => this._setAuthCookie(res.data.authCookie));
  }

  public userLogout() {
    return this._axios.post(API_AUTH.USER_LOGOUT).then(() => {
      document.cookie = `authCookie=${null}; max-age=-1`;
    });
  }

  public userGetInfo(
    cookies: Record<string, string> | null = null
  ): Promise<{ data: User }> {
    if (typeof localStorage !== "undefined") {
      const userData = localStorage.getItem("userData");
      if (userData !== null) {
        return new Promise((resolve) => {
          resolve({ data: JSON.parse(userData) });
        });
      }
    }

    let request;
    if (cookies && cookies.authCookie) {
      request = this._axios.get(API_AUTH.USER_INFO, {
        headers: { Cookie: `authCookie=${cookies.authCookie};` },
      });
    } else {
      request = this._axios.get(API_AUTH.USER_INFO);
    }

    return request;
  }

  public userRegister(data: UserRegister) {
    return this._axios.post(API_AUTH.USER_REGISTER, data);
  }

  public userOauthLogin(code: number) {
    return this._axios
      .post(API_AUTH.USER_OAUTH_LOGIN, { code })
      .then((res) => this._setAuthCookie(res.data.authCookie));
  }
}

export default new AuthApi();
