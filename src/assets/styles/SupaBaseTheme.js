export const customAuthTheme = {
    default: {
      colors: {
        brand: '#ff416c', // Gradient pink button
        brandAccent: '#ff4b2b', // Gradient pink accent
        brandButtonText: 'white',
        inputBackground: '#333333', // Dark input fields background
        inputBorder: 'rgba(255, 255, 255, 0.2)', // Light-colored border for input fields
        text: 'white', // White text for inputs and buttons
        link: '#f4a261', // Color for "Sign up" and "Forgot your password?" links
        background: 'radial-gradient(circle, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%)', // Radial gradient background for the body
        buttonText: 'white', // Button text color
        buttonBackground: 'linear-gradient(to right, #ff416c, #ff4b2b)', // Gradient for the main action button
        buttonBackgroundHover: 'linear-gradient(to right, #ff4b2b, #ff416c)', // Gradient on hover for the main action button
      },
      radii: {
        button: '10px', // Rounded buttons matching input field radius
        input: '10px', // Rounded input fields
        card: '20px', // Rounded corners for the card/panel
      },
      shadows: {
        default: '0 4px 8px rgba(0,0,0,0.2)', // Enhanced shadow for depth
      },
      space: {
        small: '8px', // Small space for padding/margin
        medium: '15px', // Adjusted medium space to match input padding
        large: '40px', // Large space for padding/margin around the login panel
      },
      fonts: {
        body: '"Open Sans", sans-serif', // Font for the body text
      },
    },
    dark: {
      // ... additional dark theme styles, if different from the default
    },
    loginPage: {
      panel: {
        background: 'rgba(50, 50, 50, 0.85)', // Semi-transparent dark gray with frosted glass effect
        borderRadius: '20px', // Smoothly rounded corners for the panel
        shadow: '0 4px 8px rgba(0,0,0,0.2)', // Subtle shadow for a touch of depth
        padding: '40px', // Padding around the panel content
        maxWidth: '400px', // Max width of the panel for better layout control
        margin: 'auto', // Center the panel on the page
        backdropFilter: 'blur(10px)', // CSS property for frosted glass effect
      },
      // Additional specific styles for the login page can be added here
    },
    // ... more theme variations if needed
  };
  