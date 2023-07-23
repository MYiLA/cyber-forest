import { FormEvent, Fragment } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { Validators, useForm } from "@hooks/use-form";
import { UserRegister } from "@config/user-types";
import { DialogWindow } from "@ui/dialog-window/dialog-window";
import { MainInput } from "@ui/main-input/main-input";
import { MainButton } from "@ui/main-button/main-button";
import { PATH } from "@config/constants";
import { useAuth } from "@hooks/use-auth";

import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import styles from "./page-register.module.scss";

const validators: Validators = {
  first_name: {
    required: true,
    rule: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/,
    message: "Только буквы или -, первая заглавная",
  },
  second_name: {
    required: true,
    rule: /^[A-ZА-Я][a-zA-Zа-яА-Я-]+$/,
    message: "Только буквы или -, первая заглавная",
  },
  login: {
    required: true,
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: "3-20 символов без пробелов, буквы обязательно",
  },
  email: {
    required: true,
    rule: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: "Email в формате ivan@mail.ru",
  },
  phone: {
    required: true,
    rule: /^(?:\+|\d)[0-9]{10,15}$/,
    message: "10-15 цифр, можно в начале +",
  },
  password: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: "8-40 символов, обязательны цифры и заглавные буквы",
  },
  password_confirm: {
    required: true,
    rule: "confirm:password",
    message: "пароли не совпадают",
  },
  agreement: {
    required: true,
    rule: true,
    message: "Нужно обязательно принять условия",
  },
};

const initialForm = {
  first_name: "",
  second_name: "",
  login: "",
  email: "",
  password: "",
  password_confirm: "",
  phone: "",
  agreement: false,
};

function PageRegister() {
  const getUserState = (store: RootState) => store.user;
  const { authorized } = useSelector(getUserState);

  const { form, onChange, validate, onFocus, onBlur, validateAllFields } =
    useForm(initialForm, validators);

  const { toRegister, error } = useAuth();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateAllFields()) {
      toRegister(form as UserRegister);
    }
  };

  return (
    <>
      {authorized ? (
        <Navigate to={PATH.LOBBY} replace />
      ) : (
        <div className={styles.container}>
          <DialogWindow>
            <div className={styles.inside}>
              <h2>Регистрация</h2>
              <form onSubmit={onSubmit} className="mt-5" noValidate>
                <div className={styles.inputs_list}>
                  <MainInput
                    autoFocus
                    name="first_name"
                    placeholder="Имя"
                    value={form.first_name as string}
                    onChange={onChange}
                    className={styles.inputs}
                    error={validate.first_name.error}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <MainInput
                    name="second_name"
                    placeholder="Фамилия"
                    value={form.second_name as string}
                    onChange={onChange}
                    className={styles.inputs}
                    align="right"
                    error={validate.second_name.error}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <MainInput
                    name="phone"
                    placeholder="Телефон"
                    value={form.phone as string}
                    onChange={onChange}
                    className={styles.inputs}
                    error={validate.phone.error}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <MainInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email as string}
                    onChange={onChange}
                    className={styles.inputs}
                    align="right"
                    error={validate.email.error}
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
                  <MainInput
                    name="password_confirm"
                    type="password"
                    placeholder="Повторите пароль"
                    value={form.password_confirm as string}
                    onChange={onChange}
                    className={styles.inputs}
                    align="right"
                    error={validate.password_confirm.error}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                  <MainInput
                    name="login"
                    placeholder="Логин"
                    value={form.login as string}
                    onChange={onChange}
                    className={styles.inputs}
                    error={validate.login.error}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>
                <div className={styles.agreement}>
                  <MainInput
                    type="checkbox"
                    name="agreement"
                    checked={form.agreement as boolean}
                    onChange={onChange}
                  />
                  <span>
                    Я ознакомлен и согласен с условиями пользовательского
                    соглашения.
                  </span>
                </div>
                {validate.agreement.error && (
                  <div className={styles.agreement_error}>
                    {validate.agreement.error}
                  </div>
                )}
                <div>
                  <MainButton
                    type="submit"
                    extraClassName="ml-10 mr-10"
                    className="mt-10 mb-1 mr-5"
                  >
                    Регистрация
                  </MainButton>
                  <NavLink to={PATH.LOGIN}>Зарегистрированы?</NavLink>
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

export default PageRegister;
