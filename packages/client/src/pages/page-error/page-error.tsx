import { NavLink } from "react-router-dom";
import { PATH } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import styles from "./page-error.module.scss";

const errorMessages: Record<string, string> = {
  404: "Страница не найдена",
  500: "Что-то пошло не так...",
};

const PageError = ({ error = "404" }) => {
  const themeName = useTheme();

  return (
    <div className={styles.container}>
      <div className={styles[`images_${themeName}_${error}`]}>
        <div className={styles.message}>
          <h2>{error}</h2>
          <h3>{errorMessages[error]}</h3>
          {error === "404" && (
            <div className={styles.link}>
              <NavLink to={PATH.HOME}>В лобби</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageError;
