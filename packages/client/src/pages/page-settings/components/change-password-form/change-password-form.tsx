import { useTheme } from "@hooks/use-theme";
import { Fields, useForm } from "@hooks/use-form";
import { useUserData } from "@hooks/use-user-data";
import styles from "@pages/page-settings/page-settings.module.scss";
import { MainInput } from "@ui/main-input/main-input";
import { BaseSyntheticEvent, FormEvent } from "react";
import classNames from "classnames";
import { Theme } from "@config/constants";

const validators = {
  oldPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: "8-40 символов, обязательны цифры и заглавные буквы",
  },
  newPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: "8-40 символов, обязательны цифры и заглавные буквы",
  },
  repeatPassword: {
    required: true,
    rule: /^(?=.*\d)(?=.*[A-Z])\S{8,40}$/g,
    message: "8-40 символов, обязательны цифры и заглавные буквы",
  },
};

const initialForm = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
};

export function ChangePasswordForm() {
  const themeName = useTheme();

  const { error } = useUserData();

  const { form, onChange, validate, onFocus, onBlur } = useForm(
    initialForm as unknown as Fields,
    validators
  );

  const { toChangePassword } = useUserData();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.newPassword === form.repeatPassword) {
      toChangePassword({
        oldPassword: form.oldPassword as string,
        newPassword: form.newPassword as string,
      });
    }
  };

  const onErroredRepeat = (e: BaseSyntheticEvent) => {
    if (e.target.value !== form.newPassword) {
      if (!document.querySelector(`.${styles.password_error}`)) {
        const errorEl = document.createElement("div");
        errorEl.innerText = "пароли не совпадают";
        errorEl.classList.add(styles.password_error);
        e.target.after(errorEl);
      }
    } else {
      const secondError = document.querySelector(`.${styles.password_error}`);

      if (secondError) {
        secondError.remove();
      }
    }
  };

  return (
    <form className={styles.password}>
      <h3 className={styles.personal_header}> Смена пароля </h3>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="oldPassword"
          placeholder="старый пароль"
          defaultValue={form.oldPassword as string}
          onChange={onChange}
          // className={styles.personal_input}
          error={validate.oldPassword.error}
          onFocus={onFocus}
          onBlur={onBlur}
          type="password"
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="newPassword"
          placeholder="новый пароль"
          defaultValue={form.newPassword as string}
          onChange={onChange}
          error={validate.newPassword.error}
          onFocus={onFocus}
          onBlur={onBlur}
          type="password"
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="repeatPassword"
          placeholder="повторите пароль"
          defaultValue={form.repeatPassword as string}
          onChange={onChange}
          error={validate.repeatPassword.error}
          onFocus={onFocus}
          onBlur={onErroredRepeat}
          type="password"
        />
      </div>
      <button
        type="submit"
        onClick={onSubmit}
        disabled={
          !form.oldPassword || !form.newPassword || !form.repeatPassword
        }
        className={classNames(styles.personal_submit, styles.password_submit, {
          [styles.personal_submit_purple]: themeName === Theme.Purple,
          [styles.personal_submit_neon]: themeName === Theme.Neon,
        })}
      >
        сбросить пароль
      </button>
      {error && <span> {error} </span>}
    </form>
  );
}
