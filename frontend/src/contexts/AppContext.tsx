import React, { ReactNode, useContext } from "react";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

interface AppContextType {
  showToast: (toastMessage: ToastMessage) => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => {
          console.log(toastMessage);
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  return context as AppContextType;
}
