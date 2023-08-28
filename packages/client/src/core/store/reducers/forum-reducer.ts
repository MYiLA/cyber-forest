import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ForumApi from "@api/forum-api";
import {
  ForumTopic,
  ReactionTarget,
  TopicComments,
  TopicStructure,
} from "@config/forum-types";
import { API_FORUM } from "@core/config/constants";

export const deleteTopic = createAsyncThunk(
  "forum/deleteTopic",
  (topicId: number) =>
    ForumApi.deleteTopic(topicId).then(() => ForumApi.getAllTopics(0))
);
export const addCommentReply = createAsyncThunk(
  "forum/addReply",
  (data: { data: { body: string; commentId: number }; topicId: number }) =>
    ForumApi.addCommentReplies(data.data).then(() =>
      ForumApi.getTopicComments(data.topicId)
    )
);
export const addTopicComment = createAsyncThunk(
  "forum/addComment",
  (data: { body: string; topicId: number }) =>
    ForumApi.addTopicComment(data).then(() =>
      ForumApi.getTopicComments(data.topicId)
    )
);
export const addReaction = createAsyncThunk(
  "forum/addReaction",
  (data: {
    data: { targetId: number; target: ReactionTarget };
    topicId: number;
  }) =>
    ForumApi.addForumReaction(data.data).then(() =>
      ForumApi.getTopicComments(data.topicId)
    )
);
export const changeTopic = createAsyncThunk(
  "forum/change",
  (data: {
    id: number;
    data: TopicStructure;
    active?: boolean;
  }): Promise<{ data: ForumTopic[] } | undefined> =>
    ForumApi.editTopic(data.id, data.data).then(({ status }) => {
      if (status === 200) return ForumApi.getAllTopics(0);
    })
);
export const deleteCommentReply = createAsyncThunk(
  "forum/deleteReply",
  (data: { topicId: number; replyId: number }) =>
    ForumApi.deleteCommentReply(data.replyId).then(() =>
      ForumApi.getTopicComments(data.topicId, 0)
    )
);
export const deleteTopicComment = createAsyncThunk(
  "forum/deleteComment",
  (data: { topicId: number; commentId: number }) =>
    ForumApi.deleteTopicComment(data.commentId).then(({ status }) => {
      if (status === 200) return ForumApi.getTopicComments(data.topicId, 0);
    })
);
export const getNewTopic = createAsyncThunk(
  "forum/addNewTopic",
  (data: TopicStructure) => ForumApi.addTopic(data)
);
export const getSearchenTopics = createAsyncThunk(
  "forum/searchenTopics",
  (query: string) => ForumApi.searchTopic(query)
);

export const getAllTopics = createAsyncThunk("forum/topics", (cursor: number) =>
  ForumApi.getAllTopics(cursor)
);

export const getTopicsComment = createAsyncThunk(
  "forum/comments",
  (data: { id: number; cursor: number }) =>
    ForumApi.getTopicComments(data.id, data.cursor)
);

export const toggleTopicEmoji = createAsyncThunk(
  API_FORUM.ADD_TOPIC_EMOJI,
  (data: { emoji: string; topicId: number }) =>
    ForumApi.toggleTopicEmoji(data).then(() => ForumApi.getAllTopics(0))
);

const initialState: {
  /** загрузка данных */
  loading: boolean;
  error: string | null;
  /** открытый топик форума */
  activeTopic: ForumTopic | null;
  /** комментарии к открытому топику */
  activeTopicComments: TopicComments[] | null;
  /** доступные топики форума */
  forum: ForumTopic[] | null;
  /** топики по поиску */
} = {
  loading: false,
  error: null,
  activeTopic: null,
  activeTopicComments: null,
  forum: null,
};

