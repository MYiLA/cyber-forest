import user from '@store/reducers/user-reducer'
import players from '@store/reducers/players-reducer'
import theme from '@store/reducers/theme-reducer'
import game from '@store/reducers/game-reducer'
import chat from '@store/reducers/chat-reducer'

const rootReducer = { user, players, theme, game, chat }
export default rootReducer
