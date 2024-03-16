import React from "react";
import styled from "styled-components";
import Desktop from "./components/Desktop";
import MenuBar from "./components/MenuBar";

const App = () => {
  return (
    <Container>
      <MenuBar />
      <Desktop />
    </Container>
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
