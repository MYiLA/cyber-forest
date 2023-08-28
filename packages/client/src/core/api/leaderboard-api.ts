import { HttpTransport } from "@api/http-transport";

const ALL_LEADERS_API = "/leaderboard/all";
const LEADERBOARD_URL = "/leaderboard";

export type UserScore = {
  name: string;
  score: number;
  avatar?: string;
  id: string | number;
};

const ratingFieldName: keyof UserScore = "score";
const teamName = "CyberForest";

const createScoreData = (score: UserScore) => ({
  data: score,
  ratingFieldName,
  teamName,
});

export type LeaderDto = {
  data: {
    name: string;
    score: number;
    avatar: string;
  };
};

type GetAllParams = {
  limit?: number;
};

const DEFAULT_LIMIT = 100;

class LeaderboardApi extends HttpTransport {
  public getAll(params?: GetAllParams) {
    const limit = params?.limit || DEFAULT_LIMIT;
    return this._axios.post<LeaderDto[]>(ALL_LEADERS_API, {
      ratingFieldName,
      limit,
      cursor: 0,
    });
  }

  public addScoreToTable(score: UserScore) {
    return this._axios.post(LEADERBOARD_URL, createScoreData(score));
  }
}

export const leaderboardApi = new LeaderboardApi();
