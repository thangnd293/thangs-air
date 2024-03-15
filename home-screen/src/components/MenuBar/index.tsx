import React, { useState } from "react";
import styled from "styled-components";
import App1 from "../App1";

const MenuBar = () => {
  const [appState, setAppState] = useState(initState);
  const [appList, setAppList] = useState(() => Array.from(appState.values()));
  let active = "";

  const onActiveWindow = (name: string) => {
    active = name;
    setAppState(
      (prev) =>
        new Map(prev.set(name, { ...prev.get(name), isOpen: true }).entries())
    );
  };

  console.log("appList", active, appList);

  return (
    <Wrapper>
      {appList.map((app: any) => (
        <Shortcut
          key={app.name}
          onClick={() => {
            console.log(app);
            onActiveWindow(app.name);
          }}
        >
          {app.name}
        </Shortcut>
      ))}
    </Wrapper>
  );
};

export default MenuBar;

const initState = new Map<
  string,
  {
    name: string;
    component: React.ReactNode;
    isOpen: boolean;
  }
>([
  [
    "reminder",
    {
      name: "reminder",
      component: <div>Reminder</div>,
      isOpen: false,
    },
  ],
  [
    "todo",
    {
      name: "todo",
      component: <div>Todo</div>,
      isOpen: false,
    },
  ],
  [
    "notes",
    {
      name: "notes",
      component: <div>Notes</div>,
      isOpen: false,
    },
  ],
  [
    "app1",
    {
      name: "app1",
      component: <App1 />,
      isOpen: false,
    },
  ],
]);

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  padding: 14px;
  border-radius: 4px;
  background-color: antiquewhite;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Shortcut = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: cadetblue;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;
