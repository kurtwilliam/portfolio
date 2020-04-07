import styled from "styled-components";

const GameOfLifeShapesLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .gol__shapes {
    &--shape {
      display: flex;
      flex-direction: column;
      background: black;

      &__square {
        width: 10px;
        height: 10px;
        border-radius: 1px;
        margin: 1px;
      }

      &__filled {
        background: white;
      }

      &__empty {
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
