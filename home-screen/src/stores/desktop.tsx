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

export interface CollapseApp extends App {
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
  collapseList: CollapseApp[];
  currentApp: App | null;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  collapseApp: (app: CollapseApp) => void;
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
      component: <Reminder />,
    },
  ],
  openAppList: [],
  collapseList: [],
  currentApp: null,
  openApp: (id: string) => {
    const { appList, currentApp, collapseList, openAppList } = get();

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
      set({ openAppList: [...openAppList, app] });
    }

    // If the app is open, bring it to the front
    if (app) {
      set({ currentApp: app });
    }

    // If the app is collapsed, remove it from the collapsed list
    if (app && app.isCollapsed) {
      set({ collapseList: collapseList.filter((app) => app.id !== id) });
      set({
        openAppList: openAppList.map((app) =>
          app.id === id ? { ...app, isCollapsed: true } : app
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
  collapseApp: (app: CollapseApp) => {
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
