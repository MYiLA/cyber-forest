import { Modal } from "@ui/modal";
import { useState } from "react";
import cn from "classnames";
import { Player } from "@pages/page-game/type";
import { NavLink } from "react-router-dom";
import { PATH } from "@config/constants";
import eagleImg from "./images/cyber-eagle.png";
import foxImg from "./images/cyber-fox.png";
import styles from "./wineer-screen.module.scss";
import { ScreenBlock } from "../screen-block";

export const WinnerScreen = (winner: Player | undefined) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <ScreenBlock className={styles.winner_screen}>
        <div className={styles.congratulation_wrapper}>
          <h3 className={styles.congratulation_top}>Поздравляем</h3>
          <h3 className={styles.congratulation_bottom}>Вы выиграли!</h3>
        </div>
        <div className={styles.score_wrapper}>
          <img
            src={eagleImg}
            className={styles.score_image}
            alt="Cyber Eagle"
          />
          <div className={styles.score_info}>
            <h4 className={cn(styles.score_info__title)}>
              победитель - {winner?.name}
            </h4>
            {winner?.movesCount && (
              <p>победа за {winner?.movesCount} шага(ов)</p>
            )}
            <div className={styles.score_info__glory}>
              <p>слава</p>
              <p>{winner?.gloryCount}</p>
            </div>
            {/* TODO: временно - ссылка на рейтинг пользователей */}
            {/* <BackToLobbyButton className={styles.score_info__button} /> */}
            <NavLink to={PATH.LEADER_BOARD} className={styles.navigation}>
              просмотр рейтинга
            </NavLink>
            <NavLink to={PATH.LOBBY}> выйти в меню </NavLink>
          </div>
          <img src={foxImg} className={styles.score_image} alt="Cyber Fox" />
        </div>
      </ScreenBlock>
    </Modal>
  );
};
