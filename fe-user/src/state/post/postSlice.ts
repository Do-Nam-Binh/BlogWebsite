import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../http-call/apiCall";
import { Post } from "../../types/Post";

interface PostList {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostList = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await API.get("/api/post/all", { withCredentials: true });
  return response.data.posts; // Ensure the backend response is an array of posts
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likePost: (
      state,
      action: PayloadAction<{
        postId: string;
      }>
    ) => {
      const { postId } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes + 1 } : post
      );
    },

    dislikePost: (
      state,
      action: PayloadAction<{
        postId: string;
      }>
    ) => {
      const { postId } = action.payload;
      state.posts = state.posts.map((post) =>
        post._id === postId ? { ...post, likes: post.likes - 1 } : post
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export const { likePost, dislikePost } = postSlice.actions;
export default postSlice.reducer;
