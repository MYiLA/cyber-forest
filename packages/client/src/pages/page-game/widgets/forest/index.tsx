import styles from './forest.module.scss'

import { MainButton } from '../../../../shared/ui/main-button/main-button'

export const Forest: React.FC = () => {
  return (
    <div className={styles.forest_wrap}>
      <button className={styles.forest_switch_btn} type="button">
        Киберлес
      </button>
      <div className={styles.forest}>
        <div className="forest_big_card big_card">
          <div className="big_card_img_wrap">
            <div className="big_card_energy_wrap">
              <span className="big_card_energy">1</span>
            </div>
            <div className="big_card_glory_wrap">
              <span className="big_card_glory">1</span>
            </div>
            <img className="big_card_img" src="" alt="Кот" />
          </div>
          <div className="big_card_info_wrap">
            <div className="big_card_title_wrap">
              <span className="big_card_title">Кот</span>
              <MainButton
                type="button"
                extraClassName="ml-10 mr-10"
                className="control_btn mt-10 mb-1 mr-5">
                Готово
              </MainButton>
            </div>
            <div className="big_card_desc_wrap">
              <p className="big_card_desc"></p>
              <p className="big_card_desc strong"></p>
            </div>
            <div className="big_card_dices_wrap">
              <ul className="big_card_dices_list">
                <li className="big_card_dice dice_energy">1</li>
                <li className="big_card_dice dice_energy">1</li>
                <li className="big_card_dice dice_energy">1</li>
                <li className="big_card_dice dice_symbol">?</li>
                <li className="big_card_dice dice_warrior">
                  <div className="dice_info_wrap">
                    <div className="dice_info_top">
                      <span className="dice_level">1</span>
                      <span className="dice_attack">1</span>
                    </div>
                    <div className="dice_info_bottom">
                      <span className="dice_strong">*</span>
                      <span className="dice_defense">1</span>
                    </div>
                  </div>
                  <div className="dice_img_wrap">
                    <img className="dice_img" src="" alt="Кот" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ul className="forest_cards">
          <li className="forest_card card">
            <div className="card_wrap">
              <div className="card_img_wrap">
                <img className="card_img" src="" alt="Кот" />
              </div>
              <div className="card_info_wrap">
                <span className="card_title">Кот</span>
                <span className="card_count">5</span>
              </div>
              <div className="card_info_wrap">
                <span className="card_energy">1</span>
                <span className="card_glory">1</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
