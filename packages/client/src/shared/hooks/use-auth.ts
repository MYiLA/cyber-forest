import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dispatch, RootState } from "@store/store";
import { PATH } from "@config/constants";
import {
  userGetInfo,
  userLogin,
  userLogout,
  userRegister,
  resetError,
} from "@store/reducers/user-reducer";
import { UserLogin, UserRegister } from "@config/user-types";

/** Хук для авторизации/логина/регистрации */
export const useAuth = () => {
  const dispatch = useDispatch<Dispatch>();
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
    dispatch(userGetInfo());
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

  return {
    error,
    authorized,
    toLogin,
    toRegister,
    toLogout,
    checkAuth,
    authChecked,
  };
};