const ForumSlice = createSlice({
  name: "forum",
  initialState,
  reducers: {
    setActiveTopic: (state, action: PayloadAction<ForumTopic | null>) => {
      if (action.payload) {
        return {
          ...state,
          activeTopicComments: null,
          activeTopic: action.payload,
        };
      }

      return {
        ...state,
        activeTopic: null,
        activeTopicComments: null,
      };
    },
    resetError: (state) => ({ ...state }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopics.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllTopics.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
      }))
      .addCase(getAllTopics.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        forum: action.payload.data as ForumTopic[],
      }))
      .addCase(getNewTopic.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(getNewTopic.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
      }))
      .addCase(getNewTopic.fulfilled, (state, action) => {
        if (action.payload.data) {
          return {
            ...state,
            loading: false,
            error: null,
            activeTopic: action.payload.data,
          };
        }
      })
      .addCase(getTopicsComment.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getTopicsComment.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
      }))
      .addCase(getTopicsComment.fulfilled, (state, action) => ({
        ...state,
        error: null,
        loading: false,
        activeTopicComments: action.payload.data,
      }))
      .addCase(getSearchenTopics.pending, (state) => ({
        ...state,
        error: null,
        loading: true,
        forum: null,
      }))
      .addCase(getSearchenTopics.rejected, (state, action) => ({
        ...state,
        error: action.error.message as string,
        loading: false,
        forum: null,
      }))
      /** если ищем топик по строке - список всех топиков обнуляется */
      .addCase(getSearchenTopics.fulfilled, (state, action) => {
        if (action.payload.data && action.payload.data[0]) {
          return {
            ...state,
            error: null,
            loading: false,
            forum: action.payload.data,
          };
        }

        return {
          ...state,
          error: "по вашему поиску нет результатов",
          loading: false,
          forum: null,
        };
      })
      .addCase(deleteCommentReply.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteCommentReply.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
      }))
      .addCase(deleteCommentReply.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        activeTopicComments: action.payload.data,
      }))
      .addCase(deleteTopicComment.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(deleteTopicComment.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
        activeTopicComments: [],
      }))
      .addCase(deleteTopicComment.fulfilled, (state, action) => {
        if (action.payload) {
          return {
            ...state,
            loading: false,
            error: null,
            activeTopicComments: action.payload.data,
          };
        }
      })
      .addCase(changeTopic.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(changeTopic.rejected, (state, action) => ({
        ...state,
        loading: false,
        activeTopic: null,
        error: action.error.message as string,
      }))
      .addCase(changeTopic.fulfilled, (state, action) => {
        if (action.payload && action.meta?.arg?.active) {
          const topic = action.payload.data.filter(
            ({ id }) => id === action.meta?.arg?.id
          )[0];

          return {
            ...state,
            loading: false,
            error: null,
            activeTopic: topic as ForumTopic,
          };
        }
        if (action.payload && !action.meta?.arg?.active) {
          return {
            ...state,
            loading: false,
            error: null,
            activeTopic: null,
            forum: action.payload.data,
          };
        }
      })
      .addCase(addReaction.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(addReaction.rejected, (state, action) => ({
        ...state,
        activeTopicComments: [],
        loading: false,
        error: action.error.message as string,
      }))
      .addCase(addReaction.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        activeTopicComments: action.payload.data,
      }))
      .addCase(addTopicComment.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(addTopicComment.rejected, (state, action) => ({
        ...state,
        loading: false,
        activeTopicComments: [],
        error: action.error.message as string,
      }))
      .addCase(addTopicComment.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        activeTopicComments: action.payload.data,
      }))
      .addCase(addCommentReply.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(addCommentReply.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
        activeTopicComments: null,
      }))
      .addCase(addCommentReply.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        activeTopicComments: action.payload.data,
      }))
      .addCase(deleteTopic.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
        forum: [],
      }))
      .addCase(deleteTopic.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message as string,
        forum: [],
      }))
      .addCase(deleteTopic.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        forum: action.payload.data,
      }))
      .addCase(toggleTopicEmoji.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(toggleTopicEmoji.rejected, (state, action) => ({
        ...state,
        loading: false,
        activeTopic: null,
        error: action.error.message as string,
      }))
      .addCase(toggleTopicEmoji.fulfilled, (state, action) => {
        if (action.payload && action.meta?.arg.emoji) {
          const topic = action.payload.data.filter(
            ({ id }) => id === action.meta.arg.topicId
          )[0];

          return {
            ...state,
            loading: false,
            error: null,
            activeTopic: topic,
          };
        }
        if (action.payload && !action.meta?.arg.emoji) {
          return {
            ...state,
            loading: false,
            error: null,
            activeTopic: null,
            forum: action.payload.data,
          };
        }
      });
  },
});

export const { resetError, setActiveTopic } = ForumSlice.actions;
export default ForumSlice.reducer;
