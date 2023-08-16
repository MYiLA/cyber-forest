import styles from "@pages/page-settings/page-settings.module.scss";
import { MainInput } from "@ui/main-input/main-input";
import classNames from "classnames";
import { API_RESOURCES, API_URL, Theme } from "@config/constants";
import standardAvatar from "@images/no-avatar.jpg";
import camera from "@images/camera.svg";
import { useTheme } from "@hooks/use-theme";
import { Fields, useForm } from "@hooks/use-form";
import { useUserData } from "@hooks/use-user-data";
import { BaseSyntheticEvent, FC, FormEvent } from "react";
import { User } from "@config/user-types";

const validators = {
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
  display_name: {
    required: true,
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: "3-20 символов без пробелов",
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
  login: {
    required: true,
    rule: /^(?![\d+]+$)[a-zа-я0-9+_-]{3,20}$/gi,
    message: "3-20 символов без пробелов, буквы обязательно",
  },
};

export const PersonalForm: FC<User> = ({
  first_name,
  second_name,
  display_name,
  id,
  avatar,
  phone,
  login,
  email,
}) => {
  const themeName = useTheme();

  const initialForm = {
    first_name: first_name || "",
    second_name: second_name || "",
    email: email || "",
    phone: phone || "",
    display_name: display_name || "",
    login: login || "",
    avatar: avatar || "",
    id,
  };

  const { form, onChange, validate, onFocus, onBlur, validateAllFields } =
    useForm(initialForm as unknown as Fields, validators);

  const { toChangeData, toChangeAvatar } = useUserData();

  const onSubmitPersonal = (e: FormEvent) => {
    e.preventDefault();

    if (validateAllFields()) {
      toChangeData(form as unknown as User);
    }
  };

  const onFileInput = (e: BaseSyntheticEvent) => {
    if (e.target.value) {
      const formData = new FormData();

      formData.append("avatar", e.target.files[0]);

      toChangeAvatar(formData as unknown as { avatar: object });
    }
  };

  return (
    <form className={styles.personal}>
      <h3 className={styles.personal_header}>личные данные</h3>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="first_name"
          placeholder="Имя"
          defaultValue={form.first_name as string}
          onChange={onChange}
          className={styles.personal_input}
          error={validate.first_name.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="second_name"
          placeholder="фамилия"
          defaultValue={form.second_name as string}
          onChange={onChange}
          className={styles.personal_input_reversed}
          error={validate.second_name.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="email"
          placeholder="почта"
          defaultValue={form.email as string}
          onChange={onChange}
          className={styles.personal_input}
          error={validate.email.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="phone"
          placeholder="телефон"
          defaultValue={form.phone as string}
          onChange={onChange}
          className={styles.personal_input_reversed}
          error={validate.phone.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.personal_inputwrapper}>
        <MainInput
          name="login"
          placeholder="логин"
          defaultValue={form.login as string}
          onChange={onChange}
          className={styles.personal_input}
          error={validate.login.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.personal_id}>
        <span>{id}</span>
        <h3
          className={classNames({
            [styles.personal_id_purple]: themeName === Theme.Purple,
            [styles.personal_id_neon]: themeName !== Theme.Purple,
          })}
        >
          Ваш ID
        </h3>
      </div>
      <div className={styles.personal_file}>
        <label className={styles.label}>
          <input type="file" onInput={onFileInput} />
          <figure className={styles.personal_figure}>
            <img
              src={
                avatar ? `${API_URL}/${API_RESOURCES}${avatar}` : standardAvatar
              }
              className={styles.personal_avatar}
              alt="аватар"
            />
            <figcaption className={styles.personal_avatar_figcaption}>
              <img src={camera} alt="camera" />
            </figcaption>
          </figure>
        </label>
      </div>
      <button
        type="submit"
        onClick={(e) => onSubmitPersonal(e)}
        disabled={
          !form.first_name ||
          !form.second_name ||
          !form.login ||
          !form.email ||
          !form.avatar ||
          !form.phone
        }
        className={classNames(styles.personal_submit, {
          [styles.personal_submit_purple]: themeName === Theme.Purple,
          [styles.personal_submit_neon]: themeName === Theme.Neon,
        })}
      >
        сохранить
      </button>
    </form>
  );
};
