import { Link } from "react-router-dom";
import { PATH } from "@config/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getAllLeaders,
  resetError,
  selectLeadersIsLoading,
} from "@store/reducers/leaderboard-reducer";
import { Loader } from "@ui/loader";
import styles from "./leaderboard.module.scss";
import { Leaders } from "./leaders";

export function PageLeaderboard() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectLeadersIsLoading);
  useEffect(() => {
    dispatch(resetError());
    dispatch(getAllLeaders());
  }, []);
  return (
    <section className={styles.leader_board}>
      <Link to={PATH.LOBBY} className={styles.main_link}>
        На главную
      </Link>
      <div className={styles.title_wrapper}>
        <h1 className={styles.title}>Таблица лидеров</h1>
        <h2 className={styles.title}>Топ - 15</h2>
      </div>
      {isLoading ? <Loader /> : <Leaders />}
    </section>
  );
}
