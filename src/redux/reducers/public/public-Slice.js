import { createSlice } from "@reduxjs/toolkit";

const publicSlice = createSlice({
  name: "Public",
  initialState: {
    userUUID: "",
    userDetails: {},
    userSession: {},
  },
  reducers: {
    setUserUUID(state, action) {
      state.userUUID = action.payload;
    },
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setUserSession(state, action) {
      state.userSession = action.payload;
    },
  },
});

export const publicSliceActions = publicSlice.actions;

export default publicSlice.reducer;
