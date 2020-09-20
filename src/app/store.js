import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postSlice";

export default configureStore({
  reducer: {
    posts: postsReducer
  },
});
