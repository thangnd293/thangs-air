import { useDesktopStore } from "@/stores/desktop";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useShallow } from "zustand/react/shallow";
import AppIcon from "./AppIcon";

const SwitchApps = () => {
  const { currentAppConnext, openApp } = useDesktopStore(
    useShallow((state) => ({
      currentAppConnext: state.currentAppConnext,
      openApp: state.openApp,
    }))
  );

  const handleSelect = useCallback(
    (index: number) => {
      const currentApp = currentAppConnext[index];

      if (currentApp) openApp(currentApp.id);
    },
    [currentAppConnext, openApp]
  );

  const { isVisible, currentIndex, setCurrentIndex } = useSwitchAppsState({
    maxLength: currentAppConnext.length,
    onSelect: handleSelect,
  });

  if (!isVisible) return null;

  return (
    <SwitchAppContainer>
      {currentAppConnext.map((app, index) => (
        <AppIcon
          key={app.id}
          shortcut={app.shortcut}
          isSelected={currentIndex === index}
          onSelect={() => setCurrentIndex(index)}
        />
      ))}
    </SwitchAppContainer>
  );
};

export default SwitchApps;

interface UseSwitchAppsStateArgs {
  onSelect: (index: number) => void;
  maxLength: number;
}
const useSwitchAppsState = ({
  onSelect,
  maxLength,
}: UseSwitchAppsStateArgs) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!maxLength) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "q" && e.altKey) {
        const increment = isVisible ? 1 : 0;
        setIsVisible(true);

        setCurrentIndex((prev) => {
          return (prev + increment) % maxLength;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [maxLength, isVisible]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Alt") {
        setIsVisible(false);
        onSelect(currentIndex);

        // Reset index to start
        setCurrentIndex(0);
      }
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentIndex, onSelect]);

  return { isVisible, currentIndex, setCurrentIndex } as const;
};

const SwitchAppContainer = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  background-color: #f9f9f9;
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid #f9f9f9;
`;
