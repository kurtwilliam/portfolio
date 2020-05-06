import styled from "styled-components";

const GameOfLifeLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${p => p.theme.golWhite};
  font-family: "Roboto", sans-serif;

  & * {
    font-family: inherit;
  }
`;

export default GameOfLifeLayout;
