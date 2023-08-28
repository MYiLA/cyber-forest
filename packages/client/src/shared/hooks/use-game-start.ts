import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { gameSlice } from "@store/reducers/game-reducer";
import { playersSlice } from "@store/reducers/players-reducer";
import { PhaseType } from "@pages/page-game/widgets/game/constants";
import { PayloadStart } from "@store/reducers/type";

export const useGameStart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getGameState = (store: RootState) => store.game;

  const { loading } = useSelector(getGameState);

  /** Подготавливает данные игры */
  const toStartGame = useCallback(
    () => dispatch(gameSlice.actions.gameStart()),
    [dispatch]
  );

  const toSetGameMaxGlory = useCallback(
    (maxGlory: number) => dispatch(gameSlice.actions.setMaxGlory(maxGlory)),
    [dispatch]
  );

  const toGetPlayersData = useCallback(
    (payload: PayloadStart) =>
      dispatch(playersSlice.actions.gameStart(payload)),
    [dispatch]
  );

  const toSetGamePhase = useCallback(
    (phase: PhaseType) => dispatch(gameSlice.actions.setCurrentPhase(phase)),
    [dispatch]
  );

  const toGamePathNavigate = useCallback(
    (path: string) => navigate(path),
    [navigate]
  );

  return {
    loading,
    toStartGame,
    toSetGameMaxGlory,
    toGetPlayersData,
    toSetGamePhase,
    toGamePathNavigate,
  };
};
