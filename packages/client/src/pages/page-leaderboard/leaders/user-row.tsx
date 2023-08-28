import { Leader } from "@store/reducers/leaderboard-reducer";
import styles from "./leaders.module.scss";

type Props = {
  user: Leader;
};

export function UserRow(props: Props) {
  const {
    user: { name, score, avatar },
  } = props;
  return (
    <div className={styles.user_row}>
      <img src={avatar} className={styles.avatar} alt={`${name} avatar`} />
      <div className={styles.name_wrapper}>
        <h4>{name}</h4>
      </div>
      <div className={styles.points_wrapper}>
        <h4>{score}</h4>
      </div>
    </div>
  );
}
