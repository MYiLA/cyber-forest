import { FC, MouseEventHandler, Ref, useEffect, useMemo, useRef } from "react";
import { RootState } from "@core/store/store";
import { useSelector } from "react-redux";
import { clearContext } from "@pages/page-game/widgets/game/utils/clear-context";
import styles from "./game.module.scss";
import { AreaType, PlayerType, SIZE } from "./constants";
import { getCursorPosition, getPlayerByPoint, getAreaByPoint } from "./utils";
import { GameState } from "./type";
import { Dice } from "../../type";
import { getDiceByPoint } from "./utils/get-dice-by-point";

type GameProps = {
  gameState: GameState;
  onChoosingCube?: ({
    area,
    playerType,
    dice,
  }: {
    playerType: PlayerType;
    area: AreaType;
    dice: Dice;
  }) => void;
};

const getGameState = (store: RootState) => store.game;

export const Game: FC<GameProps> = ({
  gameState,
  onChoosingCube,
}: GameProps) => {
  const { currentPlayerEnergy, currentPlayerType } = useSelector(getGameState);
  const ref: Ref<HTMLCanvasElement> = useRef(null);
  const players = useMemo(() => Object.keys(gameState) as PlayerType[], []);
  const playersCount = useMemo(() => players.length, []);
  const canvas = ref.current;

  useEffect(() => {
    if (canvas === null) return;
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("PlayAreas: ctx === null");
    }
    // Очистка холста перед отрисовкой
    clearContext({
      ctx,
      gameState,
      players,
      playersCount,
      currentPlayerType,
      currentPlayerEnergy,
    });
  }, [gameState, canvas, currentPlayerEnergy]);

  const onChoosingCubeHandler: MouseEventHandler<HTMLCanvasElement> = (
    ev
  ): void => {
    // Если канвас не отрисован, или нет внешнего обработчика то слушатель не нужен
    if (canvas === null || !onChoosingCube) return;
    // Получаем координаты клика
    const { x, y } = getCursorPosition(canvas, ev);
    // По координатам клика вычисляем тип игрока
    const playerType: PlayerType | null = getPlayerByPoint(x, y);

    // Если клик был не по зоне игрока, то обработчик не нужен
    if (!playerType) return;

    // По координатам клика вычисляем тип зоны
    const area: AreaType | null = getAreaByPoint({ playerType, x, y });

    // Если клик был не по зоне игрока, то обработчик не нужен
    if (!area) return;

    const dices = gameState?.[playerType]?.[area];

    // Если в зоне нет кубиков, то обработчик не нужен
    if (!dices?.length) return;

    // Вычисляем, нажатый кубик
    const dice: Dice | undefined = getDiceByPoint({
      playerType,
      x,
      y,
      area,
      dices,
    });

    // Если ни один кубик не был нажат, то обработчик не нужен
    if (!dice) return;

    // Если все данные есть, то запускаем обработчик
    if (playerType && area && dice) {
      onChoosingCube({
        playerType,
        area,
        dice,
      });
    }
  };
  return (
    <div className={styles.play_area_wrap}>
      <canvas
        ref={ref}
        className={styles.play_area}
        width={SIZE.GAME.WIDTH}
        height={SIZE.GAME.HEIGHT}
        onClick={onChoosingCubeHandler}
      />
    </div>
  );
};
