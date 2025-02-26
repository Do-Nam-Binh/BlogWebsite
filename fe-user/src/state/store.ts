import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./post/postSlice";
import commentReducer from "./comment/commentSlice";
import authReducer from "./auth/authSlice";
import projectReducer from "./project/projectSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
    auth: authReducer,
    project: projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
