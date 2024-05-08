import { combineReducers } from "redux";
import publicSlice from "./public/public-Slice";

export default combineReducers({
  public: publicSlice,
});
