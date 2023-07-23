import React from "react";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import { TopicComment } from "@pages/page-lobby/components/active-forum-topic/components/topic-comment/topic-comment";
import { IActiveForumTopicProps, ITopicComment } from "@pages/page-lobby/types";
import close from "@images/close.svg";
import { topicData } from "@pages/page-lobby/mocks";
import cn from "classnames";
import { TopicInput } from "@pages/page-lobby/components/active-forum-topic/components/topic-input/topic-input";
import styles from "./active-forum-topic.module.scss";

export const ActiveTopicModal: React.FC<IActiveForumTopicProps> = ({
  id,
  onClose,
}) => {
  const { themeName } = useTheme();

  return (
    <div
      className={cn(styles.layout, {
        [styles.purple]: themeName === Theme.Purple,
        [styles.neon]: themeName !== Theme.Purple,
      })}
    >
      <div
        className={cn(styles.modal_wrapper, {
          [styles.modal_wrapper_purple]: themeName === Theme.Purple,
          [styles.modal_wrapper_neon]: themeName !== Theme.Purple,
        })}
      >
        <button className={styles.modal_close} onClick={onClose}>
          <img src={close} alt="иконка закрытия" />
        </button>
        <h3 className={styles.modal_header}>{topicData.title}</h3>
        <div
          className={`${styles.topic} ${
            themeName === Theme.Purple ? styles.topic_purple : styles.topic_neon
          }`}
        >
          <span className={styles.topic_descr}>{topicData.description}</span>
          {topicData.commentaries && topicData.commentaries.length > 0 ? (
            topicData.commentaries.map(
              (comment: ITopicComment, index: number) => (
                <TopicComment {...comment} comment_id={index} />
              )
            )
          ) : (
            <span className={styles.topic_empty}>
              в этой теме еще нет комментариев.
            </span>
          )}
          <TopicInput
            inputName={id.toString()}
            buttonLabel="Добавить комментарий"
            inputClasses={styles.topic_input}
            buttonClasses={styles.topic_comment}
          />
        </div>
      </div>
    </div>
  );
};
