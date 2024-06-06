import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../../../constants";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import "./styles.css";

const AuthModal = () => {
  return (
    <div className="auth-modal-container">
      <div className="auth-modal-content">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "green",
                  brandAccent: "green",
                  inputBorder: "white",
                  inputBackground: "white",
                  inputBorderHover: "white",
                  inputBorderFocus: "white",
                  inputText: "black",
                  inputLabelText: "white",
                  inputPlaceholder: "black",
                  anchorTextColor: "white",
                  anchorTextHoverColor: "white",
                },
              },
            },
          }}
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default AuthModal;
