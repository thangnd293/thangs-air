import React from "react";
import styled from "styled-components";
import MenuBar from "./components/MenuBar";
import Desktop from "./components/Desktop";
import Providers from "./components/Providers";

const App = () => {
  return (
    <Providers>
      <Container>
        <MenuBar />
        <Desktop />
      </Container>
    </Providers>
  );
};

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
