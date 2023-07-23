import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@store/store";
import { useCallback, useEffect } from "react";
import {
  resetError,
  userChangeAvatar,
  userChangeData,
  userChangePassword,
} from "@store/reducers/user-reducer";
import { User, UserPassword } from "@config/user-types";

export const useUserData = () => {
  const dispatch = useDispatch<Dispatch>();

  const getUserState = (store: RootState) => store.user;

  const { loading, error } = useSelector(getUserState);

  useEffect(
    () => () => {
      dispatch(resetError());
    },
    []
  );

  const toChangeData = useCallback(
    (data: User) => {
      dispatch(userChangeData(data));
    },
    [dispatch]
  );

  const toChangeAvatar = useCallback(
    (data: { avatar: object }) => {
      dispatch(userChangeAvatar(data));
    },
    [dispatch]
  );

  const toChangePassword = useCallback(
    (data: UserPassword) => {
      dispatch(userChangePassword(data));
    },
    [dispatch]
  );

  return {
    loading,
    error,
    toChangeData,
    toChangeAvatar,
    toChangePassword,
  };
};
