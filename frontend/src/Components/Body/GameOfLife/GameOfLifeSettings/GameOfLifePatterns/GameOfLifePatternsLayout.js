import styled from "styled-components";

const GameOfLifePatternsLayout = styled.div`
  position: relative;
  display: flex;
  background: rgba(200, 200, 200, 1);
  max-height: 10vh;
  width: 100%;
  height: 100%;

  span {
    color: black;
  }

  .gol__patterns {
    &--scroll {
      display: flex;
      flex-wrap: wrap;
      overflow-y: scroll;
      width: 85%;
    }
    &--settings {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: space-around;
      width: 15%;
      padding: 4px;

      span {
        cursor: pointer;
      }
    }

    &--pattern {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      padding: 4px 8px;
      width: 50%;
      border-bottom: 1px solid rgba(100, 100, 100, 1);
      font-size: 1.2rem;

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
        font-size: 1rem;
        height: 1rem;
      }

      &.cancel {
        color: #454545;
        font-size: 1.2rem;
      }

      &.Gun {
        border-left: 4px solid green;
        border: 1px solid green;
      }
      &.SpaceShip {
        border-left: 4px solid maroon;
        border: 1px solid maroon;
      }
      &.Oscillator {
        border-left: 4px solid yellow;
        border: 1px solid yellow;
      }
      &.Methuselah {
        border-left: 4px solid lightblue;
        border: 1px solid lightblue;
      }
      &.StillLife {
        border-left: 4px solid black;
        border: 1px solid black;
      }
      &.Puffer {
        border-left: 4px solid yellow;
        border: 1px solid yellow;
      }
      &.Agar {
        border-left: 4px solid brown;
        border: 1px solid brown;
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

export default GameOfLifePatternsLayout;
