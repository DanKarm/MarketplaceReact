import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./scss/_variables.scss"
import "./index.scss";

import App from "./App.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
);
