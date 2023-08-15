import cn from "classnames";
import { Emoji } from "@shared/constants";
import { MainButton } from "@shared/ui/main-button/main-button";
import { EmojiType } from "@shared/type";
import { useState } from "react";
import { EmojiComponent } from "../emoji-component";
import styles from "./emoji-select.module.scss";

export type EmojiSelectProps = {
  onSelect: (emoji: EmojiType) => void;
};

export const EmojiSelect = ({ onSelect }: EmojiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openClass = isOpen ? styles.open : "";

  return (
    <div className={cn(styles.wrap, openClass)}>
      <MainButton
        type="button"
        className={styles.btn}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      />
      <div className={styles.list_wrap}>
        <ul className={styles.list}>
          {Object.values(Emoji).map((emoji) => (
            <li className={styles.emoji} key={emoji}>
              <EmojiComponent
                data={{ emoji }}
                onClick={(ev) => {
                  onSelect(ev);
                  setIsOpen(!isOpen);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
