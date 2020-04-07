import styled from "styled-components";

const GameOfLifeShapesLayout = styled.div`
  display: flex;

  .gol__shapes {
    &--shape {
      display: flex;
      flex-direction: column;

      &__square {
        width: 6px;
        height: 6px;
        border-radius: 1px;
        background: white;
      }

      &__square {
        width: 6px;
        height: 6px;
        border-radius: 1px;
        background: transparent;
      }
    }

    &--row {
      display: flex;
    }

    &--row {
      display: flex;
    }
  }
`;

export default GameOfLifeShapesLayout;
