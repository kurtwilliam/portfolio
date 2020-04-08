import styled from "styled-components";

const GameOfLifeShapesLayout = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  // flex-direction: column;
  height: 8vh;
  background: rgba(100, 100, 100, 0.4);
  padding: 4px 8px;
  overflow: scroll;
  transition: bottom 200ms;

  span {
    color: white;
  }

  &.hidden {
    color: black;
    bottom: -8vh;
  }

  .gol__shapes {
    &--shape {
      display: flex;
      flex-direction: column;
      background: black;
      margin: 0px 4px;
      cursor: pointer;
      padding: 4px;

      &.selected {
        background: blue;
      }

      &__square {
        width: 6px;
        height: 6px;
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
