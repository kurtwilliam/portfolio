import styled from "styled-components";

const GameOfLifeGridContainer = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth}vw;
  left: ${p => p.theme.golBorderWidth}vw;
  bottom: ${p => p.theme.golBorderWidth}vw;
  width:calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 25vw);
  // height: calc(100vh - ${p => p.theme.golBorderWidth * 2}vw);
  overflow: hidden;
  max-width: 100%;

  background: ${p => p.theme.golOffWhite};
`;

export default GameOfLifeGridContainer;
