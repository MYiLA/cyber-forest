import { useForm } from "@hooks/use-form";
import { useTheme } from "@hooks/use-theme";
import styles from "@pages/page-lobby/components/battle-settings/battle-settings.module.scss";
import { MainInput } from "@ui/main-input/main-input";
import cn from "classnames";
import { PATH, Theme } from "@config/constants";
import { MainButton } from "@ui/main-button/main-button";
import { useGameStart } from "@hooks/use-game-start";
import { FormEvent } from "react";
import { userLogout } from "@store/reducers/user-reducer";
import { useDispatch } from "react-redux";
import { Tooltip } from "@ui/tooltip/tooltip";

const initialForm: {
  user1: string;
  user2: string;
  user3: string;
  user4: string;
  max_glory: string;
} = {
  user1: "Вася",
  user2: "Катя",
  user3: "Петя",
  user4: "Даша",
  max_glory: "10",
};
const validators = {
  user1: {
    required: true,
    rule: /^[a-zA-Zа-яА-Я0-9]{1,10}$/,
    message: "1-20 символов, буквы и цифры",
  },
  user2: {
    required: true,
    rule: /^[a-zA-Zа-яА-Я0-9]{1,10}$/,
    message: "1-20 символов, буквы и цифры",
  },
  user3: {
    required: false,
    rule: /^[a-zA-Zа-яА-Я0-9]{1,10}$/,
    message: "1-20 символов, буквы и цифры",
  },
  user4: {
    required: false,
    rule: /^[a-zA-Zа-яА-Я0-9]{1,10}$/,
    message: "1-20 символов, буквы и цифры",
  },
  max_glory: {
    required: true,
    rule: /^[0-9]{1,2}$/,
    message: "число славы от 1 до 99",
  },
};

export const OfflineUsersForm = () => {
  const { form, onChange, validate, onFocus, onBlur, validateAllFields } =
    useForm(initialForm, validators);

  const themeName = useTheme();

  const dispatch = useDispatch<AppDispatch>();

  const {
    toStartGame,
    toSetGameMaxGlory,
    toGamePathNavigate,
    toGetPlayersData,
  } = useGameStart();

  const onClick = (event: FormEvent) => {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    const players = Object.values(form)
      .map((player) => (player && !Number(player) ? player : null))
      .filter((player) => player);

    toStartGame();
    toGetPlayersData({
      playersCount: players.length,
      users: players as string[],
    });

    toSetGameMaxGlory(Number(form.max_glory));

    toGamePathNavigate(PATH.GAME);
  };

  return (
    <div className={styles.wrapper}>
      <MainInput
        name="user1"
        placeholder="игрок 1"
        value={form.user1 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user1.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user2"
        placeholder="игрок 2"
        value={form.user2 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user2.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user3"
        placeholder="игрок 3"
        value={form.user3 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user3.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <MainInput
        name="user4"
        placeholder="игрок 4"
        value={form.user4 as string}
        onChange={onChange}
        className={styles.battle_inputs}
        error={validate.user4.error}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Tooltip
        direction="top"
        text="Цель игры - заработать славу. Игра заканчивается, если у одного из игроков наберется нужное количество славы."
      >
        <MainInput
          name="max_glory"
          maxLength={2}
          placeholder="число славы (макс.)"
          value={form.max_glory as string}
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
            onChange(e);
          }}
          className={styles.battle_inputs}
          error={validate.max_glory.error}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Tooltip>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <MainButton
          type="submit"
          disabled={!form.user1 || !form.user2}
          onClick={onClick}
          extraClassName={cn({
            [styles.button_purpur]: themeName === Theme.Purple,
            [styles.button_neon]: themeName !== Theme.Purple,
          })}
          style={{ display: "block", margin: "0 auto" }}
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
    </div>
  );
};
