import React from "react";
import avatar from "@images/chat-avatar.png";
import { dateFormatter } from "@utils/date-formatter";
import likeUnactiveNeon from "@images/like-unactive-neon.svg";
import likePurple from "@images/like.svg";
import likeUnactivePurple from "@images/like-unactive-purple.svg";
import likeNeon from "@images/like-neon.svg";
import { API_URL, Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import { TopicSubcomment } from "@pages/page-lobby/components/active-forum-topic/components/topic-subcomment/topic-subcomment";
import { TopicInput } from "@pages/page-lobby/components/active-forum-topic/components/topic-input/topic-input";
import { ReactionTarget, TopicComments } from "@config/forum-types";
import { useForum } from "@hooks/use-forum";
import del from "@images/delete.svg";
import { useSelector } from "react-redux";
import styles from "./topic-comment.module.scss";

interface TopicCommentProps extends TopicComments {
  topicId: number;
}

export const TopicComment: React.FC<TopicCommentProps> = ({
  id,
  body,
  updatedAt,
  reactions,
  reacted,
  author,
  replies,
  topicId,
}) => {
  const { themeName } = useTheme();
  const { toAddReaction, toDeleteComment } = useForum();
  const { user } = useSelector((store: RootState) => store.user);

  const getIcon = () => {
    if (themeName === Theme.Purple) {
      if (reacted) {
        return likePurple;
      }
      return likeUnactivePurple;
    }
    if (reacted) {
      return likeNeon;
    }
    return likeUnactiveNeon;
  };

  const userAvatar = author.avatar
    ? `${API_URL}/resources${author.avatar}`
    : avatar;

  const repliesCheck = replies && replies[0];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div key={id} className={styles.comment_wrapper}>
        <img
          src={userAvatar}
          className={styles.comment_avatar}
          alt="аватар пользователя"
        />
        <div className={styles.comment_body}>
          <div className={styles.comment_header}>
            <h3 className={styles.name}>
              {author?.display_name ??
                `${author?.first_name} ${author?.second_name}`}
            </h3>
            <span className={styles.time}>{dateFormatter(updatedAt)}</span>
            {user && author.id === user.id && (
              <button
                className={styles.comment_header_btn}
                onClick={() => {
                  toDeleteComment({ topicId, commentId: id });
                }}
              >
                <img src={del} alt="иконка удаления" />
              </button>
            )}
          </div>
          <span>{body}</span>
          <div className={styles.flex_row}>
            <div>
              <button
                type="button"
                onClick={() => {
                  toAddReaction({
                    data: { targetId: id, target: ReactionTarget.comment },
                    topicId,
                  });
                }}
                className={styles.comment_like_btn}
              >
                <img
                  src={getIcon()}
                  alt={'иконка "лайк"'}
                  className={styles.comment_like}
                />
                <span>{reactions}</span>
              </button>
            </div>
            <div className={styles.comment_comments_wrapper}>
              {repliesCheck && (
                <div className={styles.comment_comments}>
                  {replies.map((comm) => (
                    <TopicSubcomment
                      key={comm.id}
                      {...comm}
                      topicId={topicId}
                    />
                  ))}
                </div>
              )}
              {!repliesCheck && (
                <TopicInput
                  inputName={`comment-${id.toString()}`}
                  id={topicId}
                  target={ReactionTarget.reply}
                  commentId={id}
                />
              )}
            </div>
          </div>
          {repliesCheck && (
            <TopicInput
              inputName={`comment-${id.toString()}`}
              id={topicId}
              target={ReactionTarget.reply}
              commentId={id}
            />
          )}
        </div>
      </div>
    </div>
  );
};
