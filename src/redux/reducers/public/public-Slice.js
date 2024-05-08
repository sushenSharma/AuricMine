import { createSlice } from "@reduxjs/toolkit";

const publicSlice = createSlice({
  name: "Public",
  initialState: {
    userUUID: "",
  },
  reducers: {
    setUserUUID(state, action) {
      state.userUUID = action.payload;
    },
  },
});

export const publicSliceActions = publicSlice.actions;

export default publicSlice.reducer;
