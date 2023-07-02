import { IUserData } from '@config/types'

export interface IActiveForumTopicMessages {
  chat_id: number
  time: string
  type: string
  user_id: number
  content: string
  file?: {
    id: number
    user_id: number
    path: string
    filename: string
    content_type: string
    content_size: number
    upload_date: string
  }
}

export interface IActiveForumTopicProps {
  id: number
  onClose: () => void
}
export interface ITopicDetails {
  title: string
  description: string
  commentaries: ITopicComment[]
}
export interface ITopicComment {
  comment_id: number
  content: string
  time: string
  type: string
  user_data: IUserData
  likes: number
  liked: boolean
  comments?: ITopicCommentComment[]
}
// interface IUserData {
// 	id: string,
// 	avatar?: string,
// 	displayName: string
// }
export interface ITopicCommentComment {
  time: string
  type: string
  user: IUserData
  content: string
}
