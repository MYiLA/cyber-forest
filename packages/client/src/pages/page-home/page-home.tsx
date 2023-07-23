import { NavLink } from "react-router-dom";
import { PATH, Theme } from "@config/constants";
import cn from "classnames";
import { useTheme } from "@hooks/use-theme";
import styles from "./page-home.module.scss";

function PageHome() {
  const { themeName } = useTheme();

  return (
    <div className={styles.container}>
      <h3
        className={cn(styles.header, {
          [styles.purple]: themeName === Theme.Purple,
          [styles.neon]: themeName === Theme.Neon,
        })}
      >
        киберлес
      </h3>
      <div className={styles.buttons_wrapper}>
        <NavLink
          to={PATH.LOGIN}
          className={cn(styles.nav_link, {
            [styles.purple]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}
        >
          Вход
        </NavLink>
        <NavLink
          to={PATH.REGISTER}
          className={cn(styles.nav_link, {
            [styles.purple]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}
        >
          {" "}
          Регистрация{" "}
        </NavLink>
      </div>
      <NavLink to={PATH.ABOUT} className={styles.sub_nav_link}>
        {" "}
        Подробнее об игре{" "}
      </NavLink>
    </div>
  );
}

export default PageHome;
