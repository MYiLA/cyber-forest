import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'
import { User } from '../features/user/user-model'
import { Leaderboard } from '../features/leaderboard/leaderboard-model'
import { Topic } from '../features/forum/topic/topic-model'
import { Comment } from '../features/forum/comment/comment-model'
import { Reply } from '../features/forum/reply/reply-model'
import {
  ReactionComment,
  ReactionReply,
} from '../features/forum/reaction/reaction-models'
import { YandexToken } from '../features/o-auth/oauth-models'
import { Emoji } from '../features/forum/emoji/emoji-model'

const isProduction = process.env.NODE_ENV === 'production'

if (!isProduction) {
  dotenv.config({ path: '../../.env' })
}

export const db_host = isProduction
  ? String(process.env.POSTGRES_HOST)
  : 'localhost'
export const db_port = isProduction
  ? Number(process.env.POSTGRES_PORT)
  : Number(process.env.POSTGRES_LOCAL_PORT)
export const db_name = String(process.env.POSTGRES_DB)
export const db_user = String(process.env.POSTGRES_USER)
export const db_password = String(process.env.POSTGRES_PASSWORD)

const db = new Sequelize({
  dialect: 'postgres',
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  logging: false,
  models: [
    User,
    Leaderboard,
    Topic,
    Comment,
    Reply,
    ReactionComment,
    ReactionReply,
    YandexToken,
    Emoji,
  ],
})

export default db
