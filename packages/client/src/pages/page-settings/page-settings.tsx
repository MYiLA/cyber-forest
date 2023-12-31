import { useTheme } from "@hooks/use-theme";
import { PATH, Theme } from "@config/constants";
import { PersonalForm } from "@pages/page-settings/components/personal-form/personal-form";
import { ChangePasswordForm } from "@pages/page-settings/components/change-password-form/change-password-form";
import { Switcher } from "@ui/switcher/switcher";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useUserData } from "@hooks/use-user-data";
import back from "../../assets/images/back.svg";
import winRight from "../../assets/images/win-rb-stroke.svg";
import winLeft from "../../assets/images/win-left-mid.svg";
import styles from "./page-settings.module.scss";

export const PageSettings = () => {
  const themeName = useTheme();
  const user = useSelector((state: RootState) => state.user.user);

  const { toChangeData } = useUserData();

  const changeTheme = () => {
    if (user !== null) {
      toChangeData({
        settings: {
          theme: themeName === Theme.Purple ? Theme.Neon : Theme.Purple,
        },
      });
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.wrapper, {
          [styles.wrapper_purple]: themeName === Theme.Purple,
          [styles.wrapper_neon]: themeName === Theme.Neon,
        })}
      >
        <NavLink to={PATH.LOBBY} className={styles.back}>
          <img src={back} alt="иконка назад" />
        </NavLink>
        <img
          src={winLeft}
          alt="украшение окна"
          className={styles.wrapper_left}
        />
        <img
          src={winRight}
          alt="украшение окна"
          className={styles.wrapper_right}
        />
        <h3 className={styles.header}>Аккаунт</h3>
        <div className={styles.wrapper_formcontainer}>
          <PersonalForm {...user!} />
          <ChangePasswordForm />
        </div>
        <div className={styles.switcher}>
          <Switcher
            labels={["пурпурная тема", "тема неоновая"]}
            state={themeName !== Theme.Purple}
            onClick={changeTheme}
            type="theme-toggle"
          />
        </div>
      </div>
    </div>
  );
};
