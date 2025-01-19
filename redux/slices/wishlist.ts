import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  posts: string[]
}

const initialState: WishlistState = {
  posts: []
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    togglePost: (state, action: PayloadAction<string>) => {
      const index = state.posts.indexOf(action.payload);
      if (index !== -1) {
        state.posts.splice(index, 1);
      } else {
        state.posts.push(action.payload);
      }
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((postId) => postId !== action.payload);
    }
  }
})

export const { togglePost, removePost } = wishlistSlice.actions;
export default wishlistSlice.reducer;