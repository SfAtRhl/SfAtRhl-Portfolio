import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CharacterAnimationsProvider } from "./components/context/CharacterAnimations";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <CharacterAnimationsProvider>
        <App />
      </CharacterAnimationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
