import React, { createContext, useState } from "react";
import App1 from "../App1";

interface MenuBarContext {}

const menuBarContext = createContext<any>(null);

interface MenuBarProviderProps {
  children: React.ReactNode;
}

const initState = new Map<
  string,
  {
    name: string;
    component: React.ReactNode;
    isOpen: boolean;
  }
>([
  [
    "reminder",
    {
      name: "Reminder",
      component: <div>Reminder</div>,
      isOpen: false,
    },
  ],
  [
    "todo",
    {
      name: "Todo",
      component: <div>Todo</div>,
      isOpen: false,
    },
  ],
  [
    "notes",
    {
      name: "Notes",
      component: <div>Notes</div>,
      isOpen: false,
    },
  ],
  [
    "app1",
    {
      name: "App1",
      component: <App1 />,
      isOpen: false,
    },
  ],
]);

export const useMenuBarContext = () => {
  const context = React.useContext(menuBarContext);
  if (!context) {
    throw new Error("useMenuBarContext must be used within a MenuBarProvider");
  }
  return context;
};

const MenuBarProvider: React.FC<MenuBarProviderProps> = ({ children }) => {
  const [appState, setAppState] = useState(initState);
  const [appList, setAppList] = useState(appState.values);

  return (
    <menuBarContext.Provider value={{ appList }}>
      {children}
    </menuBarContext.Provider>
  );
};

export default MenuBarProvider;
