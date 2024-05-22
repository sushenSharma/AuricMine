import React, { Fragment, useEffect } from "react";
import { supabase } from "../constants";
import { removeStorageItem } from "../utils/common-utils";
import { useDispatch } from "react-redux";
import { getUserSession } from "../redux/reducers/public/public-action";

const AuthAPIs = ({ activeUser, setLoading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeUser) {
      const getLoggedInUser = (setLoading) => {
        console.log("1",supabase.auth);
        supabase.auth.getSession().then(({ data: { session } }) => {
          console.log("2", session);

          if (session) {
            addUserPosition(session.user.id);
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
        await addUserPosition(session.user.id);
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
