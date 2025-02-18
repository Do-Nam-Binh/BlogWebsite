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

const nestComments = (comments: Comment[]) => {
  const commentMap: Record<string, Comment & { children: Comment[] }> = {};
  const nestedComments: (Comment & { children: Comment[] })[] = [];

  comments.forEach((comment) => {
    commentMap[comment._id] = { ...comment, children: [] };
  });

  comments.forEach((comment) => {
    if (comment.replyId && commentMap[comment.replyId]) {
      commentMap[comment.replyId].children.push(commentMap[comment._id]);
    } else {
      nestedComments.push(commentMap[comment._id]); // Root-level comments
    }
  });

  return nestedComments;
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addCommentToState: (
      state,
      action: PayloadAction<{
        postId: string;
        comment: Comment;
        replyId: string;
      }>
    ) => {
      const { postId, comment, replyId } = action.payload;
      if (replyId) {
        const parentComment = state.commentsByPost[postId].find(
          (c) => c._id === replyId
        );

        if (parentComment) {
          if (!parentComment.children) {
            parentComment.children = [];
          }
          parentComment.children.push(comment);
        }
      }
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
          state.commentsByPost[postId] = nestComments(comments); // Store nested comments
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
