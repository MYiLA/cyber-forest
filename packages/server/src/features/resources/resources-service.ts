import { UploadedResource } from '../../config/types-constants'
import * as path from 'path'
import * as fs from 'fs'

class ResourcesService {
  public async save(file: Express.Multer.File): Promise<UploadedResource> {
    const uploadsPath = path.join(__dirname, '..', '..', '..', 'uploads')
    await fs.rename(
      `${uploadsPath}/${file.filename}`,
      `${uploadsPath}/${file.filename}${path.extname(file.originalname)}`,
      () => null
    )
    return {
      path: `/${file.filename}${path.extname(file.originalname)}`,
      filename: file.originalname,
      content_type: file.mimetype,
      content_size: file.size,
      upload_date: new Date(),
    }
  }
}

export default new ResourcesService()
