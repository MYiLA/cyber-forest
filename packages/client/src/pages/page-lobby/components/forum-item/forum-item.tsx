import React from "react";
import { API_URL, Theme } from "@config/constants";
import emptyChat from "@images/chat-avatar.png";
import { useTheme } from "@hooks/use-theme";
import { dateFormatter } from "@utils/date-formatter";
import { ForumTopic } from "@config/forum-types";
import cn from "classnames";
import { useSelector } from "react-redux";
import edit from "@images/edit.svg";
import del from "@images/delete.svg";
import { useForum } from "@hooks/use-forum";
import styles from "./forum-item.module.scss";

interface ForumItemProps {
  topic: ForumTopic;
  onClick: (data: ForumTopic) => void;
  onEdit: ({
    id,
    title,
    body,
  }: {
    id: number;
    title: string;
    body: string;
  }) => void;
}

export const ForumItem: React.FC<ForumItemProps> = ({
  topic,
  onClick,
  onEdit,
}) => {
  const { id, title, body, updatedAt, commentsQty, author } = topic;
  const { themeName } = useTheme();
  const { toDeleteTopic } = useForum();
  const { user } = useSelector((store: RootState) => store.user);
  const userAvatar = author.avatar
    ? `${API_URL}/resources${author.avatar}`
    : emptyChat;

  const handleBtnClick = () => {
    onClick?.(topic);
  };

  return (
    <div
      className={cn(styles.forum_wrapper, {
        [styles.purpur]: themeName === Theme.Purple,
        [styles.neon]: themeName !== Theme.Purple,
      })}
      onClick={handleBtnClick}
    >
      <div className={styles.forum_header}>
        <h3 className={styles.title}>{title}</h3>
        {updatedAt && (
          <span className={styles.date}>{dateFormatter(updatedAt)}</span>
        )}
      </div>
      {body ? (
        <div className={styles.forum_body}>
          <img
            src={userAvatar}
            alt="аватар пользователя"
            className={styles.image}
          />
          <span className={styles.message}>
            {body.length > 370 ? `${body.substring(0, 370)}...` : body}
          </span>
        </div>
      ) : (
        <div className={styles.forum_body}>
          <span className={styles.message}>
            {" "}
            в этой теме еще нет сообщений{" "}
          </span>
        </div>
      )}
      <div className={styles.forum_footer}>
        <span>количество комментариев: {commentsQty}</span>
        {user?.id === author.id && (
          <button
            className={styles.forum_footer_btn}
            onClick={(event) => {
              event.stopPropagation();
              onEdit({ id, title, body });
            }}
          >
            <img src={edit} alt="иконка изменения" />
          </button>
        )}
        {user?.id === author.id && (
          <button
            className={styles.forum_footer_btn}
            onClick={async (event) => {
              event.stopPropagation();
              await toDeleteTopic(id);
            }}
          >
            <img src={del} alt="иконка удаления" />
          </button>
        )}
      </div>
    </div>
  );
};
