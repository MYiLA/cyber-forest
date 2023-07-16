import { Request } from 'express'

export interface CustomRequest extends Request {
  userId?: number
}

export interface DataObject {
  [key: string]: unknown
}

export type OK = 'OK'

export type UploadedResource = {
  path: string
  filename: string
  content_type: string
  content_size: number
  upload_date: Date
}

export type Rules = {
  [key: string]: {
    rule: RegExp
    message: string
  }
}

export const OK = 'OK'

export enum ReactionTarget {
  COMMENT = 'comment',
  REPLY = 'reply',
}
