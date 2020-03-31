import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .gol__settings--range {
    display: flex;
    flex-direction: column;
  }
`;

export default GameOfLifeSettingsLayout;
