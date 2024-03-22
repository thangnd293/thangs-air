import { images } from "@/assets/images";
import FinderApp from "@/components/FinderApp";
import NotesApp from "@/components/NotesApp";
import RemindersApp from "@/components/RemindersApp";
import React from "react";

import { create } from "zustand";

export interface App {
  id: string;
  name: string;
  component: React.ReactNode;
  shortcut: string;
  isOpen?: boolean;
  isFullscreen?: boolean;
}

export interface MinimizedApp extends App {
  screenshot?: Promise<string>;
}

interface DesktopState {
  appList: App[];
  openAppList: App[];
  minimizeAppList: App[];
  currentAppConnext: App[];
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string, screenshot: MinimizedApp["screenshot"]) => void;
  openFullscreen: (id: string) => void;
  exitFullscreen: (id: string) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
  appList: [
    {
      id: "1",
      name: "Finder",
      shortcut: images.finder,
      component: <FinderApp />,
    },
    {
      id: "2",
      name: "Reminder",
      shortcut: images.reminders,
      component: <RemindersApp />,
    },
    {
      id: "3",
      name: "Notes",
      shortcut: images.notes,
      component: <NotesApp />,
    },
  ],
  openAppList: [],
  minimizeAppList: [],
  currentAppConnext: [],
  openApp: (id) => {
    const { appList, openAppList, currentAppConnext } = get();

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

    if (currentAppConnext[0]?.id === id) return;

    // Bring it to the front
    set({
      currentAppConnext: [
        newOpenApp,
        ...currentAppConnext.filter((app) => app.id !== id),
      ],
    });
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
  openFullscreen: (id) => {
    const { openAppList } = get();

    const app = openAppList.find((app) => app.id === id);

    if (!app) return;

    const newApp = { ...app, isFullscreen: true };

    set((state) => ({
      openAppList: state.openAppList.map((app) =>
        app.id === newApp.id ? newApp : app
      ),
      currentAppConnext: [
        newApp,
        ...state.currentAppConnext.filter((app) => app.id !== newApp.id),
      ],
    }));
  },
  exitFullscreen: (id) => {
    set((state) => ({
      openAppList: state.openAppList.map((app) =>
        app.id === id ? { ...app, isFullscreen: false } : app
      ),
    }));
  },
}));
