import React from "react";
import { MenuButton } from "../styles";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Spotlight = () => {
  return (
    <MenuButton>
      <MagnifyingGlassIcon width={18} height={18} />
    </MenuButton>
  );
};

export default Spotlight;
