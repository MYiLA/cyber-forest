import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { leaderboardApi, LeaderDto, UserScore } from "@api/leaderboard-api";
import cat from "@images/warriors/cat.png";

export type Leader = {
  name: string;
  score: number;
  avatar: string;
};

type InitialState = {
  loading: boolean;
  leaders: Leader[];
  error?: null | string;
};

const initialState: InitialState = {
  loading: false,
  leaders: [],
  error: null,
};

export const getAllLeaders = createAsyncThunk(
  "leaderboard/getAll",
  (limit?: number) => leaderboardApi.getAll({ limit })
);

export const addUserScore = createAsyncThunk(
  "leaderboard/addUserScore",
  (score: UserScore) => leaderboardApi.addScoreToTable(score)
);

const mapLeaderboard = (dto: LeaderDto[]): InitialState["leaders"] => {
  const leaderHashMap: Record<string, Leader> = {};
  dto.forEach((el) => {
    const { name, score, avatar = cat } = el.data;
    const currentScore = leaderHashMap[name]?.score ?? 0;
    leaderHashMap[name] = {
      name,
      score: currentScore + score,
      avatar,
    };
  });
  return Object.values(leaderHashMap).sort((a, b) => b.score - a.score);
};

const leaderboardSlice = createSlice({
  initialState,
  name: "leaderboard",
  reducers: {
    resetError: (state) => ({ ...state, error: null }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLeaders.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllLeaders.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
        loading: false,
      }))
      .addCase(getAllLeaders.fulfilled, (state, action) => {
        const { data } = action.payload;
        return {
          leaders: mapLeaderboard(data),
          loading: false,
        };
      });
  },
});

export const selectAllLeaders = (state: RootState) => state.leaderboard.leaders;
export const selectLeadersError = (state: RootState) => state.leaderboard.error;
export const selectLeadersIsLoading = (state: RootState) =>
  state.leaderboard.loading;

export const { resetError } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
