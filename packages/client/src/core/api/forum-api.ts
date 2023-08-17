import { HttpTransport } from "@api/http-transport";
import { API_FORUM } from "@config/constants";
import {
  ForumTopic,
  ReactionTarget,
  TopicComments,
  TopicStructure,
} from "@config/forum-types";

class ForumApi extends HttpTransport {
  public getAllTopics(
    cursor: number,
    limit: number = 10
  ): Promise<{ data: ForumTopic[] }> {
    return this._axios.get(`${API_FORUM.FORUM_TOPIC}/${cursor}/${limit}`);
  }

  public searchTopic(query: string): Promise<{ data: ForumTopic[] }> {
    return this._axios.post(API_FORUM.FORUM_TOPIC_SEARCH, { query });
  }

  public addTopic(data: TopicStructure): Promise<{ data: ForumTopic }> {
    return this._axios.post(API_FORUM.FORUM_TOPIC, data);
  }

  public editTopic(id: number, data: TopicStructure) {
    return this._axios.put(`${API_FORUM.FORUM_TOPIC}/${id}`, data);
  }

  public deleteTopic(id: number) {
    return this._axios.delete(`${API_FORUM.FORUM_TOPIC}/${id}`);
  }

  public getTopicComments(
    id: number,
    cursor?: number,
    limit?: number
  ): Promise<{ data: TopicComments[] }> {
    return this._axios.get(
      `${API_FORUM.FORUM_COMMENT}/${id}/${cursor ?? 0}/${limit ?? 100}`
    );
  }

  public addTopicComment(data: {
    body: string;
    topicId: number;
  }): Promise<{ data: TopicComments }> {
    return this._axios.post(API_FORUM.FORUM_COMMENT, data);
  }

  public changeTopicComment(id: number, data: { body: string }) {
    return this._axios.put(`${API_FORUM.FORUM_COMMENT}/${id}`, data);
  }

  public deleteTopicComment(id: number) {
    return this._axios.delete(`${API_FORUM.FORUM_COMMENT}/${id}`);
  }

  public addCommentReplies(data: {
    body: string;
    commentId: number;
  }): Promise<{ data: TopicComments[] }> {
    return this._axios.post(API_FORUM.FORUM_REPLY, data);
  }

  public changeCommentReply(id: number, data: { body: string }) {
    return this._axios.put(`${API_FORUM.FORUM_REPLY}/${id}`, data);
  }

  public deleteCommentReply(id: number) {
    return this._axios.delete(`${API_FORUM.FORUM_REPLY}/${id}`);
  }

  public addForumReaction(data: {
    targetId: number;
    target: ReactionTarget;
  }): Promise<{ data: { reacted: boolean } }> {
    return this._axios.post(API_FORUM.FORUM_REACTION, data);
  }

  public toggleTopicEmoji(data: {
    emoji: string;
    topicId: number;
  }): Promise<{ data: { reacted: boolean } }> {
    return this._axios.post(API_FORUM.ADD_TOPIC_EMOJI, data);
  }
}

export default new ForumApi();
