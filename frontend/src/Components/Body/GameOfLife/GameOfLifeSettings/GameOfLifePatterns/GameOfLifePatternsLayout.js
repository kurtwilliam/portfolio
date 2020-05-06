import styled from "styled-components";

const GameOfLifePatternsLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid ${p => p.theme.golOffWhiteDark};
  padding: 8px;

  span {
    color: black;
  }

  .gol__patterns {
    width: 100%;

    &.hidden {
      .gol__patterns--container {
        max-height: 0;
      }
    }
    &--container {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      max-height: auto;
      overflow-y: scroll;
      transition: all 200ms;

      &::-webkit-scrollbar {
        width: 10px;
        position: relative;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
        // background:${p => p.theme.golPrimary3};
        // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${p => p.theme.golOffWhite};
        // border: 2px solid ${p => p.theme.golWhiteDark} inset;
      }
    }

    &--settings {
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        outline:none;
        background: transparent;
        background-repeat: no-repeat;
        background-color:${p => p.theme.golPrimary3};
        background-image: url("data:image/svg+xml;utf8,<svg fill='${p =>
          p.theme
            .golOffWhite}' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-position-x: 100%;
        background-position-y: 50%;
        border: 1px solid #dfdfdf;
        border-radius:50px;
        text-transform:capitalize;
        padding:2px 24px 2px 4px;
        // padding-right:24px;
        border:2px solid ${p => p.theme.golOffWhite};
        // background:${p => p.theme.golPrimary3};
        color:${p => p.theme.golOffWhite};
        display:flex;
        justify-content:center;

        &:focus {

          option {
            background:${p => p.theme.golOffWhite};
            color:${p => p.theme.golBlack};
            text-transform:capitalize;

            &:hover {
              background:${p => p.theme.golOffWhiteDarker};
            }
          }
          
        }

        option:hover {
          background:${p => p.theme.golPrimary3};
        }
      }

      & > span {
        font-size: 1.4rem;
        color: ${p => p.theme.golOffWhite};
        text-transform: capitalize;
        // font-size: 1rem;
        // position: absolute;
        // left: 8px;
        // top: -7px;
        // font-weight: bold;
        // transform: translate(0, -50%); // transform wonky with text height
        // padding: 0 4px;
        // background: ${p => p.theme.golBlack};
      }
    }

    &--pattern {
      border-bottom: 1px solid ${p => p.theme.golOffWhiteDark};
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      padding: 2px;
      border-left: 2px solid transparent;
      font-size: 1.2rem;

      &:first-of-type {
        cursor: inherit;
        &:hover{border-left: 2px solid transparent;}

        span {
          font-weight: bold;
        }
      }

      &:last-of-type {
        border-bottom: none;
      }

      div {
        position: relative;
        display: flex;
        justify-content: space-between;
        transition: all 120ms;
      }

      &:hover {
        border-left: 2px solid ${p => p.theme.golOffWhiteDark};
      }

      &.selected {
        border-left: 2px solid ${p => p.theme.golPrimary3};

        .gol__patterns--pattern__hidden {
          max-height: 100px;
        }
      }

      span {
        display: block;
        color: ${p => p.theme.golOffWhiteDark};
        font-size: 1.2rem;

        &:first-of-type {
          color: ${p => p.theme.golOffWhite};
          font-size: 1.4rem;
          text-transform: capitalize;
        }
      }
      &__hidden {
        overflow: hidden;
        max-height: 0;

        span {
          font-size: 1.2rem !important;
        }
      }
    }

    // &.selected,
    // &:hover {
    //   background: rgba(100, 100, 100, 1);
    //   color: white;

    //   span,
    //   &.cancel {
    //     color: rgba(220, 220, 220, 1);
    //   }
    // }

    // position: relative;
    // display: flex;
    // justify-content: space-between;
    // align-items: center;
    // cursor: pointer;
    // padding: 4px 8px;
    // width: auto;
    // border-bottom: 1px solid rgba(100, 100, 100, 1);
    // font-size: 1.2rem;

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
    // }

    // &--row {
    //   display: flex;
    // }

    // &--row {
    //   display: flex;
    // }

    // &--type {
    //   &__Gun {
    //     background: green;
    //   }
    //   &__SpaceShip {
    //     background: maroon;
    //   }
    //   &__Oscillator {
    //     background: yellow;
    //   }
    //   &__Methuselah {
    //     background: lightblue;
    //   }
    //   &__StillLife {
    //     background: black;
    //   }
    //   &__Puffer {
    //     background: yellow;
    //   }
    //   &__Agar {
    //     background: brown;
    //   }
    // }
  }
`;

export default GameOfLifePatternsLayout;
