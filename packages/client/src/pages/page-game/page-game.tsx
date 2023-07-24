// TODO: Порефакторить Файл. Слишком много строк
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "@store/store";
import { gameSlice } from "@core/store/reducers/game-reducer";
import { playersSlice } from "@core/store/reducers/players-reducer";
import { shuffleArray } from "@shared/utils/shuffle-array";
import { isEnergyDiceSide } from "@shared/utils/is-energy-dice-side";
import { isWarriorDiceSide } from "@shared/utils/is-warrior-dice-side";
import { FullScreenBtn } from "@ui/full-creen-btn/full-screen-btn";
import { useGameStart } from "@hooks/use-game-start";
import { Loader } from "@ui/loader";
import { WinnerScreen } from "@pages/page-game/screen";
import { useNavigate } from "react-router-dom";
import { PATH } from "@config/constants";
import { getNextPlayerType } from "./utils/get-next-player-type";
import { ChoosingAreaCubeFunction, Dice, Player } from "./type";
import { DiceSide } from "./widgets/game/type";
import { AreaType, DEFAULT_SETTING, PhaseType } from "./widgets/game/constants";
import { GameInterface } from "./widgets/game-interface";
import { Forest } from "./widgets/forest";
import { Game } from "./widgets/game";
import styles from "./page-game.module.scss";

const getGameState = (store: RootState) => store.game;
const getPlayersState = (store: RootState) => store.players;

