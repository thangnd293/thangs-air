import { images } from "@/components/Images";
import RemindersApp from "@/components/RemindersApp";
import React from "react";

import { create } from "zustand";

export interface App {
  id: string;
  name: string;
  component: React.ReactNode;
  shortcut: string;
  isOpen?: boolean;
  isMinimized?: boolean;
}

export interface MinimizedApp extends App {
  screenshot: Promise<string>;
}

const Notes = () => {
  console.log("Rendering Notes");
  return (
    <div>
      <img
        style={{ width: "100px", height: "100px" }}
        src="https://gamek.mediacdn.vn/thumb_w/640/133514250583805952/2020/7/7/photo-1-1594098002042331340775.jpg"
        alt=""
      />
    </div>
  );
};

const Reminder = () => {
  console.log("Rendering Reminder");

  return <div>Reminder</div>;
};

interface DesktopState {
  appList: App[];
  openAppList: App[];
  minimizeList: MinimizedApp[];
  currentApp: App | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (app: MinimizedApp) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  appList: [
    {
      id: "1",
      name: "Notes",
      shortcut: images.finder,
      component: <Notes />,
    },
    {
      id: "2",
      name: "Reminder",
      shortcut: images.reminders,
      component: <RemindersApp />,
    },
  ],
  openAppList: [],
  minimizeList: [],
  currentApp: null,
  openApp: (id: string) => {
    const { appList, currentApp, minimizeList, openAppList } = get();

    // If the app is already open, don't open it again
    if (currentApp?.id === id) return;

    const app =
      minimizeList.find((app) => app.id === id) ??
      appList.find((app) => app.id === id);

    // If the app is not open, don't open it
    if (app && !app.isOpen) {
      set({
        appList: appList.map((app) =>
          app.id === id ? { ...app, isOpen: true } : app
        ),
      });
      set({ openAppList: [...openAppList, app] });
    }

    // If the app is open, bring it to the front
    if (app) {
      set({ currentApp: app });
    }

    // If the app is minimized, remove it from the minimized list
    if (app && app.isMinimized) {
      set({ minimizeList: minimizeList.filter((app) => app.id !== id) });
      set({
        openAppList: openAppList.map((app) =>
          app.id === id ? { ...app, isMinimized: true } : app
        ),
      });
    }
  },
  closeApp: (id: string) => {
    const { appList, openAppList, currentApp } = get();

    const app = appList.find((app) => app.id === id);

    if (app) {
      set({
        appList: appList.map((app) =>
          app.id === id ? { ...app, isOpen: false, isMinimized: false } : app
        ),
      });
      set({ openAppList: openAppList.filter((app) => app.id !== id) });
      set({ minimizeList: get().minimizeList.filter((app) => app.id !== id) });
    }

    if (currentApp?.id === id) {
      set({ currentApp: null });
    }
  },
  minimizeApp: (app: MinimizedApp) => {
    const { openAppList, minimizeList, currentApp } = get();

    const appIndex = openAppList.findIndex((a) => a.id === app.id);

    if (appIndex !== -1) {
      const newOpenAppList = openAppList.map((a) =>
        a.id === app.id ? app : a
      );

      set({ openAppList: newOpenAppList });
    }

    set({ minimizeList: [...minimizeList, app] });

    if (currentApp?.id === app.id) {
      set({ currentApp: null });
    }
  },
}));
