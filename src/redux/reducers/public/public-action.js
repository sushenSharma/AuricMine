import { publicSliceActions } from "./public-Slice";

export const getUserUUID = (userUUID) => {
  return (dispatch) => {
    dispatch(publicSliceActions.setUserUUID(userUUID));
  };
};
