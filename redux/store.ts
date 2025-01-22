import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tokenReducer from "@/redux/slices/tokenSlice";
import userReducer from "@/redux/slices/userSlice";
import wishlistReducer from "@/redux/slices/wishlist";
import categoryReducer from "@/redux/slices/categorySlice";
import propertyReducer from "@/redux/slices/propertySlice";

const store = configureStore({
  reducer: {
    token: tokenReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    categories: categoryReducer,
    properties: propertyReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const selectUser = (state: RootState) => state.user;
export const selectToken = (state: RootState) => state.token

// Custom hooks for dispatch and selector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
