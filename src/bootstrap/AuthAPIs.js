import React, { Fragment, useEffect } from "react";
import { featuresKey, supabase } from "../constants";
import { useDispatch } from "react-redux";
import { removeStorageItem, setStorageItem } from "../utils/common-utils";
import {
  getUserDetails,
  getUserSession,
  getUserUUID,
} from "../redux/reducers/public/public-action";
import { getFeatureData } from "../api/supabaseClient";

const AuthAPIs = ({ activeUser, setLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUser) {
      const getLoggedInUser = (setLoading) => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
          } else {
            removeStorageItem([
              "userId",
              "userSession",
              "subscription",
              "ledgerData",
              "token",
              "features",
            ]);
          }
          setLoading(false);
        });
      };

      getLoggedInUser(setLoading);
    }
  }, [activeUser, setLoading]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      localStorage.setItem("userSession", JSON.stringify(session));

      dispatch(getUserSession(session));

      setLoading(false);
      if (event === "SIGNED_IN") {
        localStorage.setItem("userId", session.user.id);
        localStorage.setItem("token", session.access_token);
        getFeatureData(session.user.id).then(data => setStorageItem(featuresKey, data));
        dispatch(getUserUUID(session.user.id));
        dispatch(getUserDetails(session.user));
      }
    });

    localStorage.setItem("subscription", JSON.stringify(subscription));

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUserPosition = async (userId) => {
    const randomPositionId = Math.floor(Math.random() * 1000);

    const { error } = await supabase.from("users_positions").insert({
      user_id: userId,
      position_id: randomPositionId,
    });
    if (error) {
      console.error("Error inserting data:", error);
    }
  };

  return <Fragment></Fragment>;
};

export default AuthAPIs;
