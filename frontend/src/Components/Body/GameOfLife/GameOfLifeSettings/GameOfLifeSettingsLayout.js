import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth}vw;
  right: ${p => p.theme.golBorderWidth}vw;
  bottom: ${p => p.theme.golBorderWidth}vw;
  margin-left: ${p => p.theme.golBorderWidth}vw;
  width: 25vw;
  color: white;
  display: flex;
  flex-direction: column;
  background: ${p => p.theme.golGrey};
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

    input {
      cursor: pointer;
    }

    &__container {
      position: relative;
      border: 2px solid ${p => p.theme.golOffWhite};
      padding: 8px;
      margin-bottom: 16px;
      min-width: 150px;
    }

    &__title {
      text-transform: uppercase;
      font-size: 1rem;
      position: absolute;
      left: 8px;
      top: -7px;
      // transform: translate(0, -50%); // transform wonky with text height
      padding: 0 4px;
      background: ${p => p.theme.golGrey};
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
      background: ${p => p.theme.golHighlight};
      border-radius: 10px;
    }
    input[type="range"]:focus::-webkit-slider-runnable-track {
    }
    &__radio {
      font-size: initial;
    }
  }

  // general styles
  button {
    width: 24px;
    height: 16px;
    line-height: 28px;
    font-size: 1.2rem;
    border-raidus: 40px;
    background: ${p => p.theme.golHighlight};
    border-radius: 50px;
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
