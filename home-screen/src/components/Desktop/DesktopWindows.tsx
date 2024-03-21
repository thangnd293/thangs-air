import { App, useDesktopStore } from "@/stores/desktop";
import Window from "@components/Window";
import React from "react";
import { useShallow } from "zustand/react/shallow";

const DesktopWindows = () => {
  const { currentApp, openAppList, currentAppConnext } = useDesktopStore(
    useShallow((state) => ({
      openAppList: state.openAppList,
      currentApp: state.currentAppConnext[0],
      currentAppConnext: state.currentAppConnext,
    }))
  );

  const calcStackIndex = (app: App) => {
    return (
      Math.abs(
        currentAppConnext.findIndex((a) => a.id === app.id) -
          currentAppConnext.length +
          1
      ) + 1
    );
  };

  return (
    <>
      {openAppList.map((app) => (
        <Window
          key={app.id}
          isFocus={currentApp?.id === app.id}
          stackIndex={calcStackIndex(app)}
          app={app}
        >
          {app.component}
        </Window>
      ))}
    </>
  );
};

export default DesktopWindows;
