import cn from "classnames";
import { Theme } from "@config/constants";
import { BaseSyntheticEvent, FC, useState } from "react";
import { useTheme } from "@hooks/use-theme";
import styles from "./topic-input.module.scss";

type TopicInputProps = {
  inputName: string;
  buttonLabel?: string;
  buttonClasses?: string;
  inputClasses?: string;
};

export const TopicInput: FC<TopicInputProps> = ({
  inputName,
  buttonLabel,
  inputClasses,
  buttonClasses,
}) => {
  const { themeName } = useTheme();
  const [comment, setComment] = useState<string | undefined>(undefined);

  const getInputClasses = () => {
    const inputs = document.getElementsByTagName("input");
    let input = null;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name === inputName) {
        input = inputs[i];
        break;
      }
    }

    if (comment) {
      input?.classList.remove(styles.active);
    } else {
      input?.classList.add(styles.active);
    }
  };

  return (
    <div className={styles.comment}>
      <input
        className={cn(styles.comment_response, inputClasses, {
          [styles.comment_response_purple]: themeName === Theme.Purple,
          [styles.comment_response_neon]: themeName !== Theme.Purple,
        })}
        placeholder="введите сообщение"
        name={inputName.toString()}
        onBlur={(event: BaseSyntheticEvent) => {
          setComment(event.target.value);
        }}
      />
      <button
        className={cn(styles.comment_send, buttonClasses, {
          [styles.comment_send_purple]: themeName === Theme.Purple,
          [styles.comment_send_neon]: themeName !== Theme.Purple,
        })}
        onClick={getInputClasses}
      >
        {buttonLabel || "ответить"}
      </button>
    </div>
  );
};
