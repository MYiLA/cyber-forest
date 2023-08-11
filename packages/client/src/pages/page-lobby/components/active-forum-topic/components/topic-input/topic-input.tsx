import cn from "classnames";
import { Theme } from "@config/constants";
import React, { BaseSyntheticEvent, FC, useRef } from "react";
import { useTheme } from "@hooks/use-theme";
import { useForum } from "@hooks/use-forum";
import { ReactionTarget } from "@config/forum-types";
import { useForm } from "@hooks/use-form";
import errorStyles from "@pages/page-lobby/components/new-topic-form/new-topic-form.module.scss";
import { removeFormError, showFormError } from "@utils/show-form-error";
import styles from "./topic-input.module.scss";

type TopicInputProps = {
  inputName: string;
  buttonLabel?: string;
  buttonClasses?: string;
  id: number;
  inputClasses?: string;
  commentId?: number;
  target: ReactionTarget;
};

const validators = {
  body: {
    required: true,
    rule: /^.+$/,
    message: "комментарий не может быть пустым",
  },
};

export const TopicInput: FC<TopicInputProps> = ({
  inputName,
  buttonLabel,
  buttonClasses,
  inputClasses,
  id,
  commentId,
  target,
}) => {
  const { themeName } = useTheme();
  const { toAddTopicComment, toAddCommentReply } = useForum();

  const initialForm = {
    body: "",
  };

  const { form, onChange } = useForm(initialForm, validators);

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className={styles.comment}>
      <form>
        <input
          ref={inputRef}
          id={inputName}
          name="body"
          placeholder="введите сообщение"
          onChange={onChange as (e: BaseSyntheticEvent) => void}
          className={cn(styles.comment_response, inputClasses, {
            [styles.comment_response_purple]: themeName === Theme.Purple,
            [styles.comment_response_neon]: themeName !== Theme.Purple,
          })}
          onBlur={(event) => {
            removeFormError(
              event.target,
              true,
              target === ReactionTarget.reply
            );

            if (!validators.body.rule.test(event.target.value)) {
              event.target.classList.add(errorStyles.error);
              showFormError(
                event.target,
                validators.body.message,
                true,
                target === ReactionTarget.reply
              );
            } else {
              event.target.classList.remove(errorStyles.error);
            }
          }}
        />
        <button
          type="submit"
          onClick={async (event: BaseSyntheticEvent) => {
            event.preventDefault();

            if (form.body) {
              if (target === ReactionTarget.comment) {
                toAddTopicComment({
                  topicId: id,
                  body: form.body as string,
                });
              }
              if (target === ReactionTarget.reply && commentId) {
                toAddCommentReply({
                  data: { body: form.body as string, commentId },
                  topicId: id,
                });

                if (inputRef.current) {
                  inputRef.current.value = "";
                }
              }
            }
          }}
          disabled={!form.body}
          className={cn(styles.comment_send, buttonClasses, {
            [styles.comment_send_purple]: themeName === Theme.Purple,
            [styles.comment_send_neon]: themeName !== Theme.Purple,
          })}
        >
          {buttonLabel ?? "ответить"}
        </button>
      </form>
    </div>
  );
};
