import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase, userIdKey } from "./constants";

import TabBar from "./components/TabBar";
import LandingPage from "./components/LandingPage";

import "./assets/styles/App.css";
import "./ui-kit/typography/styles.css"

const App = () => {
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        addUserPosition(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN") {
        await addUserPosition(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
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
  const handleLogin = () => {
    setShowAuth(true);
  };

  if (!session) {
    if (showAuth) {
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
      );
    }
    return <LandingPage onLogin={handleLogin} />;
  } else {
    localStorage.setItem(userIdKey, session.user.id);
    return <TabBar sessionObj={session} />;
  }
};

export default App;
