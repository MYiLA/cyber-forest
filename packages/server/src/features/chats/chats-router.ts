import { Response, Router } from 'express'

export const chatsRouter = Router()

chatsRouter.get('/', (_, res: Response) => {
  res.json({ result: 'chats' })
})
