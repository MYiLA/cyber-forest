import { Router } from 'express'
import { topicRouter } from './topic/topic-router'
import { commentRouter } from './comment/comment-router'
import { replyRouter } from './reply/reply-router'
import { reactionRouter } from './reaction/reaction-router'
import { emojiRouter } from './emoji/emoji-router'

export const forumRouter = Router()

forumRouter.use('/topic', topicRouter)
forumRouter.use('/comment', commentRouter)
forumRouter.use('/reply', replyRouter)
forumRouter.use('/reaction', reactionRouter)
forumRouter.use('/emoji', emojiRouter)
