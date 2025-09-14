// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./components/UserProvider";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// Diagnostic check for duplicate React
// We add React to the window object to compare it later.
// Note: This relies on your bundler (like Vite or Webpack) and may not
// detect all cases, but it is a very common and effective check.
if (window.React1 && window.React1 !== React) {
  console.error("Multiple React instances detected!");
  console.log("React instance in main.jsx:", React.version);
  console.log("Other React instance:", window.React1.version);
} else {
  console.log("No duplicate React instances detected in main.jsx.");
}
window.React1 = React;


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrapping the App with BrowserRouter to provide routing context */}
    <BrowserRouter>

      {/* Wrapping the App with UserProvider to provide user context */}
      <UserProvider>

        <App />

      </UserProvider>

    </BrowserRouter>

  </React.StrictMode>
);
