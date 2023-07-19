import { UserRow } from "./user-row";
import styles from "./leaders.module.scss";
import { type UserLeaderDto } from "../types";

type Props = {
  leaders: UserLeaderDto[];
};
export function Leaders(props: Props) {
  const { leaders } = props;
  return (
    <div className={styles.leader_wrapper}>
      {leaders.map((leader) => (
        <UserRow key={leader.id} user={leader} />
      ))}
    </div>
  );
}
