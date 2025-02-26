import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import API from "../../http-call/apiCall";
import { Project } from "../../types/Project";

interface ProjectList {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectList = {
  projects: [],
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "posts/fetchProjects",
  async () => {
    const response = await API.get("/api/projects/all", {
      withCredentials: true,
    });
    return response.data.projects; // Ensure the backend response is an array of posts
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload || [];
          state.loading = false;
        }
      )
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

export default projectSlice.reducer;
