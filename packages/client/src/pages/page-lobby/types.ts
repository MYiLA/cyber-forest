import { User } from "@config/user-types";
import { ForumTopic } from "@config/forum-types";

export interface IChatData {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  last_message: ILastMessage | undefined;
  onClick?: (id: number) => void;
}

export interface ILastMessage {
  user: User;
  time: string;
  content: string;
}

export interface IActiveForumTopicMessages {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}

export interface ActiveForumTopicProps {
  data: ForumTopic;
  onClose: () => void;
}
export interface ITopicDetails {
  title: string;
  description: string;
  commentaries: ITopicComment[];
}
export interface ITopicComment {
  comment_id: number;
  content: string;
  time: string;
  type: string;
  user_data: User;
  likes: number;
  liked: boolean;
  comments?: ITopicCommentComment[];
}

export interface ITopicCommentComment {
  time: string;
  type: string;
  user: User;
  content: string;
}
