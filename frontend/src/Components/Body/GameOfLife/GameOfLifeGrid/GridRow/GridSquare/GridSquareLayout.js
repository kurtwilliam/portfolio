import styled from "styled-components";

const GridSquare = styled.div`
  width: ${props => props.gridSquareSize}px;
  height: ${props => props.gridSquareSize}px;
  border: 1px solid black;

  &.alive {
    background: green;
  }
  &.dead {
    background: grey;
  }
`;

export default GridSquare;
