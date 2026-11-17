import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LanguageProvider from "./i18n/LanguageProvider.jsx";
import App from "./App.jsx";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/utilities.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
