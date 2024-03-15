import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface WindowContext {
  activeWindow: string;
  onActiveWindow: (name: string) => void;
}

interface WindowProviderProps {
  children: ReactNode;
}

const windowContext = createContext<WindowContext | null>(null);

const WindowProvider: React.FC<WindowProviderProps> = ({ children }) => {
  const [activeWindow, setActiveWindow] = useState("");

  const onActiveWindow = useCallback((window: string) => {
    setActiveWindow(window);
  }, []);

  return (
    <windowContext.Provider
      value={{
        activeWindow,
        onActiveWindow,
      }}
    >
      {children}
    </windowContext.Provider>
  );
};

export const useActiveWindow = () => {
  const context = useContext(windowContext);

  if (!context) {
    throw new Error("useActiveWindow must be used within a WindowProvider");
  }

  return context;
};

export default WindowProvider;
