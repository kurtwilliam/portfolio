import styled from "styled-components";

const GameOfLifeShapesLayout = styled.div`
  position: absolute;
  left: 0;
  top: 8vh;
  bottom: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 84vh;
  background: rgba(100, 100, 100, 0.2);
  padding: 4px 8px;
  // overflow: scroll;
  transition: left 200ms;

  &.hidden {
    color: black;
    left: -100%;
  }

  .gol__shapes {
    &--shape {
      display: flex;
      flex-direction: column;
      background: black;
      margin: 4px 0px;
      cursor: pointer;

      &.selected {
        background: blue;
      }

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
