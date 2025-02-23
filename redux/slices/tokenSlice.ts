import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface TokenState {
  token: string;
}

export const initialState: TokenState = {
  token: "",
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<TokenState>) => {
      //@ts-ignore
      state.token = action.payload
    }
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;