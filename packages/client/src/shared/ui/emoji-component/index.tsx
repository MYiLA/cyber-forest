import { EmojiType } from "@shared/type";
import { Emoji } from "@shared/constants";
import styles from "./emoji-component.module.scss";

export type EmojiComponentProps = {
  data: EmojiType;
  onClick?: (data: EmojiType) => void;
};

export const EmojiComponent = ({ data, onClick }: EmojiComponentProps) => (
  <div className={styles.wrap} onClick={() => onClick && onClick(data)}>
    <img
      className={styles.img}
      src={Emoji[data.emoji] as string}
      alt={data.emoji}
    />
  </div>
);
