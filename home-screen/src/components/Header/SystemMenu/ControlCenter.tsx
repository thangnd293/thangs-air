import { ControlCenterIcon } from "@/assets/icons";
import React from "react";
import { MenuButton } from "../styles";

const ControlCenter = () => {
  return (
    <MenuButton>
      <ControlCenterIcon width={14} height={14} color="white" />
    </MenuButton>
  );
};

export default ControlCenter;
