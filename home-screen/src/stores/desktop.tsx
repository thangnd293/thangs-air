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
}

export interface MinimizedApp extends App {
  screenshot?: Promise<string>;
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

interface DesktopState {
  appList: App[];
  openAppList: App[];
  minimizeAppList: App[];
  currentAppConnext: App[];
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string, screenshot: MinimizedApp["screenshot"]) => void;
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
  minimizeAppList: [],
  currentAppConnext: [],
  openApp: (id) => {
    const { appList, openAppList } = get();

    const isOpen = openAppList.some((app) => app.id === id);
    const app = appList.find((app) => app.id === id);
    const newOpenApp: App = { ...app, isOpen: true };

    // If the app is already open, don't open it again
    if (!isOpen) {
      set({
        appList: appList.map((app) => (app.id === id ? newOpenApp : app)),
      });

      set({ openAppList: [...openAppList, newOpenApp] });
    } else {
      set((state) => ({
        minimizeAppList: state.minimizeAppList.filter((app) => app.id !== id),
      }));
    }

    // Bring it to the front
    set((state) => ({
      currentAppConnext: [
        newOpenApp,
        ...state.currentAppConnext.filter((app) => app.id !== id),
      ],
    }));
  },
  closeApp: (id) => {
    set((state) => ({
      appList: state.appList.map((app) =>
        app.id === id ? { ...app, isOpen: false, isMinimized: false } : app
      ),
      openAppList: state.openAppList.filter((app) => app.id !== id),
      currentAppConnext: state.currentAppConnext.filter((app) => app.id !== id),
      minimizeAppList: state.minimizeAppList.filter((app) => app.id !== id),
    }));
  },
  minimizeApp: (id, screenshot) => {
    const { openAppList } = get();

    const app = openAppList.find((app) => app.id === id);

    set((state) => ({
      currentAppConnext: state.currentAppConnext.filter((app) => app.id !== id),
      minimizeAppList: [
        ...state.minimizeAppList,
        { ...app, isMinimized: true, screenshot },
      ],
    }));
  },
}));
