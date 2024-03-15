import React from "react";
import DesktopProvider from "./DesktopProvider";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <DesktopProvider>{children}</DesktopProvider>;
};

export default Providers;
