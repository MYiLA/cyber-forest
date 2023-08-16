import { useForm } from "@hooks/use-form";
import { FormEvent, useState } from "react";
import { Switcher } from "@ui/switcher/switcher";
import { MainInput } from "@ui/main-input/main-input";
import { Checkbox } from "@ui/checkbox/checkbox";
import { MainButton } from "@ui/main-button/main-button";
import { useTheme } from "@hooks/use-theme";
import { Theme } from "@config/constants";
import cn from "classnames";
import { validators } from "@pages/page-lobby/validators";
import { OfflineUsersForm } from "@pages/page-lobby/components/battle-settings/offline-users-form/offline-users-form";
import { useDispatch } from "react-redux";
import { Dispatch } from "@store/store";
import { userLogout } from "@store/reducers/user-reducer";
import styles from "./battle-settings.module.scss";

const initialForm = {
  type: "online",
  players_count: "",
  table_name: "",
  has_table_password: true,
  table_password: "",
};

export const BattleSetting = () => {
  const { form, onChange, validate, onFocus, onBlur } = useForm(
    initialForm,
    validators
  );

  const [online, setOnline] = useState(false);

  const themeName = useTheme();

  const dispatch = useDispatch<Dispatch>();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const getSwitcherValue = (value: string) => {
    form.type = value;

    setOnline(!online);
  };

  return (
    <div className={styles.battle}>
      <form className={styles.form_wrapper}>
        <h3
          className={cn(styles.battle_header, {
            [styles.purpur]: themeName === Theme.Purple,
            [styles.neon]: themeName === Theme.Neon,
          })}
        >
          настройка битвы
        </h3>
        <Switcher
          labels={["онлайн", "оффлайн"]}
          state={!online}
          onClick={getSwitcherValue}
        />
        {online && (
          <>
            <div className={styles.battle_elementwrapper}>
              <MainInput
                name="table_name"
                placeholder="Название стола"
                value={form.table_name as string}
                onChange={onChange}
                className={styles.battle_inputs}
                error={validate.table_name.error}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div className={styles.battle_elementwrapper}>
              <MainInput
                name="players_count"
                placeholder="Количество игроков"
                value={form.players_count as string}
                onChange={onChange}
                className={styles.battle_inputs}
                error={validate.players_count.error}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div className={styles.battle_elementwrapper}>
              <Checkbox
                name="has_table_password"
                label="установить пароль"
                classname={styles.battle_checkbox}
                value={form.has_table_password as boolean}
                onClick={onChange}
              />
            </div>
            <div className={styles.battle_elementwrapper}>
              <MainInput
                autoComplete="off"
                name="table_password"
                placeholder="Пароль"
                value={form.table_password as string}
                onChange={onChange}
                type="password"
                disabled={!form.has_table_password as boolean}
                className={styles.battle_inputs}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div className={styles.battle_buttons}>
              <MainButton
                type="submit"
                disabled={
                  !form.table_name ||
                  !form.players_count ||
                  (form.has_table_password ? !form.table_password : false)
                }
                onClick={onSubmit}
                extraClassName={cn({
                  [styles.button_purpur]: themeName === Theme.Purple,
                  [styles.button_neon]: themeName !== Theme.Purple,
                })}
                className="mr-5"
              >
                создать битву
              </MainButton>
              <MainButton
                type="button"
                onClick={() => {
                  dispatch(userLogout());
                }}
                extraClassName={cn({
                  [styles.button_purpur]: themeName === Theme.Purple,
                  [styles.button_neon]: themeName !== Theme.Purple,
                })}
              >
                выход
              </MainButton>
            </div>
          </>
        )}
        {!online && <OfflineUsersForm />}
      </form>
    </div>
  );
};
