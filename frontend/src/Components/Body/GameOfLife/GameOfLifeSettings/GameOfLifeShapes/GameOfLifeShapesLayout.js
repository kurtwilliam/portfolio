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
  max-height: 92vh;
  min-width: 225px;
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

      &.Gun {
        border-left: 4px solid green;
      }
      &.SpaceShip {
        border-left: 4px solid maroon;
      }
      &.Oscillator {
        border-left: 4px solid yellow;
      }
      &.Methuselah {
        border-left: 4px solid lightblue;
      }
      &.StillLife {
        border-left: 4px solid black;
      }
      &.Puffer {
        border-left: 4px solid yellow;
      }
      &.Agar {
        border-left: 4px solid brown;
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

    &--type {
      &__Gun {
        background: green;
      }
      &__SpaceShip {
        background: maroon;
      }
      &__Oscillator {
        background: yellow;
      }
      &__Methuselah {
        background: lightblue;
      }
      &__StillLife {
        background: black;
      }
      &__Puffer {
        background: yellow;
      }
      &__Agar {
        background: brown;
      }
    }
  }
`;

export default GameOfLifeShapesLayout;
