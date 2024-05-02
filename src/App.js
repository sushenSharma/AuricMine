import React, { useEffect, useState } from "react";
import "./assets/styles/App.css";
import TabBar from "./components/TabBar";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase, userIdKey } from "./constants";
// import LandingPage from "./components/LandingPage";
import { customAuthTheme } from "./assets/styles/SupaBaseTheme";
import LandingPage from "./components/landing_Page";
import Header from "./components/header";
const App = () => {
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        addUserPosition(session.user.id);
        localStorage.setItem(userIdKey, session.user.id); // Set user ID in local storage
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN") {
        await addUserPosition(session.user.id);
        localStorage.setItem(userIdKey, session.user.id); // Set user ID in local storage
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
  const handleLogin = () => {
    setShowAuth(true); // Show the authentication component
  };
  return (
    <div style={{background:"#121212"}}>
      <Header onLogin={handleLogin} />
      {!session ? (
        showAuth ? (
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
        ) : (
          <LandingPage onLogin={handleLogin} />
        )
      ) : (
        <TabBar sessionObj={session} />
      )}
    </div>
  );
};

export default App;
