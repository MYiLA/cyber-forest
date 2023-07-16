import multer from 'multer'
import * as path from 'path'

export const UploadMiddleware = (fileName: string) => {
  return multer({
    dest: path.join(__dirname, '..', '..', 'uploads'),
    limits: { fileSize: 1024 * 1024 },
  }).single(fileName)
}
