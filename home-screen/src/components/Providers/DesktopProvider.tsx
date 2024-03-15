import React, { createContext, useCallback, useState } from "react";
import { images } from "../Images";

export interface App {
  id: string;
  name: string;
  component: React.ReactNode;
  shortcut: string;
  isOpen?: boolean;
  isCollapsed?: boolean;
}

interface DesktopContext {
  apps: App[];
  currentApp: App | null;
  collapseApps: App[];
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  collapseApp: (app: App) => void;
}

const DesktopContext = createContext<DesktopContext | null>(null);

export const useDesktopContext = () => {
  const state = React.useContext(DesktopContext);

  if (!state) {
    throw new Error(
      "useDesktopContext must be used within DesktopContextProvider"
    );
  }
  return state;
};

interface DesktopProviderProps {
  children: React.ReactNode;
}

const Notes = () => {
  console.log("Rendering Notes");
  return <div>Notes</div>;
};

const Reminder = () => {
  console.log("Rendering Reminder");

  return <div>Reminder</div>;
};

const DesktopProvider: React.FC<DesktopProviderProps> = ({ children }) => {
  const [appList, setAppList] = useState<App[]>(() => [
    {
      id: "1",
      name: "Notes",
      shortcut: images.notes,
      component: <Notes />,
    },
    {
      id: "2",
      name: "Reminder",
      shortcut: images.reminder,
      component: <Reminder />,
    },
  ]);

  const [collapseApps, setCollapseApps] = useState<App[]>([]);

  const [currentApp, setCurrentApp] = useState<App | null>(null);

  const openApp = useCallback(
    (id: string) => {
      const appIndex = appList.findIndex((app) => app.id === id);
      const collapseIndex = collapseApps.findIndex((app) => app.id === id);
      const isCollapsed = collapseIndex !== -1;

      if (isCollapsed)
        setCollapseApps((prev) => prev.filter((app) => app.id !== id));

      if (appList[appIndex] !== currentApp) {
        const newCurrentApp = Object.assign({}, appList[appIndex]);
        newCurrentApp.isOpen = true;

        if (isCollapsed) newCurrentApp.isCollapsed = false;

        setCurrentApp(newCurrentApp);
        setAppList((prev) => {
          const newList = [...prev];
          newList[appIndex] = newCurrentApp;
          return newList;
        });
      }
    },
    [appList, currentApp]
  );

  const closeApp = useCallback((id: string) => {
    setAppList((prev) => {
      const newList = prev.map((app) => {
        if (app.id === id) {
          return {
            ...app,
            isOpen: false,
          };
        }
        return app;
      });
      return newList;
    });

    setCurrentApp(null);
  }, []);

  const collapseApp = useCallback(
    (app: App) => {
      setCollapseApps((prev) => {
        const newList = [...prev, app];
        return newList;
      });

      setAppList((prev) => {
        const newList = prev.map((a) => {
          if (a.id === app.id) {
            return {
              ...a,
              isCollapsed: true,
            };
          }
          return a;
        });

        return newList;
      });
    },
    [currentApp]
  );

  return (
    <DesktopContext.Provider
      value={{
        apps: appList,
        currentApp,
        collapseApps,
        openApp,
        closeApp,
        collapseApp,
      }}
    >
      {children}
    </DesktopContext.Provider>
  );
};

export default DesktopProvider;
