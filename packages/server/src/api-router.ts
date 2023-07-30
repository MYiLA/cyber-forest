import express, { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { ErrorMiddleware } from './middlewares/error-middleware'
import { AuthMiddleware } from './middlewares/auth-middleware'
import { ApiError } from './exceptions/api-error'
import { forumRouter } from './features/forum/forum-router'
import { chatsRouter } from './features/chats/chats-router'
import { leaderboardRouter } from './features/leaderboard/leaderboard-router'
import { resourcesRouter } from './features/resources/resources-router'
import { authRouter } from './features/auth/auth-router'
import { userRouter } from './features/user/user-router'
import { oAuthRouter } from './features/o-auth/o-auth-router'

export const apiRouter = Router()

apiRouter.use(express.static('swagger'))
apiRouter.use('/resources', AuthMiddleware, express.static('uploads'))

apiRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/api/swagger.json',
    },
  })
)

apiRouter.use('/auth', authRouter)
apiRouter.use('/oauth', oAuthRouter)
apiRouter.use('/chats', AuthMiddleware, chatsRouter)
apiRouter.use('/leaderboard', AuthMiddleware, leaderboardRouter)
apiRouter.use('/user', AuthMiddleware, userRouter)
apiRouter.use('/resources', resourcesRouter)
apiRouter.use('/forum', AuthMiddleware, forumRouter)

apiRouter.use('*', () => {
  throw ApiError.BadRequest()
})

apiRouter.use(ErrorMiddleware)
