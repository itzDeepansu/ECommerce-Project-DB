import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items:[]
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItemindata: (state, action) => {
      state.items=action.payload
    },
  },
});

export const { addItemindata } = itemSlice.actions;
export default itemSlice.reducer;
