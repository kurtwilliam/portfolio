import styled from "styled-components";

const GameOfLifeShapesLayout = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  align-items: space-between;
  // flex-wrap: wrap;
  background: rgba(200, 200, 200, 1);
  overflow: auto;
  min-height: min-content;

  // for sidebar
  // padding: 8px 4px;
  top: 8vh;
  bottom: 8vh;
  transition: left 200ms;
  flex-direction: column;
  max-height: 84vh;
  // overflow-y: scroll;

  &.hidden {
    // color: black;
    left: -100%;
  }

  // for bottom
  // transition: bottom 200ms;
  // padding: 4px 8px;
  // height: 8vh;
  // right: 0;
  // &.hidden {
  //   color: black;
  //   bottom: -8vh;
  // }

  span {
    color: black;
  }

  .gol__shapes {
    &--shape {
      position: relative;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      // background: black;
      // margin: 0px 4px;
      cursor: pointer;
      padding: 8px;
      width: 100%;
      border-bottom: 1px solid rgba(100, 100, 100, 1);

      &.selected,
      &:hover {
        background: rgba(100, 100, 100, 1);
        color: white;

        span,
        &.cancel {
          color: rgba(220, 220, 220, 1);
        }
      }

      span {
        color: #454545;
        font-size: 1.2rem;
      }

      &.cancel {
        color: #454545;
        font-size: 1.2rem;
      }

      &.gun {
        border-left: 4px solid green;
      }
      &.spaceship {
        border-left: 4px solid maroon;
      }
      &.oscillator {
        border-left: 4px solid yellow;
      }
      &.methuselah {
        border-left: 4px solid lightblue;
      }
      &.stillLife {
        border-left: 4px solid black;
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
