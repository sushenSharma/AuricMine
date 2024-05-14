import React, { useEffect, useState } from "react";
import "./assets/styles/App.css";
import TabBar from "./components/TabBar";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase, userIdKey } from "./constants";
import LandingPage from "./components/landing_Page";

const App = () => {
  const [session, setSession] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // User is already signed in when page loads
        addUserPosition(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (event === "SIGNED_IN") {
        // User explicitly signed in during this session
        await addUserPosition(session.user.id);
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
              background: "#222d30", // Semi-transparent dark panel
              padding: "2rem", // Space inside the panel
              borderRadius: "1rem", // Rounded corners of the panel
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Shadow for the panel
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
