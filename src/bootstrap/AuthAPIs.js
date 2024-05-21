import React, { Fragment, useEffect } from "react";
import { supabase } from "../constants";
import { removeStorageItem } from "../utils/common-utils";

const AuthAPIs = ({ activeUser, setLoading }) => {
  useEffect(() => {
    if (activeUser) {
      const getLoggedInUser = (setLoading) => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            addUserPosition(session.user.id);
          } else {
            removeStorageItem(["userSession", "userId"]);
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
