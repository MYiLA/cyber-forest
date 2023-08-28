import { FormEvent, Fragment, useEffect } from "react";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import { Fields, Validators, useForm } from "@hooks/use-form";
import { UserLogin } from "@config/user-types";
import { DialogWindow } from "@ui/dialog-window/dialog-window";
import { MainInput } from "@ui/main-input/main-input";
import { MainButton } from "@ui/main-button/main-button";
import { PATH } from "@config/constants";
import { useSelector } from "react-redux";
import { useAuth } from "@hooks/use-auth";
import styles from "./page-login.module.scss";

const validators: Validators = {
  login: {
    required: true,
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: "3-20 символов без пробелов, буквы обязательно",
  },
  password: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: "8-40 символов, обязательны цифры и заглавные буквы",
  },
};

const initialForm: Fields = {
  login: "",
  password: "",
};

function PageLogin() {
  const getUserState = (store: RootState) => store.user;
  const { authorized } = useSelector(getUserState);
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { form, onChange, validate, onFocus, onBlur, validateAllFields } =
    useForm(initialForm, validators);

  const { toLogin, error, toOauthLogin } = useAuth();

  useEffect(() => {
    if (code) {
      toOauthLogin(+code);
    }
  }, [code]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateAllFields()) {
      toLogin(form as UserLogin);
    }
  };

  if (code && !authorized) {
    return null;
  }

  return (
    <>
      {authorized ? (
        <Navigate to={PATH.LOBBY} replace />
      ) : (
        <div className={styles.container}>
          <DialogWindow>
            <div className={styles.inside}>
              <h2>Вход в аккаунт</h2>
              <form onSubmit={onSubmit} className="mt-5 w-100" noValidate>
                <MainInput
                  autoFocus
                  name="login"
                  placeholder="Логин"
                  value={form.login as string}
                  onChange={onChange}
                  className={styles.inputs}
                  error={validate.login.error}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <MainInput
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={form.password as string}
                  onChange={onChange}
                  className={styles.inputs}
                  error={validate.password.error}
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <div className={styles.form_buttons}>
                  <MainButton
                    type="submit"
                    extraClassName="ml-10 mr-10"
                    className="mr-5"
                  >
                    Войти
                  </MainButton>
                  <NavLink to={PATH.REGISTER}>Зарегистрироваться</NavLink>
                </div>
              </form>
              {error && <div className={styles.error}>{error}</div>}
            </div>
          </DialogWindow>
        </div>
      )}
    </>
  );
}

export default PageLogin;
