import styled from "styled-components";

const GameOfLifePatternsLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(200, 200, 200, 1);
  width: 100%;
  height: 100%;
  padding: 8px;

  span {
    color: black;
  }

  .gol__patterns {
    &--container {
      display: flex;
      flex-wrap: wrap;
      align-items:center;
      width: 100%;
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
      width:auto;
      height:auto;
      background: ${p => p.theme.golOffWhite};
      border: 1px solid ${p => p.theme.golOffWhite};
      display:flex;
      // flex-wrap:wrap;
      flex-direction:column;
      cursor:pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);

      &__row {
        display:flex;
        justify-content:flex-start
        align-items:flex-start;
      }
      &__col {
        width:5px;
        height:5px;
        background: ${p => p.theme.golOffWhite};
        border: 1px solid ${p => p.theme.golOffWhite};

        &.alive {
          background: ${p => p.theme.golBlack};
        }
      }

      &.selected {
        
      }

      // position: relative;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // cursor: pointer;
      // padding: 4px 8px;
      // width: auto;
      // border-bottom: 1px solid rgba(100, 100, 100, 1);
      // font-size: 1.2rem;

      // &.selected,
      // &:hover {
      //   background: rgba(100, 100, 100, 1);
      //   color: white;

      //   span,
      //   &.cancel {
      //     color: rgba(220, 220, 220, 1);
      //   }
      // }

      // span {
      //   color: #454545;
      //   font-size: 1rem;
      //   height: 1rem;
      // }

      // &.cancel {
      //   color: #454545;
      //   font-size: 1.2rem;
      // }

      // &.Gun {
      //   border-left: 4px solid green;
      //   border: 1px solid green;
      // }
      // &.SpaceShip {
      //   border-left: 4px solid maroon;
      //   border: 1px solid maroon;
      // }
      // &.Oscillator {
      //   border-left: 4px solid yellow;
      //   border: 1px solid yellow;
      // }
      // &.Methuselah {
      //   border-left: 4px solid lightblue;
      //   border: 1px solid lightblue;
      // }
      // &.StillLife {
      //   border-left: 4px solid black;
      //   border: 1px solid black;
      // }
      // &.Puffer {
      //   border-left: 4px solid yellow;
      //   border: 1px solid yellow;
      // }
      // &.Agar {
      //   border-left: 4px solid brown;
      //   border: 1px solid brown;
      // }

      // &__square {
      //   width: 6px;
      //   height: 6px;
      //   border-radius: 1px;
      //   margin: 1px;
      // }

      // &__filled {
      //   background: white;
      // }

      // &__empty {
      //   background: transparent;
      // }
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
