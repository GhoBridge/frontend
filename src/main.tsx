import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { WagmiConfig, createConfig } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultConfig,
} from "connectkit";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: import.meta.env.VITE_ALCHEMY_ID, // or infuraId
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_Id || "",

    // Required
    appName: "GHO Bridge",

    // Optional
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

(window as any).global = window;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <ConnectKitProvider>
        <App />
        <ConnectKitButton />
      </ConnectKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
