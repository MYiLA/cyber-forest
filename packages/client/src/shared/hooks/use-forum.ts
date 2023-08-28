import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { resetError } from "@store/reducers/user-reducer";
import {
  addCommentReply,
  addReaction,
  addTopicComment,
  changeTopic,
  deleteCommentReply,
  deleteTopic,
  deleteTopicComment,
  getAllTopics,
  getNewTopic,
  getSearchenTopics,
  getTopicsComment,
  setActiveTopic,
  toggleTopicEmoji,
} from "@store/reducers/forum-reducer";
import {
  ForumTopic,
  ReactionTarget,
  TopicStructure,
} from "@config/forum-types";

export const useForum = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(
    () => () => {
      dispatch(resetError());
    },
    []
  );

  const toGetForumTopics = useCallback((cursor: number) => {
    dispatch(getAllTopics(cursor));
  }, []);

  const toGetTopicsComments = useCallback(
    (data: { id: number; cursor: number }) => {
      dispatch(getTopicsComment(data));
    },
    [dispatch]
  );

  const toAddNewTopic = useCallback(
    (data: TopicStructure) => {
      dispatch(getNewTopic(data));
    },
    [dispatch]
  );

  const toAddReaction = useCallback(
    (data: {
      data: { targetId: number; target: ReactionTarget };
      topicId: number;
    }) => {
      dispatch(addReaction(data));
    },
    [dispatch]
  );

  const toAddTopicComment = useCallback(
    (data: { body: string; topicId: number }) => {
      dispatch(addTopicComment(data));
    },
    [dispatch]
  );

  const toAddCommentReply = useCallback(
    (data: { data: { body: string; commentId: number }; topicId: number }) => {
      dispatch(addCommentReply(data));
    },
    [dispatch]
  );

  const toDeleteTopic = useCallback(
    (topicId: number) => {
      dispatch(deleteTopic(topicId));
    },
    [dispatch]
  );

  const toChangeTopic = useCallback(
    (data: { id: number; data: TopicStructure; active?: boolean }) => {
      dispatch(changeTopic(data));
    },
    [dispatch]
  );

  const toDeleteComment = useCallback(
    (data: { topicId: number; commentId: number }) => {
      dispatch(deleteTopicComment(data));
    },
    [dispatch]
  );

  const toDeleteCommentReply = useCallback(
    (data: { topicId: number; replyId: number }) => {
      dispatch(deleteCommentReply(data));
    },
    [dispatch]
  );

  const toSearchForTopic = useCallback(
    (query: string) => {
      dispatch(getSearchenTopics(query));
    },
    [dispatch]
  );

  const toChooseActiveTopic = useCallback(
    (data: ForumTopic | null) => {
      dispatch(setActiveTopic(data));
    },
    [dispatch]
  );

  const toToggleTopicEmoji = useCallback(
    (data: { emoji: string; topicId: number }) => {
      dispatch(toggleTopicEmoji(data));
    },
    [dispatch]
  );

  return {
    toGetForumTopics,
    toGetTopicsComments,
    toAddNewTopic,
    toAddReaction,
    toAddTopicComment,
    toAddCommentReply,
    toChangeTopic,
    toDeleteTopic,
    toDeleteComment,
    toDeleteCommentReply,
    toSearchForTopic,
    toChooseActiveTopic,
    toToggleTopicEmoji,
  };
};
