import React, {useEffect} from 'react'
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase, userIdKey } from '../../constants';
import { useDispatch } from 'react-redux';
import { getUserUUID } from '../../redux/reducers/public/public-action';
export default function AuthPage() {
  const dispatch=useDispatch();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // setSession(session);
      if (session) {
        addUserPosition(session.user.id);
        localStorage.setItem(userIdKey, session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // setSession(session);
      if (event === "SIGNED_IN") {
        // await addUserPosition(session.user.id);
        localStorage.setItem(userIdKey, session.user.id);
        localStorage.setItem("token", session.access_token)
        dispatch(getUserUUID(session.user.id));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const addUserPosition = async (userId) => {
    const randomPositionId = Math.floor(Math.random() * 1000); // Adjust the range as needed
    const { data, error } = await supabase.from("users_positions").insert({
      user_id: userId,
      position_id: randomPositionId,
    });
    if (error) {
      console.error("Error inserting data:", error);
    }
  };
  return (
    <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#121212",
            }}
          >
            <div
              style={{
                background: "#222d30",
                padding: "2rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Auth
                supabaseClient={supabase}
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "green",
                        brandAccent: "green",
                      },
                    },
                  },
                }}
                providers={["google"]}
              />
            </div>
          </div>
  )
}
