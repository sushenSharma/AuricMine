import { createSlice } from "@reduxjs/toolkit";

const publicSlice = createSlice({
  name: "Public",
  initialState: {
    userUUID: "",
    userDetails: {},
  },
  reducers: {
    setUserUUID(state, action) {
      state.userUUID = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
});

export const publicSliceActions = publicSlice.actions;

export default publicSlice.reducer;
