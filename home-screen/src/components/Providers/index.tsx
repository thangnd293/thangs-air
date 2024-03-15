import React from "react";
import WindowProvider from "./WindowProvider";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <WindowProvider>{children}</WindowProvider>;
};

export default Providers;
