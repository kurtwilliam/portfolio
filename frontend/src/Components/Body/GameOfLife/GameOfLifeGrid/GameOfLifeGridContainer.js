import styled from "styled-components";

const GameOfLifeGridContainer = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth};
  left: ${p => p.theme.golBorderWidth};
  bottom: ${p => p.theme.golBorderWidth};
  width: 72vw;
  // height: calc(100vh - 2vw);
  overflow: hidden;
  max-width: 100%;

  background: ${p => p.theme.golOffWhite};
`;

export default GameOfLifeGridContainer;
