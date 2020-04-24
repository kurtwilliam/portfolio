import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth};
  right: ${p => p.theme.golBorderWidth};
  bottom: ${p => p.theme.golBorderWidth};
  margin-left: ${p => p.theme.golBorderWidth};
  width: 25vw;
  color: white;
  display: flex;
  flex-direction: column;
  // padding: 12px;
  background: rgb(100, 100, 100);
  z-index: 1000;

  .gol__settings--container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    max-width: 768px;
    max-height: 100%;
    padding: 16px;
  }

  .gol__settings--setting {
    display: flex;
    flex-direction: column;
    // margin-left: 12px;

    input {
      cursor: pointer;
    }

    input[type="range"] {
      cursor: pointer;
      height: 8px;
      -webkit-appearance: none;
      width: 100%;
      background: transparent;

      &:focus {
        outline: none;
      }
    }
    input[type="range"]::-ms-track {
      width: 100%;
      cursor: pointer;

      /* Hides the slider so custom styles can be added */
      background: transparent;
      border-color: transparent;
      color: transparent;
    }
    input[type="range"]::-webkit-slider-thumb {
      height: 8px;
      width: 8px;
      // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      // border: 1px solid #000000;
    }
    input[type="range"]::-moz-range-thumb {
      height: 8px;
      width: 8px;
      // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      // border: 1px solid #000000;
    }
    input[type="range"]::-ms-thumb {
      height: 8px;
      width: 8px;
      // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      // border: 1px solid #000000;
    }

    input[type="range"]::-webkit-slider-runnable-track,
    input[type="range"]::-moz-range-track {
      height: 8px;
      width: 100%;
      background: red;
      border-radius: 10px;
    }
    input[type="range"]:focus::-webkit-slider-runnable-track {
    }
    &__radio {
      font-size: initial;
    }
  }

  button {
    // background: transparent;
    // border: none;
    // border-radius: 4px;
    // padding: 4px 8px;
    // color: white;
    // cursor: pointer;
  }

  button.pause {
    width: 28px;
    height: 28px;
    border-style: solid;
    border-width: 14px 0 14px 28px;
    box-sizing: border-box;
    background: transparent;
    border-radius: 0;
    padding: 0;
    border-color: transparent transparent transparent #202020;
    // transition: 25ms all ease;
    cursor: pointer;

    &.paused {
      width: 28px;

      border-style: double;
      border-width: 0 0 0 28px;
    }
  }
`;

export default GameOfLifeSettingsLayout;
