import { images } from "@/components/Images";
import React from "react";

import { create } from "zustand";

export interface App {
  id: string;
  name: string;
  component: React.ReactNode;
  shortcut: string;
  isOpen?: boolean;
  isCollapsed?: boolean;
}

const Notes = () => {
  console.log("Rendering Notes");
  return <div>Notes</div>;
};

const Reminder = () => {
  console.log("Rendering Reminder");

  return <div>Reminder</div>;
};

interface DesktopState {
  appList: App[];
  openAppList: App[];
  collapseList: App[];
  currentApp: App | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  collapseApp: (app: App) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  appList: [
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
  ],
  openAppList: [],
  collapseList: [],
  currentApp: null,
  openApp: (id: string) => {
    const { appList, currentApp, collapseList } = get();

    // If the app is already open, don't open it again
    if (currentApp?.id === id) return;

    const app =
      collapseList.find((app) => app.id === id) ??
      appList.find((app) => app.id === id);

    // If the app is not open, don't open it
    if (app && !app.isOpen) {
      set({
        appList: appList.map((app) =>
          app.id === id ? { ...app, isOpen: true } : app
        ),
      });
      set({ openAppList: [...get().openAppList, app] });
    }

    // If the app is open, bring it to the front
    if (app) {
      set({ currentApp: app });
    }

    // If the app is collapsed, remove it from the collapsed list
    if (app && app.isCollapsed) {
      set({ collapseList: get().collapseList.filter((app) => app.id !== id) });
      set({
        openAppList: [...get().openAppList, { ...app, isCollapsed: false }],
      });
    }
  },
  closeApp: (id: string) => {
    const { appList, openAppList, currentApp } = get();

    const app = appList.find((app) => app.id === id);

    if (app) {
      set({
        appList: appList.map((app) =>
          app.id === id ? { ...app, isOpen: false, isCollapsed: false } : app
        ),
      });
      set({ openAppList: openAppList.filter((app) => app.id !== id) });
      set({ collapseList: get().collapseList.filter((app) => app.id !== id) });
    }

    if (currentApp?.id === id) {
      set({ currentApp: null });
    }
  },
  collapseApp: (app: App) => {
    const { openAppList, collapseList, currentApp } = get();

    const appIndex = openAppList.findIndex((a) => a.id === app.id);

    if (appIndex !== -1) {
      const newOpenAppList = openAppList.map((a) =>
        a.id === app.id ? app : a
      );

      set({ openAppList: newOpenAppList });
    }

    set({ collapseList: [...collapseList, app] });

    if (currentApp?.id === app.id) {
      set({ currentApp: null });
    }
  },
}));
