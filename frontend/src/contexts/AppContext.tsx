import React, { ReactNode, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface AppContextType {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Fetch data from the server
  const { isError } = useQuery({
    queryKey: ["validate-token"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  console.log("====================================");
  console.log(isError);
  console.log("====================================");

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: !isError, // Mean user is logged in if no error
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  return context as AppContextType;
}