const PageGame = () => {
  const dispatch = useDispatch<Dispatch>();

  const {
    currentPlayerType,
    currentPhase,
    currentPlayerEnergy,
    maxGlory,
    loading,
  } = useSelector(getGameState);

  const gameState = useSelector(getPlayersState);

  const currentPlayer = gameState[currentPlayerType];

  const [loadingBanner, setLoadingBanner] = useState(loading);

  const { toSetGamePhase } = useGameStart();

  const [stockCubeLimitCount, setStockCubeLimitCount] = useState(
    DEFAULT_SETTING.START_CUBE_LIMIT
  );
  const [hireLimitCount, setHireLimitCount] = useState(
    DEFAULT_SETTING.HIRE_LIMIT
  );
  const [playersCount, setPlayersCount] = useState(
    Object.keys(gameState).length
  );

  const toNavigate = useNavigate();

  const [winner, setWinner] = useState<Player | null>(null);

  // Передать ход следующему игроку
  const goNextPlayerTurn = () => {
    // Получаем следующего игрока
    const nextPlayer = getNextPlayerType(currentPlayerType, playersCount);
    // Ход переходит следующему игроку
    dispatch(gameSlice.actions.setCurrentPlayerType(nextPlayer));
    // Фаза игры переходит в стадию "Итоги битвы"
    dispatch(gameSlice.actions.setCurrentPhase(PhaseType.ResultBattle));
    // TODO: Обновление количества игроков нужно в случае их выбывания по таймеру в процессе игры
    /** Обновляем количество игроков */
    setPlayersCount(Object.keys(gameState).length);
    // Информируем игрока, что ход перешёл к следующему
    window.alert(`Ход переходит к игроку ${nextPlayer}`);
  };

  // TODO: временно работает с таймером, чтобы показать, что есть анимация загрузки
  useEffect(() => {
    if (!currentPlayer) {
      toNavigate(PATH.LOBBY);
    }

    setTimeout(() => toSetGamePhase(PhaseType.Stock), 3000);
  }, []);

  // Обработка фазы Инвентаря
  useEffect(() => {
    if (currentPhase !== PhaseType.Stock || !currentPlayer) return;

    // Увеличиваем счётчик хода текущего игрока
    dispatch(playersSlice.actions.increaseMovesCount(currentPlayerType));

    // Проверяем, достаточно ли кубиков в инвентаре для выброса
    const stockDices = currentPlayer[AreaType.Stock];
    const restDices = currentPlayer[AreaType.Rest];

    // Если количество кубов в инвентаре меньше лимита
    if (stockDices.length < stockCubeLimitCount) {
      // То наполняем инвентарь кубиками из зоны отдыха
      dispatch(
        playersSlice.actions.addDicesInArea({
          areaType: AreaType.Stock,
          playerType: currentPlayerType,
          // В инвентарь кладём перетасованные кубики c неизвестной выбранной стороной
          dices: shuffleArray(restDices).map((dice) => ({
            ...dice,
            activeSide: null,
          })),
        })
      );

      dispatch(
        playersSlice.actions.deleteDicesInArea({
          areaType: AreaType.Rest,
          playerType: currentPlayerType,
          dices: restDices,
        })
      );
    }

    // Добавляем текущему игроку энергию на ход
    dispatch(gameSlice.actions.createCurrentPlayerEnergy());
  }, [currentPhase]);

  // обработка загрузки данных для игры
  useEffect(() => {
    setLoadingBanner(loading);
  }, [loading]);

  // Если лимит кубиков исчерпан, то переходим в фазу подготовки
  useEffect(() => {
    if (stockCubeLimitCount === 0 && currentPhase === PhaseType.Stock) {
      dispatch(
        gameSlice.actions.setCurrentPhase(PhaseType.PreparationAndHiring)
      );
    }
  }, [stockCubeLimitCount]);

  // Обработка фазы Подготовки
  useEffect(() => {
    if (currentPhase !== PhaseType.PreparationAndHiring || !currentPlayer)
      return;
    // Обновляем лимит по найму воинов в киберлесе
    setHireLimitCount(DEFAULT_SETTING.HIRE_LIMIT);
    // Добавляем очки энергии от выпавших кубиков
    const diceEnergy = currentPlayer[AreaType.Preparation].reduce(
      (acc, dice) => {
        const side = dice.activeSide;
        if (side && isEnergyDiceSide(side)) {
          return acc + side.energyCount;
        }
        return acc;
      },
      0
    );
    dispatch(gameSlice.actions.increaseCurrentPlayerEnergy(diceEnergy));
  }, [currentPhase]);

  // Обработка фазы Атаки
  useEffect(() => {
    if (currentPhase !== PhaseType.Attack || !currentPlayer) return;
    const currentPlayerArmy = currentPlayer[AreaType.Attack]
      .map((dice) => {
        if (isWarriorDiceSide(dice.activeSide)) return dice.activeSide;
      })
      .filter((item) => !!item);
    const otherPlayersArmies = Object.values(gameState)
      .map((player) => {
        if (!player) return;
        if (player.type === currentPlayerType) return;
        const warriors = player[AreaType.Attack].map((dice) => {
          if (isWarriorDiceSide(dice.activeSide))
            return {
              side: dice.activeSide,
              dice,
            };
        });
        return {
          type: player?.type,
          army: warriors,
        };
      })
      .filter((item) => !!item);
    // TODO: Логирование фазы атаки пока сделана через консоль-лог. В будущем нужно переделать вывод сообщений в хронику
    console.log("ФАЗА АТАКИ");
    console.log("otherPlayersArmies", otherPlayersArmies);
    // Если в зоне атаки текущего игрока нет воинов, или у защищающихся игроков нет воинов
    if (
      !currentPlayerArmy.length ||
      !otherPlayersArmies.some((army) => army?.army.length)
    ) {
      console.log("НЕТ ВОИНОВ");
      // То ход сразу переходит к следующему игроку
      goNextPlayerTurn();
      return;
    }

    // Считаем силу атаки армии
    const attack = currentPlayerArmy.reduce(
      (acc, warrior) => acc + Number(warrior?.attack),
      0
    );
    console.log("Сила атаки текущего игрока", attack);
    // TODO: Порефакторить эту часть. Слишком большая вложенность
    // Атакуем силой атаки текущего игрока каждого противника
    otherPlayersArmies.forEach((warriors) => {
      console.log("Противник", warriors);
      console.log("Нет воинов?", !warriors?.army?.length);
      // Если у противника нет воинов - ничего не делаем
      if (!warriors?.army?.length) return;
      // Считаем общую защиту противника
      const defense = warriors.army.reduce(
        (acc, warrior) => acc + Number(warrior?.side.defense),
        0
      );
      console.log("Защита противника", defense);
      console.log("Противник повержен? defense <= attack", defense <= attack);
      // Если сумма защит противника меньше либо равна сумме атак игрока
      if (defense <= attack) {
        const attackDices = gameState?.[warriors.type]?.[AreaType.Attack];
        // Противник повержен
        if (!attackDices) return;
        // Все его воины переходят в зону отдыха
        dispatch(
          playersSlice.actions.addDicesInArea({
            areaType: AreaType.Rest,
            playerType: warriors.type,
            dices: attackDices,
          })
        );
        dispatch(
          playersSlice.actions.deleteDicesInArea({
            areaType: AreaType.Attack,
            playerType: warriors.type,
            dices: attackDices,
          })
        );
        return;
      }
      // Если сумма защит противника больше атаки игрока
      // Сортируем воинов противника по силе защиты
      const sortedWarriors = warriors.army.sort(
        (warrior1, warrior2) =>
          Number(warrior2?.side.defense) - Number(warrior1?.side.defense)
      );
      console.log("сортировка воинов защиты", sortedWarriors);
      // Вычисляем защиту самого сильного воина противника
      const bestDefense = Number(sortedWarriors[0]?.side.defense);
      console.log("Лучшая защита противника", bestDefense);
      console.log("Атака отражена? bestDefense > attack", bestDefense > attack);

      // Если защита самого сильного воина противника больше атаки игрока
      if (bestDefense > attack) {
        // То атака успешно отражена
        return;
      }
      console.log("Сложная ситуация?", bestDefense <= attack);
      // Если защита самого сильного воина противника меньше либо равна атаке игрока
      if (bestDefense <= attack) {
        // TODO: Тут должен быть переход в фазу защиты и игроку даётся выбрать самому,
        // кто из его воинов защищается первым. Временно описана автоматизация. Она будет применена при описании поведения ботов

        // В процессе боя сила атаки падает после ранения каждого воина на силу его защиты
        let attackPower = attack;
        console.log("attackPower", attackPower);
        // Каждый воин противника получает ранение последовательно, начиная с того воина, чья защита меньше всего
        for (let i = sortedWarriors.length - 1; attackPower > 0; i--) {
          const warrior = sortedWarriors[i];
          const defenseWarrior = Number(warrior?.side.defense);
          console.log(
            "Воин получает ранение? defense <= attackPower",
            defenseWarrior,
            attackPower,
            defenseWarrior <= attackPower
          );
          console.log(
            "Воина защитил его самый сильный напарник?",
            bestDefense > attackPower
          );
          // Если защита воина меньше, чем атака, то воин получает ранение
          // В сравнении учавствует и защита сильнейшего воина, так как он может защитить слабого напарника
          if (defenseWarrior <= attackPower && bestDefense <= attackPower) {
            const dice = warrior?.dice;
            if (!dice) return;
            // Атака уменьшается на показатель защиты воина
            attackPower -= defenseWarrior;
            // Воин отправляется в зону отдыха
            dispatch(
              playersSlice.actions.addDicesInArea({
                areaType: AreaType.Rest,
                playerType: warriors.type,
                dices: [dice],
              })
            );
            dispatch(
              playersSlice.actions.deleteDicesInArea({
                areaType: AreaType.Attack,
                playerType: warriors.type,
                dices: [dice],
              })
            );
          } else {
            // Иначе воин выживает
            attackPower = 0;
          }
        }
        console.log(
          `БОЙ с воинами ${warriors.type} окончен. attackPower = ${attackPower}`
        );
      }
    });
    // После атак ход переходит следующему игроку
    goNextPlayerTurn();
  }, [currentPhase]);

  // Обработка фазы Защиты
  useEffect(() => {
    // if (currentPhase !== PhaseType.Defense || !currentPlayer) return
  }, [currentPhase]);

  // Обработка фазы итогов битвы
  useEffect(() => {
    if (currentPhase !== PhaseType.ResultBattle || !currentPlayer) return;

    // Обновляем лимит доставаемых кубиков из инвентаря.
    // Первые 2 хода лимит = 2, последующие ходы лимит = 3
    const cubeLimit =
      currentPlayer.movesCount >= 2
        ? DEFAULT_SETTING.FUTURE_CUBE_LIMIT
        : DEFAULT_SETTING.START_CUBE_LIMIT;
    setStockCubeLimitCount(cubeLimit);

    const preparationDices = currentPlayer[AreaType.Preparation];
    // Если в зоне подготовки остались кубики
    if (preparationDices.length) {
      // Переносим их из зоны подготовки в зону отдыха
      dispatch(
        playersSlice.actions.addDicesInArea({
          areaType: AreaType.Rest,
          playerType: currentPlayerType,
          dices: preparationDices,
        })
      );
      dispatch(
        playersSlice.actions.deleteDicesInArea({
          areaType: AreaType.Preparation,
          playerType: currentPlayerType,
          dices: preparationDices,
        })
      );
    }

    const attackDices = currentPlayer[AreaType.Attack];
    // Если воины игрока в зоне боя выжили
    if (attackDices.length) {
      const glory = attackDices.reduce((acc, item) => acc + item.glory, 0);
      // То добавляем за них славу игроку
      dispatch(
        playersSlice.actions.increaseGlory({
          playerType: currentPlayerType,
          gloryCount: glory,
        })
      );
      // И отправляем воинов из зоны боя в зону отдыха
      dispatch(
        playersSlice.actions.addDicesInArea({
          areaType: AreaType.Rest,
          playerType: currentPlayerType,
          dices: attackDices,
        })
      );
      dispatch(
        playersSlice.actions.deleteDicesInArea({
          areaType: AreaType.Attack,
          playerType: currentPlayerType,
          dices: attackDices,
        })
      );
    }

    // Фаза игры переходит в стадию "Инвентарь"
    setTimeout(
      () => dispatch(gameSlice.actions.setCurrentPhase(PhaseType.Stock)),
      0
    );
  }, [currentPhase]);

  // Обработка окончания игры
  useEffect(() => {
    if (currentPlayer?.gloryCount && currentPlayer?.gloryCount >= maxGlory) {
      setWinner(currentPlayer);
    }
  }, [currentPlayer]);

  // Обработчик клика на кубик внутри инвентаря
  const onChoosingStockCube = (side: DiceSide, id: string) => {
    if (currentPhase === PhaseType.PreparationAndHiring) {
      // Если игрок кликнул на инвентарь в фазе подготовки, информируем игрока
      window.alert(`
        На этом ходу больше нельзя тянуть кубики из инвентаря. 
        Вызовите воинов на бой в зоне подготовки или наймите нового в киберлесе
      `);
    }
    // Выбор кубика из инвентаря доступен только на фазе инвентаря
    if (currentPhase !== PhaseType.Stock || !currentPlayer) return;

    // Информируем игрока, что лимит выбора кубиков исчерпан
    if (stockCubeLimitCount === 0) {
      window.alert("На этом ходу больше нельзя тянуть кубики из инвентаря");
      return;
    }

    const dice = {
      ...currentPlayer[AreaType.Stock].find((diceItem) => diceItem.id === id),
      activeSide: side,
    } as Dice;

    /** Удаляем выбранный кубик из инвентаря текущего игрока */
    dispatch(
      playersSlice.actions.deleteDicesInArea({
        areaType: AreaType.Stock,
        dices: [dice],
        playerType: currentPlayerType,
      })
    );

    /** Добавляем выбранный кубик в зону подготовки текущего игрока */
    dispatch(
      playersSlice.actions.addDicesInArea({
        areaType: AreaType.Preparation,
        dices: [dice],
        playerType: currentPlayerType,
      })
    );

    /** Уменьшаем лимит выбора кубика */
    setStockCubeLimitCount(stockCubeLimitCount - 1);
  };

  // Обработчик клика на кубик внутри канваса
  const onChoosingAreaCube: ChoosingAreaCubeFunction = ({
    area,
    dice,
    playerType,
  }) => {
    if (!currentPlayer) return;
    const side = dice.activeSide;
    if (!side) return;
    // TODO: Временно информирование игрока по фазам сделано через алерты.
    // В будущем это будет визуализировано интуитивно понятными анимациями, дизейблами и тултипами
    switch (currentPhase) {
    case PhaseType.Waiting:
      window.alert("Нужно подождать окончания анимации или другого игрока");
      break;

    case PhaseType.Stock:
      window.alert(
        `Игрок ${currentPlayerType}, вам осталось выбрать в инвентаре ${stockCubeLimitCount} кубик(а)`
      );
      break;

    case PhaseType.PreparationAndHiring:
      // Игрок может вызвать в зону боя выпавших воинов из зоны подготовки за энергию
      if (
        side &&
          // Если этот кубик в зоне подготовки текущего игрока
          currentPlayerType === playerType &&
          area === AreaType.Preparation
      ) {
        // Если данный кубик не воин, то информируем игрока
        if (!isWarriorDiceSide(side)) {
          window.alert(`Вызвать на поле боя можно только воина`);
          return;
        }
        // Если игроку не хватает энергии для вызова воина, то информируем игрока
        if (side.level > currentPlayerEnergy) {
          window.alert(
            `Не хватает энергии для вызова на бой данного существа. У вас ${currentPlayerEnergy} а необходимо ${side.level}`
          );
          return;
        }
        // То вызываем воина на поле боя
        dispatch(
          playersSlice.actions.addDicesInArea({
            areaType: AreaType.Attack,
            playerType: currentPlayerType,
            dices: [dice],
          })
        );
        dispatch(
          playersSlice.actions.deleteDicesInArea({
            areaType: AreaType.Preparation,
            playerType: currentPlayerType,
            dices: [dice],
          })
        );
        // Если количество оставшейся энергии равна стоимости воина, то сразу переходим в фазу атаки
        if (side.level === currentPlayerEnergy) {
          dispatch(gameSlice.actions.setCurrentPhase(PhaseType.Attack));
        }
        // Вычитаем стоимость воина из текущего количества энергии игрока
        dispatch(gameSlice.actions.decreaseCurrentPlayerEnergy(side.level));
      }
      break;

    case PhaseType.Attack:
      window.alert(
        `Игрок ${currentPlayerType}, подождите пожалуйста, пока ваши воины атакуют`
      );
      break;

    case PhaseType.Defense:
      // TODO: Реализовать разрешение спорных защит
      // Если в защите остался один кубик или очки атаки противника иссякли, то ход переходит следующему игроку на фазу инвентаря
      break;

    default:
    }
  };

  // Обработчик клика на кнопку "Готово"
  const onDone = () => {
    if (!currentPlayer) return;
    // TODO: Временно информирование игрока по фазам сделано через алерты.
    // В будущем это будет визуализировано интуитивно понятными анимациями, дизейблами и тултипами
    switch (currentPhase) {
    case PhaseType.Waiting:
      window.alert(
        `Игрок ${currentPlayerType}, нужно подождать окончания анимации или другого игрока`
      );
      break;

    case PhaseType.Stock:
      window.alert(
        `Игрок ${currentPlayerType}, вам осталось выбрать в инвентаре ${stockCubeLimitCount} кубик(а)`
      );
      break;

    case PhaseType.PreparationAndHiring:
      // Переходим на фазу атаки
      dispatch(gameSlice.actions.setCurrentPhase(PhaseType.Attack));
      break;

    case PhaseType.Attack:
      window.alert(
        `Игрок ${currentPlayerType}, подождите пожалуйста, пока ваши воины атакуют`
      );
      break;

    case PhaseType.Defense:
      window.alert(
        `Игрок ${currentPlayerType}, выберите, какой из ваших воинов в зоне боя защищается первый`
      );
      break;

    default:
    }
  };

  // Обработчик клика на кнопку "Найм"
  const onHire = (warrior: Dice) => {
    // Нанимать воинов можно только в фазу подготовки. И только тогда, когда у игрока достаточно энергии
    if (!currentPlayer) return;

    // TODO: Временно информирование игрока по фазам сделано через алерты.
    // В будущем это будет визуализировано интуитивно понятными анимациями, дизейблами и тултипами
    switch (currentPhase) {
    case PhaseType.Waiting:
      window.alert("Ждём окончания анимации или другого игрока");
      break;

    case PhaseType.Stock:
      window.alert(
        `Игрок ${currentPlayerType}, вам осталось выбрать в инвентаре ${stockCubeLimitCount} кубик(а)`
      );
      break;

    case PhaseType.PreparationAndHiring:
      // Проверяем, исчерпан ли лимит по найму воинов в киберлесе
      if (hireLimitCount === 0) {
        // Если исчерпан - информируем об этом игрока
        window.alert(
          `За один ход в Киберлесе можно нанять только ${DEFAULT_SETTING.HIRE_LIMIT} воина(ов)`
        );
        return;
      }
      // Проверяем, хватает ли игроку энергии на покупку
      if (currentPlayerEnergy < warrior.cost) {
        // Если не хватает - информируем игрока об этом
        window.alert(
          `Игрок ${currentPlayerType}, вам не хватает очков энергии. У вас ${currentPlayerEnergy} энергии, а на найм необходимо ${warrior.cost}`
        );
        return;
      }
      // Если энергии хватает, то переносим воина в зону отдыха игрока
      dispatch(
        playersSlice.actions.addDicesInArea({
          areaType: AreaType.Rest,
          playerType: currentPlayerType,
          dices: [warrior],
        })
      );
      // Если количество оставшейся энергии равна стоимости воина, то сразу переходим в фазу атаки
      if (warrior.cost === currentPlayerEnergy) {
        dispatch(gameSlice.actions.setCurrentPhase(PhaseType.Attack));
      }
      // Вычитаем стоимость воина из текущего количества энергии игрока
      dispatch(gameSlice.actions.decreaseCurrentPlayerEnergy(warrior.cost));
      // Уменьшаем счётчик нанятого воина в киберлесу
      dispatch(
        gameSlice.actions.decreaseAccessHireWarriors({
          count: 1,
          type: warrior.type,
        })
      );
      // Уменьшаем лимит по найму воинов в киберлесе
      setHireLimitCount(hireLimitCount - 1);
      // Информируем игрока, что воин успешно нанят
      window.alert(`Игрок ${currentPlayerType} нанял ${warrior.type}`);
      break;

    case PhaseType.Attack:
      window.alert(
        `Игрок ${currentPlayerType}, подождите пожалуйста, пока ваши воины атакуют`
      );
      break;

    case PhaseType.Defense:
      window.alert(
        `Игрок ${currentPlayerType}, выберите пожалуйста, какой из ваших воинов в зоне боя защищается первый`
      );
      break;

    default:
    }
  };
  return (
    <div className={styles.wrap}>
      {loadingBanner && <Loader />}
      {winner && <WinnerScreen {...winner} />}
      <div className={styles.game}>
        {currentPlayer && (
          <>
            <Game gameState={gameState} onChoosingCube={onChoosingAreaCube} />
            <GameInterface
              players={Object.values(gameState)}
              currentPlayer={currentPlayer}
              onChoosingCube={onChoosingStockCube}
              onDone={onDone}
            />
          </>
        )}
        <FullScreenBtn active extraClass={styles.fullscreen} />
        <Forest onHire={onHire} />
      </div>
    </div>
  );
};

export default PageGame;
