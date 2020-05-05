import styled from "styled-components";
import Chunk from "../../shared/Chunk";

const GameOfLifeChunkLayout = styled(Chunk)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${p => p.theme.golOffWhite};

  div {
    width: 20px;
    height: 20px;
    margin: 2px;
    background: ${p => p.theme.golBlack};
  }

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GameOfLifeChunkLayout;
