import { useSelector } from "react-redux";
import {
  selectAllLeaders,
  selectLeadersError,
} from "@store/reducers/leaderboard-reducer";
import { UserRow } from "./user-row";
import styles from "./leaders.module.scss";

export function Leaders() {
  const leaders = useSelector(selectAllLeaders);
  const error = useSelector(selectLeadersError);

  if (typeof error === "string") {
    return (
      <div className={styles.error_wrapper}>
        <h3 className={styles.error_title}>
          Информация временно недоступна, попробуйте позже
        </h3>
      </div>
    );
  }

  if (leaders.length === 0) {
    return (
      <div className={styles.no_leaders_wrapper}>
        <h3 className={styles.no_leaders_title}>
          Еще нет лидеров, станьте первым!
        </h3>
      </div>
    );
  }

  return (
    <div className={styles.leader_wrapper}>
      {leaders.map((leader) => (
        <UserRow key={leader.name} user={leader} />
      ))}
    </div>
  );
}
