import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import App from "./App.tsx";
import "./index.css";

// create a client
const queryClient = new QueryClient({
  defaultOptions: {
    /**
     * If we get an error, by default react-query will retry indefinitely,
     * the reason for this is:
     * pros: if server is down temporarily & back up itself.
     * cons: It's quite expensive so it will make a lot of requests from
     * the browser.
     */
    queries: {
      retry: 0, // set it to be off
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
