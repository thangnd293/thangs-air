import React from "react";
import styled from "styled-components";
import Desktop from "./components/Desktop";
import Header from "./components/Header";
import SwitchApps from "./components/SwitchApps";
import { images } from "./assets/images";
import "@utils/prototype";

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
  background-size: cover;
`;

export default App;
