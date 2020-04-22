import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8vh;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: rgb(100, 100, 100);
  z-index: 1000;

  .gol__settings--container {
    display: flex;
    justify-content: center;
    // flex-direction: column;
    align-items: center;
  }

  .gol__settings--setting {
    display: flex;
    flex-direction: column;
    margin-left: 12px;

    input {
      cursor: pointer;
    }

    input[type="range"] {
      cursor: pointer;
      height: 8px;
    }
    input[type="range"]::-webkit-slider-thumb,
    input[type="range"]::-moz-range-thumb,
    input[type="range"]::-ms-thumb {
      height: 8px;
      width: 8px;
    }
  }

  button {
    background: transparent;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    color: white;
    cursor: pointer;
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
