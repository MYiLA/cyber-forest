import React from "react";
import avatar from "@images/chat-avatar.png";
import { dateFormatter } from "@utils/date-formatter";
import { API_URL } from "@config/constants";
import { TopicCommentReplies } from "@config/forum-types";
import { useSelector } from "react-redux";
import del from "@images/delete.svg";
import { useForum } from "@hooks/use-forum";
import styles from "./topic-subcomment.module.scss";

interface TopicSubcommentProps extends TopicCommentReplies {
  topicId: number;
}

export const TopicSubcomment: React.FC<TopicSubcommentProps> = ({
  author,
  updatedAt,
  body,
  id,
  topicId,
}) => {
  const { user } = useSelector((store: RootState) => store.user);
  const { toDeleteCommentReply } = useForum();
  const userAvatar = author.avatar
    ? `${API_URL}/resources${author.avatar}`
    : avatar;

  return (
    <div className={styles.subcomment_wrapper}>
      <img
        src={userAvatar}
        className={styles.subcomment_avatar}
        alt="аватар пользователя"
      />
      <div className={styles.subcomment_body}>
        <div className={styles.subcomment_header}>
          <span className={styles.name}>
            {author.display_name ??
              `${author.first_name} ${author.second_name}`}
          </span>
          <span className={styles.time}>{dateFormatter(updatedAt)}</span>
          {user && author.id === user.id && (
            <button
              className={styles.subcomment_header_btn}
              onClick={() => {
                toDeleteCommentReply({ topicId, replyId: id });
              }}
            >
              <img src={del} alt="иконка удаления" />
            </button>
          )}
        </div>
        <span>{body}</span>
      </div>
    </div>
  );
};
