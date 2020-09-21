import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios';
import { useSelector } from 'react-redux';

// const API_ENDPOINT = `http://localhost:5000/posts`;
const API_ENDPOINT = `https://immense-forest-73656.herokuapp.com/posts`;
const initialState = {
  posts: [],
  status: 'idle',
  pagination: { page: 1 },
  error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await Axios.get(`${API_ENDPOINT}`);
  console.log(response, "response fetch post");
  return response.data;
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (data) => {
  const response = await Axios.post(`${API_ENDPOINT}`, data);
  console.log(response);
  return response.data;
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await Axios.delete(`${API_ENDPOINT}/${id}`);
  console.log(response, id);
  return id;
})

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, body }) => {
  const response = await Axios.put(`${API_ENDPOINT}/${id}`, { title, body });
  console.log(response);
  return response.data;
})

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload)
    },
    setPagination(state, action) {
      state.pagination.page = action.payload;
    }
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.concat(action.payload)
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addNewPost.pending]: (state, action) => {
      state.status = 'loading'
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts.push(action.payload)
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updatePost.pending]: (state, action) => {
      state.status = 'loading'
    },
    [updatePost.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    [updatePost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deletePost.pending]: (state, action) => {
      state.status = 'loading'
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    [deletePost.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { addPost, setPagination } = postsSlice.actions;

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

