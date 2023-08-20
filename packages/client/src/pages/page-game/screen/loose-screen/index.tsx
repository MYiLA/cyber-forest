import { Modal } from "@ui/modal";
import { useState } from "react";
import { MainButton } from "@shared/ui/main-button/main-button";
import styles from "./loose-screen.module.scss";
import cyberCat from "./images/cyber-cat.png";
import cyberFox from "./images/cyber-fox.png";
import { ScreenBlock } from "../screen-block";
import { BackToLobbyButton } from "../back-to-lobby-button";

type Props = {
  onClose?: (isConfirm: boolean) => void;
  isOpen?: boolean;
};

export const LooseScreen = (props: Props) => {
  const { onClose, isOpen = false } = props;
  const [isConfirm, setIsConfirm] = useState(false);
  const handleClose = () => {
    if (onClose) {
      onClose(isConfirm);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ScreenBlock className={styles.loose_screen}>
        {isConfirm ? (
          <>
            <div className={styles.regret_wrapper}>
              <h3 className={styles.regret_top}>О нет...</h3>
              <h3 className={styles.regret_bottom}>Вы проиграли</h3>
            </div>
            <p className={styles.motivation_text}>
              Но не отчаивайтесь. В следующий раз вам обязательно повезёт
            </p>
            <div className={styles.bottom}>
              <img src={cyberCat} alt="Cyber cat" />
              <BackToLobbyButton />
              <img src={cyberFox} alt="Cyber fox" />
            </div>
          </>
        ) : (
          <>
            <div className={styles.regret_wrapper}>
              <h3 className={styles.regret_bottom}>Cдаться?</h3>
            </div>
            <p className={styles.motivation_text}>
              Вы точно уверены, что хотите сдаться?
            </p>
            <div className={styles.bottom}>
              <img src={cyberCat} alt="Cyber cat" />
              <div className={styles.btn_wrap}>
                <MainButton onClick={() => setIsConfirm(true)}>
                  Сдаться
                </MainButton>
                <br />
                <MainButton onClick={handleClose}>Вернуться в игру</MainButton>
              </div>
              <img src={cyberFox} alt="Cyber fox" />
            </div>
          </>
        )}
      </ScreenBlock>
    </Modal>
  );
};
