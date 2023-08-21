import { DescriptionDevsCardProps } from "@pages/page-about/type";
import { FC } from "react";
import cn from "classnames";
import styles from "./devs-card.module.scss";

export const DescriptionDevsCard: FC<DescriptionDevsCardProps> = ({
  img,
  name,
  description,
  extraClass,
  subtitle,
}) => (
  <div className={cn(styles.personal, extraClass)}>
    <img
      src={img}
      alt="фотография разработчика"
      className={styles.personal_info_img}
    />
    <div className={styles.personal_info}>
      <h4 className={styles.personal_info_name}>{name}</h4>
      <span className={styles.personal_info_sub}>{subtitle}</span>
      <div className={styles.personal_info_text}>{description}</div>
    </div>
  </div>
);
