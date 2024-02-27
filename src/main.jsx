import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextWrapper } from "./context/Auth.context.jsx";


const rootElement = document.getElementById("root");

const renderApp = () => {
  const root = createRoot(rootElement);

  root.render(
    <BrowserRouter>
      <React.StrictMode>
        <AuthContextWrapper>
          <App />
        </AuthContextWrapper>
      </React.StrictMode>
    </BrowserRouter>
  );
};

// Initial rendering
renderApp();
