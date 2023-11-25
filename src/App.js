import React, { useEffect, useState } from "react";
import "./assets/styles/App.css";
import TabBar from "./components/TabBar";
import { createClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        // User is already signed in when page loads
        addUserPosition(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
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
    const { data, error } = await supabase.from('users_positions').insert({
      user_id: userId,
      position_id: randomPositionId
    });
    if (error) {
      console.error("Error inserting data:", error);
    }
    
  };

 
  if (!session) {
    return (
      <div className="login-container">
        <div className="auth-box">
          <h2>Welcome Back</h2>
          <Auth supabaseClient={supabase} providers={["google"]} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <div className="user-info">Logged in as User: {session.user.id}</div>
        <button className="sign-out-btn" onClick={() => supabase.auth.signOut()}>
          Sign out
        </button>
        <TabBar userId={session.user.id} />
      </div>
    );
  }
};

export default App;
