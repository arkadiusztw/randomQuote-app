import React from "react";
import styled from "styled-components";
import Quote from "../components/quote/Quote";
const Main = () => {
  return (
    <Container>
      <Quote />
    </Container>
  );
};
export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
