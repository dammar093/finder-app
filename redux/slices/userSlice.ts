import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface UserState {
  fullName: string,
  gender?: string,
  email: string,
  _id?: string,
  phoneNumber: string,
  profile?: string,
  role: string
}
const initialState: UserState = {
  fullName: "",
  gender: "",
  email: "",
  _id: "",
  phoneNumber: "",
  profile: "",
  role: ""
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullName = action.payload.fullName;
      state.gender = action.payload.gender;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.phoneNumber = action.payload.phoneNumber;
      state.profile = action.payload.profile;
      state.role = action.payload.role;
    },
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;