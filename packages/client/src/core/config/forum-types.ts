import { User } from "@config/user-types";

export type ForumTopic = {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  commentsQty: string;
  author: User;
};

export type TopicStructure = {
  title: string;
  body: string;
};

export type TopicComments = {
  id: number;
  body: string;
  topicId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  reactions: number;
  reacted: boolean;
  author: User;
  replies: TopicCommentReplies[];
};

export type TopicCommentReplies = {
  id: number;
  body: string;
  commentId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  reactions: number;
  reacted: false;
  author: User;
};

export enum ReactionTarget {
  comment = "comment",
  reply = "reply",
}
