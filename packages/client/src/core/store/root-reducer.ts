import user from './reducers/user-reducer'
import players from './reducers/players-reducer'
import theme from './reducers/theme-reducer'
import game from './reducers/game-reducer'
import chat from './reducers/chat-reducer'

const rootReducer = { user, players, theme, game, chat }
export default rootReducer
