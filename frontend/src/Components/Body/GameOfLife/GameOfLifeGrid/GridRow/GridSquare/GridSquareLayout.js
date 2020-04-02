import styled from "styled-components";

const GridSquare = styled.div`
  width: ${props => props.gridSquareSize}px;
  height: ${props => props.gridSquareSize}px;
  border: 1px solid rgb(24, 24, 26);
  border-radius: 4px;

  &.alive {
    background: rgb(114, 38, 38);
  }
  &.dead {
    background: rgb(51, 51, 51);
  }
`;

export default GridSquare;
