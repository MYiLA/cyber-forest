import cn from "classnames";
import { ReactNode } from "react";
import styles from "./descripton-block.module.scss";

type Props = {
  className?: string;
  text: ReactNode;
};

export function DescriptionBlock({ className, text }: Props) {
  const textNode = typeof text === "string" ? <h3>{text}</h3> : text;
  return <div className={cn(styles.description, className)}>{textNode}</div>;
}
