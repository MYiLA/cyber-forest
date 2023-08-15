import { EmojiType } from "@shared/type";
import { EmojiPack } from "@shared/constants";
import styles from "./emoji-component.module.scss";

export type EmojiComponentProps = {
  data: EmojiType,
  onClick?: (data: EmojiType) => void,
}

export const EmojiComponent = ({data, onClick}: EmojiComponentProps) => {
  const onClickHandler = () => {
    if (!onClick) return;
    onClick(data);
  }
  return (
    <div className={styles.wrap} onClick={onClickHandler}>
      <img className={styles.img} src={`src/assets/images/emoji-packs/${data.pack ?? EmojiPack.Dice}/${data.emoji}.svg`} alt={data.emoji} />
    </div>
  )};
