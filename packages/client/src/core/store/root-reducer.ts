// user reducer
import user from '@store/reducers/user-reducer'
// players reducer
import players from '@store/reducers/players-reducer'
// theme reducer
import theme from '@store/reducers/theme-reducer'
// game reducer
import game from '@store/reducers/game-reducer'
// chat reducer
import chat from '@store/reducers/chat-reducer'
// forum reducer
import forum from '@store/reducers/forum-reducer'

const rootReducer = { user, players, theme, game, chat, forum }
export default rootReducer
