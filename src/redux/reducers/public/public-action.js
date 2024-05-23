import { publicSliceActions } from "./public-Slice";

export const getUserUUID = (userUUID) => {
  return (dispatch) => {
    dispatch(publicSliceActions.setUserUUID(userUUID));
  };
};

export const getUserDetails = (userDetails) => {
  return (dispatch) => {
    dispatch(publicSliceActions.setUserDetails(userDetails));
  };
};

export const getUserSession = (session) => {
  return (dispatch) => {
    dispatch(publicSliceActions.setUserSession(session));
  };
};

export const getLedgerData = (ledgerData) => {
  return (dispatch) => {
    dispatch(publicSliceActions.setLedgerData(ledgerData));
  };
};
