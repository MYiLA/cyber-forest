import { DescriptionCardProps } from "@pages/page-about/type";
import { FC } from "react";
import styles from "./description-card.module.scss";

export const DescriptionCard: FC<DescriptionCardProps> = ({
  img,
  alt,
  text,
}) => (
  <div className={styles.card}>
    <div className={styles.card_img}>
      <img src={img} alt={alt} />
    </div>
    <span className={styles.card_text}>{text}</span>
  </div>
);
