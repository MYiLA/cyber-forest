import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATH } from "@config/constants";
import {
  userGetInfo,
  userLogin,
  userLogout,
  userRegister,
  resetError,
  userOauthLogin,
} from "@store/reducers/user-reducer";
import { UserLogin, UserRegister } from "@config/user-types";

/** Хук для авторизации/логина/регистрации */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getUserState = (store: RootState) => store.user;
  const { loading, error, authorized, authChecked } = useSelector(getUserState);

  useEffect(
    () => () => {
      dispatch(resetError());
    },
    []
  );

  const needRedirect = useRef(false);

  useEffect(() => {
    if (!loading && needRedirect.current && !error) {
      navigate(authorized ? PATH.LOBBY : PATH.LOGIN);
    }
  }, [authorized, loading]);

  const checkAuth = useCallback(() => {
    dispatch(userGetInfo(null));
  }, []);

  const toLogin = useCallback(
    (data: UserLogin) => {
      needRedirect.current = true;
      dispatch(userLogin(data));
    },
    [needRedirect, dispatch]
  );

  const toLogout = useCallback(() => {
    needRedirect.current = true;
    dispatch(userLogout());
  }, [needRedirect, dispatch]);

  const toRegister = useCallback(
    (data: UserRegister) => {
      needRedirect.current = true;
      dispatch(userRegister(data));
    },
    [needRedirect, dispatch]
  );

  const toOauthLogin = useCallback(
    (code: number) => {
      dispatch(userOauthLogin(code));
    },
    [dispatch]
  );

  return {
    error,
    authorized,
    toLogin,
    toRegister,
    toLogout,
    checkAuth,
    authChecked,
    toOauthLogin,
  };
};
