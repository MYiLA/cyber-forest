import { API_USER } from "@config/constants";
import { User, UserPassword } from "@config/user-types";
import { HttpTransport } from "@api/http-transport";

class UserApi extends HttpTransport {
  public userChangeData(data: Partial<User>) {
    return this._axios.put(API_USER.USER_DATA, data);
  }

  public userChangeAvatar(avatar: object) {
    return this._axios.put(API_USER.USER_AVATAR, avatar);
  }

  public userChangePassword(password: UserPassword) {
    return this._axios.put(API_USER.USER_PASSWORD, password);
  }
}

export default new UserApi();
