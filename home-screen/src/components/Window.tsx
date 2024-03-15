import React, { ReactNode } from "react";
import { Rnd } from "react-rnd";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0",
} as const;

interface WindowProps {
  children: ReactNode;
}

const Window: React.FC<WindowProps> = ({ children }) => {
  return (
    <Rnd
      style={style}
      bounds="#home-view"
      default={{
        x: document.body.clientWidth / 2,
        y: document.body.clientHeight / 2,
        width: 200,
        height: 200,
      }}
    >
      {children}
    </Rnd>
  );
};

export default Window;
