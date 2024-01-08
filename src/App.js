import React, { useEffect, useState } from "react";
import "./assets/styles/App.css";
import TabBar from "./components/TabBar";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase, userIdKey } from "./constants";
import LandingPage from "./components/LandingPage";


const customTheme = {
  default: {
    colors: {
      brand: '#e76f51', // Orange button
      brandAccent: '#f4a261', // Lighter orange for accents
      brandButtonText: 'white',
      inputBackground: '#333333', // Dark input fields background
      inputBorder: 'transparent', // No border for input fields
      text: 'white', // White text for inputs and buttons
      link: '#f4a261', // Color for "Sign up" and "Forgot your password?" links
      background: '#262626', // Dark background for the panel
      buttonText: 'white', // Button text color
      buttonBackground: '#e76f51', // Button background color
      buttonBackgroundHover: '#f4a261', // Button background color on hover
    },
    radii: {
      button: '20px', // Rounded buttons
      input: '20px', // Rounded input fields
      card: '8px', // Rounded corners for the card/panel
    },
    shadows: {
      default: '0 4px 6px rgba(0,0,0,0.1)', // Subtle shadow for panels and inputs
    },
    space: {
      small: '8px', // Small space for padding/margin
      medium: '16px', // Medium space for padding/margin
      large: '24px', // Large space for padding/margin
    },
    fonts: {
      body: '"Open Sans", sans-serif', // Font for the body text
    },
  },
  dark: {
    // ... additional dark theme styles, if different from the default
  },
  // ... more theme variations if needed
};

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
  const handleLogin = () => {
    setShowAuth(true); // Show the authentication component
  };
  
  if (!session) {
    if (showAuth) {
      return (
        <div style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Auth 
          supabaseClient={supabase} 
          appearance={{ 
            theme: customTheme,
            variables: {
              default: {
                colors: {
                  brand: 'red',
                  brandAccent: 'darkred',
                },
              },
            },
           }} 
          providers={["google"]} />
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