import React, { useState } from "react";
import Providers from "./components/Providers";
import MenuBar from "./components/MenuBar";
import Header from "./components/Header";
import styled from "styled-components";

const App = () => {
  const [count, setCount] = useState(1);

  return (
    <Providers>
      <Container>
        <Header />
        <Content id="home-view">
          <button onClick={() => setCount(count + 1)}>Count: {count}</button>
          <MenuBar />
        </Content>
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

const Content = styled.div`
  flex: 1;
  background-color: pink;
`;
