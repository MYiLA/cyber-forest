import user from "@store/reducers/user-reducer";
import players from "@store/reducers/players-reducer";
import game from "@store/reducers/game-reducer";
import chat from "@store/reducers/chat-reducer";
import forum from "@store/reducers/forum-reducer";
import leaderboard from "@store/reducers/leaderboard-reducer";

const rootReducer = {
  user,
  players,
  game,
  chat,
  forum,
  leaderboard,
};
export default rootReducer;
