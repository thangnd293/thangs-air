import React, { useState } from "react";
import { MenuButton } from "../styles";

const NotificationCenter = () => {
  return (
    <MenuButton>
      <DateTime />
    </MenuButton>
  );
};

export default NotificationCenter;

const DateTime = () => {
  const [time, setTime] = useState(new Date());

  setInterval(() => {
    setTime(new Date());
  }, 1000);

  return <>{time.toLocaleDateString()}</>;
};
