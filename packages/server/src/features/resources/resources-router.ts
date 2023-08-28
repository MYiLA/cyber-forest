import { NextFunction, Response, Router } from 'express'
import { CustomRequest } from '../../config/types-constants'
import ResourcesController from './resources-controller'
import { UploadMiddleware } from '../../middlewares/upload-middleware'
import { ApiError } from '../../exceptions/api-error'
import path from 'path'

export const resourcesRouter = Router()

resourcesRouter.get('/:id', (req, res) => {
  const file = path.join(__dirname, '..', '..', '..', 'uploads')
  const { id } = req.params
  res.sendFile(`${file}/${id}`)
})

resourcesRouter.post(
  '/',
  UploadMiddleware('resource'),
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (req.file) {
        const response = await ResourcesController.upload(req.file)
        return res.send(response)
      } else {
        return next(ApiError.SomethingWrong())
      }
    } catch (e) {
      return next(e)
    }
  }
)
