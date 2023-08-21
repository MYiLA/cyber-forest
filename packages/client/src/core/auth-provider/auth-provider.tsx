import { FC, Fragment, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "@hooks/use-auth";
import { Loader } from "@ui/loader";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const getUserState = (store: RootState) => store.user;
  const { authorized } = useSelector(getUserState);
  const { checkAuth, authChecked } = useAuth();

  useEffect(() => {
    if (!authChecked && !authorized) {
      checkAuth();
    }
  }, [authorized, authChecked, checkAuth]);

  return <>{authChecked ? children : <Loader />}</>;
};
