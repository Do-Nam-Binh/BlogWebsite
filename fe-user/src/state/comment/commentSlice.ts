import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../http-call/apiCall";
import { Comment } from "../../types/Comment";

interface CommentList {
  commentsByPost: Record<string, Comment[]>; // Object where postId is key
  loading: boolean;
  error: string | null;
}

const initialState: CommentList = {
  commentsByPost: {},
  loading: false,
  error: null,
};

// Fetch comments for a specific post
export const fetchCommentOfPost = createAsyncThunk(
  "comments/fetchComments",
  async (postId: string) => {
    const response = await API.get(`/api/comment/${postId}`, {
      withCredentials: true,
    });
    console.log(response.data); // Check API response structure
    return { postId, comments: response.data.comments }; // Ensure response contains `comments`
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentToState: (
      state,
      action: PayloadAction<{ postId: string; comment: Comment }>
    ) => {
      const { postId, comment } = action.payload;
      if (state.commentsByPost[postId]) {
        state.commentsByPost[postId].push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentOfPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCommentOfPost.fulfilled,
        (
          state,
          action: PayloadAction<{ postId: string; comments: Comment[] }>
        ) => {
          const { postId, comments } = action.payload;
          state.commentsByPost[postId] = comments; // Store comments under postId key
          state.loading = false;
        }
      )
      .addCase(fetchCommentOfPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export const { addCommentToState } = commentSlice.actions;
export default commentSlice.reducer;
