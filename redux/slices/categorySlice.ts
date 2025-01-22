import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  name: string;
  _id: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: []
}

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCateGories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

  }
})

export const { setCateGories } = categorySlice.actions;
export default categorySlice.reducer;