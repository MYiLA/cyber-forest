import { ITopicComment, ITopicCommentComment } from "@pages/page-lobby/types";
import user_mock from "@images/chat-avatar.png";
import { dateFormatter } from "@utils/date-formatter";
import likeUnactiveNeon from "@images/like-unactive-neon.svg";
import likePurple from "@images/like.svg";
import likeUnactivePurple from "@images/like-unactive-purple.svg";
import likeNeon from "@images/like-neon.svg";
import { Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import { TopicSubcomment } from "@pages/page-lobby/components/active-forum-topic/components/topic-subcomment/topic-subcomment";
import { TopicInput } from "@pages/page-lobby/components/active-forum-topic/components/topic-input/topic-input";
import React from "react";
import styles from "./topic-comment.module.scss";

export const TopicComment: React.FC<ITopicComment> = ({
  comment_id,
  time,
  user_data,
  content,
  likes,
  liked,
  comments,
}) => {
  const { themeName } = useTheme();

  const getIcon = () => {
    if (themeName === Theme.Purple) {
      if (liked) {
        return likePurple;
      }
      return likeUnactivePurple;
    }
    if (liked) {
      return likeNeon;
    }
    return likeUnactiveNeon;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div key={comment_id} className={styles.comment_wrapper}>
        <img
          src={user_data?.avatar || user_mock}
          className={styles.comment_avatar}
          alt="аватар пользователя"
        />
        <div className={styles.comment_body}>
          <div className={styles.comment_header}>
            <h3 className={styles.name}>{user_data?.display_name}</h3>
            <span className={styles.time}>{dateFormatter(time)}</span>
          </div>
          <span>{content}</span>
          <div className={styles.flex_row}>
            <div>
              <button
                type="button"
                onClick={() => {
                  console.log("like added");
                }}
                className={styles.comment_like_btn}
              >
                <img
                  src={getIcon()}
                  alt={'иконка "лайк"'}
                  className={styles.comment_like}
                />
                <span>{likes}</span>
              </button>
            </div>
            <TopicInput inputName={comment_id.toString()} />
          </div>
        </div>
      </div>
      {comments && comments[0] && (
        <div className={styles.comment_comments}>
          {comments.map((comm: ITopicCommentComment, index: number) => (
            <TopicSubcomment key={index} {...comm} />
          ))}
        </div>
      )}
    </div>
  );
};
