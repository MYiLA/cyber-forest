import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spin}>
        <div className={styles.inner} />
      </div>
    </div>
  );
}
