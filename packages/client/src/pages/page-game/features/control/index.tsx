import { MainButton } from "@shared/ui/main-button/main-button";
import { Guide } from "@pages/page-game/guide";
import { useState } from "react";
import { LooseScreen } from "@pages/page-game/screen";
import { useNavigate } from "react-router-dom";
import { PATH, Theme } from "@config/constants";
import { useTheme } from "@hooks/use-theme";
import styles from "./control.module.scss";

// TODO: Точно такая же переменная в модалке, по хорошему надо вынести в одну
const ANIMATION_DURATION_MS = 193;

// TODO: Код читаемый, но можно лучше) Сделать LooseScreen по аналогии с Guide

type OpenButtonProps = {
  onClick: () => void;
};
const OpenGuideButton = ({ onClick }: OpenButtonProps) => (
  <MainButton type="button" onClick={onClick} className={styles.guide_btn}>
    Справка
  </MainButton>
);

type ControlProps = {
  onDone?: () => void;
};

export const Control = ({ onDone }: ControlProps) => {
  const [isLooseOpen, setIsLooseOpen] = useState(false);
  const navigate = useNavigate();
  const onDoneHandler = () => {
    if (!onDone) return;
    onDone();
  };

  const themeName = useTheme();

  const handleLoose = () => {
    setIsLooseOpen(true);
  };
  const handleCloseLooseScreen = (isConfirm: boolean) => {
    setIsLooseOpen(false);
    if (isConfirm) {
      // Чтоб успело вначале закрыться, а потом отработать логика
      setTimeout(() => navigate(PATH.LOBBY), ANIMATION_DURATION_MS);
    }
  };

  return (
    <div className={styles.control}>
      <MainButton
        data-testid="ready"
        type="button"
        className={`${styles.btn} ${
          themeName === Theme.Purple ? styles.purple : styles.neon
        }`}
        onClick={onDoneHandler}
      >
        Готово
      </MainButton>
      <MainButton
        data-testid="loose"
        type="button"
        className={`${styles.btn} ${
          themeName === Theme.Purple ? styles.purple : styles.neon
        }`}
        onClick={handleLoose}
      >
        Сдаться
      </MainButton>
      <Guide OpenComponent={OpenGuideButton} />
      <LooseScreen onClose={handleCloseLooseScreen} isOpen={isLooseOpen} />
    </div>
  );
};
