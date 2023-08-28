import styles from "@pages/page-lobby/components/new-topic-form/new-topic-form.module.scss";

export const showFormError = (
  target: HTMLElement,
  mess: string,
  abs?: boolean,
  mini?: boolean
) => {
  // eslint-disable-next-line no-nested-ternary
  const cls = abs
    ? mini
      ? styles.error_mess_abs_mini
      : styles.error_mess_abs
    : styles.error_mess;

  const err = document.createElement("span");
  err.innerHTML = mess;
  err.classList.add(cls);

  target.after(err);
};

export const removeFormError = (
  target: HTMLElement,
  abs?: boolean,
  mini?: boolean
) => {
  // eslint-disable-next-line no-nested-ternary
  const cls = abs
    ? mini
      ? styles.error_mess_abs_mini
      : styles.error_mess_abs
    : styles.error_mess;

  const err = document.querySelector(`.${cls}`);

  if (err) {
    err.remove();
  }
};
