import React, { useEffect, useState } from "react";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import { TopicComment } from "@pages/page-lobby/components/active-forum-topic/components/topic-comment/topic-comment";
import { ActiveForumTopicProps } from "@pages/page-lobby/types";
import close from "@images/close.svg";
import cn from "classnames";
import { TopicInput } from "@pages/page-lobby/components/active-forum-topic/components/topic-input/topic-input";
import { useForum } from "@hooks/use-forum";
import { useSelector } from "react-redux";
import { Loading } from "@ui/loading/loading";
import { ForumTopic, ReactionTarget, TopicComments } from "@config/forum-types";
import edit from "@images/edit.svg";
import { EmojiType } from "@shared/type";
import { EmojiSelect } from "@shared/ui/emoji-select";
import { EmojiComponent } from "@shared/ui/emoji-component";
import { getEmoji } from "@shared/utils/get-emoji";
import styles from "./active-forum-topic.module.scss";

export const ActiveTopicModal: React.FC<ActiveForumTopicProps> = ({
  data,
  onClose,
}) => {
  const [changing, setChanging] = useState(false);

  const { themeName } = useTheme();
  const { toGetTopicsComments, toChangeTopic, toToggleTopicEmoji } = useForum();
  const { activeTopicComments, activeTopic } = useSelector(
    (store: RootState) => store.forum
  );
  const { user } = useSelector((store: RootState) => store.user);
  const [topicData, setTopicData] = useState<ForumTopic>(activeTopic ?? data);

  const onEmojiToggle = (ev: EmojiType) => {
    toToggleTopicEmoji({ emoji: ev.emoji, topicId: data.id });
  };

  useEffect(() => {
    toGetTopicsComments({ id: data.id, cursor: 0 });
  }, []);

  useEffect(() => {
    if (activeTopic) {
      setTopicData(activeTopic);
    }
  }, [activeTopic]);

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
        <button
          className={styles.modal_close}
          onClick={() => {
            onClose();
          }}
        >
          <img src={close} alt="иконка закрытия" />
        </button>
        <h3 className={styles.modal_header}>{topicData.title}</h3>
        <div
          className={`${styles.topic} ${
            themeName === Theme.Purple ? styles.topic_purple : styles.topic_neon
          }`}
        >
          {!changing && (
            <span className={styles.topic_descr}>{topicData.body}</span>
          )}
          {changing && (
            <textarea
              id="topic-change"
              name="description"
              rows={10}
              defaultValue={topicData.body}
              className={styles.topic_descr_input}
              onKeyUp={(event) => {
                if (event.key === "Enter" && !event.shiftKey && event.target) {
                  const inputValue = (event.target as HTMLInputElement).value;

                  if (inputValue.length > 1) {
                    toChangeTopic({
                      id: data.id,
                      data: { title: data.title, body: inputValue },
                      active: true,
                    });
                  }

                  setChanging(!changing);
                }
              }}
            />
          )}
          {data.author && user?.id === data.author.id && (
            <div className={styles.topic_descr_footer}>
              <button onClick={() => setChanging(!changing)}>
                <img src={edit} alt="иконка изменения топика" />
              </button>
            </div>
          )}
          <div className={styles.emoji_wrap}>
            <EmojiSelect onSelect={onEmojiToggle} />
            <ul className={styles.emoji_list}>
              {data.emojis.map(({ emoji: emojiItem, reacted, qty }) => {
                const activeClass = reacted ? styles.active : "";
                const emoji = getEmoji(emojiItem);
                return (
                  <li
                    key={emoji}
                    className={cn(styles.emoji_item, activeClass)}
                  >
                    <EmojiComponent data={{ emoji }} onClick={onEmojiToggle} />
                    <span className={styles.emoji_counter}>{qty}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.topic_comments}>
            {activeTopicComments &&
              activeTopicComments.length > 0 &&
              activeTopicComments.map((comment: TopicComments) => (
                <TopicComment
                  key={comment.id}
                  {...comment}
                  topicId={comment.topicId}
                />
              ))}
            {activeTopicComments && activeTopicComments.length === 0 && (
              <span className={styles.topic_empty}>
                в этой теме еще нет комментариев.
              </span>
            )}
            {!activeTopicComments && <Loading />}
            <TopicInput
              key={data.id}
              inputName={`topic-${data.id.toString()}`}
              buttonLabel="Добавить комментарий"
              inputClasses={styles.topic_input}
              buttonClasses={styles.topic_comment}
              id={data.id}
              target={ReactionTarget.comment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
