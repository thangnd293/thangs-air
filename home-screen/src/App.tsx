import React from "react";
import Desktop from "./components/Desktop";
import Header from "./components/Header";
import SwitchApps from "./components/SwitchApps";
import styled from "styled-components";
import { images } from "./components/Images";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <Desktop />
      <SwitchApps />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: lightblue url(${images.wallpaper}) no-repeat fixed center;
`;

export default App;
