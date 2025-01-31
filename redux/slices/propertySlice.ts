import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "./userSlice";
import { Category } from "./categorySlice";

export interface Property {
  _id: string;
  title: string;
  description: string;
  services: string[];
  price: number;
  location: string;
  longitude: number;
  latitude: number;
  images: string[];
  status: boolean;
  duration: number;
  duration_type: string;
  category: Category;
  user: UserState;
}

interface PropertyState {
  properties: Property[];
}

const initialState: PropertyState = {
  properties: []
}

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    }
  }
})

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;