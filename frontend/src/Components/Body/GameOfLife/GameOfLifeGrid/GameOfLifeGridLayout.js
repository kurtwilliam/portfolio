import styled from "styled-components";

const GameOfLifeGridLayout = styled.div`
  width: 100%;
  height: 84vh;
  display: flex;
  flex-direction: column;
  align-self: center;

  cursor: ${props => (props.cursorAction === "grab" ? "grab" : "pointer")};
`;

export default GameOfLifeGridLayout;
