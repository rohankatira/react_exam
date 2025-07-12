import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000";


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetch(`${BASE_URL}/posts`);
  return await response.json();
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return await response.json();
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return await response.json();
});

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
  return id;
});


const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle", 
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
