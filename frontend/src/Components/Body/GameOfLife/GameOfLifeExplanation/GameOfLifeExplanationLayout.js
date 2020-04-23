import styled from "styled-components";

const GameOfLifeExplanationLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;

  .gol__explanation {
    &--modal {
      max-width: 90vw;
      max-height: 90vh;
      min-width: 20vw;
      min-height: 20vh;
      background: black;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
    }
  }
`;

export default GameOfLifeExplanationLayout;
