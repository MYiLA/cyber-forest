import React, { BaseSyntheticEvent, FC } from "react";
import cn from "classnames";
import commonStyles from "@pages/page-lobby/components/active-forum-topic/active-forum-topic.module.scss";
import { Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import close from "@images/close.svg";
import { useForm } from "@hooks/use-form";
import { MainButton } from "@ui/main-button/main-button";
import { useForum } from "@hooks/use-forum";
import { TopicStructure } from "@config/forum-types";
import { removeFormError, showFormError } from "@utils/show-form-error";
import styles from "./new-topic-form.module.scss";

type NewTopicFormProps = {
  title: string;
  onClose: () => void;
  id?: number;
  body?: string;
};

const validators = {
  title: {
    required: true,
    rule: /^.{1,50}$/,
    message: "заголовок не может быть пустым (длина до 50 символов)",
  },
  body: {
    required: true,
    rule: /^.+$/,
    message: "описание не должно быть пустым",
  },
};

export const NewTopicForm: FC<NewTopicFormProps> = ({
  title,
  onClose,
  id,
  body,
}) => {
  const { themeName } = useTheme();
  const { toAddNewTopic, toChangeTopic } = useForum();

  const initialForm = {
    title,
    description: "",
  };

  const { form, onChange } = useForm(initialForm, validators);

  return (
    <div
      className={cn(commonStyles.layout, {
        [commonStyles.purple]: themeName === Theme.Purple,
        [commonStyles.neon]: themeName !== Theme.Purple,
      })}
    >
      <div
        style={{ width: 1000, height: 600, position: "relative" }}
        className={cn(commonStyles.modal_wrapper, {
          [commonStyles.modal_wrapper_purple]: themeName === Theme.Purple,
          [commonStyles.modal_wrapper_neon]: themeName !== Theme.Purple,
        })}
      >
        <button className={commonStyles.modal_close} onClick={onClose}>
          <img src={close} alt="иконка закрытия" />
        </button>
        <h3 className={commonStyles.modal_header}>{title}</h3>
        <form>
          <label className={styles.text_input_label}>Заголовок</label>
          <input
            name="title"
            type="text"
            placeholder="введите описание темы"
            value={form.title as string}
            onChange={onChange as (e: BaseSyntheticEvent) => void}
            className={styles.text_input}
            onBlur={(event) => {
              removeFormError(event.target);
              if (
                event.target &&
                !validators.title.rule.test(event.target.value)
              ) {
                event.target.classList.add(styles.error);
                showFormError(event.target, validators.title.message);
              } else {
                event.target.classList.remove(styles.error);
              }
            }}
            defaultValue={title ?? ""}
          />
          <label className={styles.text_input_label}>описание темы</label>
          <textarea
            name="body"
            placeholder="введите описание темы"
            rows={15}
            value={form.body as string}
            onChange={onChange as (e: BaseSyntheticEvent) => void}
            className={styles.text_input}
            onBlur={(event) => {
              removeFormError(event.target);

              if (
                event.target &&
                !validators.body.rule.test(event.target.value)
              ) {
                event.target.classList.add(styles.error);

                showFormError(event.target, validators.body.message);
              } else {
                event.target.classList.remove(styles.error);
              }
            }}
            defaultValue={body ?? ""}
          />
          <MainButton
            type="submit"
            onClick={async (event: BaseSyntheticEvent) => {
              event.preventDefault();
              if (!id) {
                await toAddNewTopic(form as TopicStructure);
              } else {
                toChangeTopic({ id, data: { ...(form as TopicStructure) } });
              }

              onClose();
            }}
            extraClassName={cn(styles.button, {
              [styles.button_purple]: themeName === Theme.Purple,
              [styles.button_neon]: themeName !== Theme.Purple,
            })}
            className={styles.button_container}
          >
            {id ? "изменить" : "создать"}
          </MainButton>
        </form>
      </div>
    </div>
  );
};
