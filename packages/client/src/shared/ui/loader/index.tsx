import { Modal } from "@ui/modal";
import cn from "classnames";
import styles from "./loader.module.scss";

function LoadingText() {
  return (
    <div className={styles.wrapper_loading}>
      <div className={styles.text}>Загрузка</div>
      <div className={styles.inner}>
        <div className={cn(styles.loading, styles.up)} />
        <div className={cn(styles.loading, styles.down)} />
      </div>
    </div>
  );
}

export function Loader() {
  return (
    <Modal open>
      <LoadingText />
    </Modal>
  );
}
