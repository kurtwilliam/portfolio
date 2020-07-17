import styled from "styled-components";
import Chunk from "../../shared/Chunk";

const GameOfLifeChunkLayout = styled(Chunk)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  &:hover {
    box-shadow: none;
    cursor: pointer;
  }

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
  }
`;

export default GameOfLifeChunkLayout;
