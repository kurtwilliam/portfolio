import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth}vw;
  right: ${p => p.theme.golBorderWidth}vw;
  bottom: ${p => p.theme.golBorderWidth}vw;
  margin-left: ${p => p.theme.golBorderWidth}vw;
  width: 25vw;
  // color: white;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 1000;

  p,
  span,
  label,
  button,
  a,
  div {
    color: ${p => p.theme.golOffWhite};
    font-size: inherit;
  }

  .gol__settings--container {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    max-width: 768px;
    max-height: 100%;
    // padding: 16px;
  }

  .gol__settings--setting {
    display: flex;
    flex-direction: column;

    input {
      cursor: pointer;
    }

    &__container {
      position: relative;
      border: 2px solid ${p => p.theme.golOffWhiteDark};
      padding: 8px;
      margin-bottom: 16px;
      min-width: 106px;
    }

    &__title {
      text-transform: uppercase;
      font-size: 1rem;
      position: absolute;
      left: 8px;
      top: -7px;
      font-weight: bold;
      // transform: translate(0, -50%); // transform wonky with text height
      padding: 0 4px;
      background: ${p => p.theme.golBlack};
    }

    label {
      margin-bottom: 2px;
      font-size: 1.4rem;
    }

    label svg {
      color: ${p => p.theme.golOffWhite};
      margin-right: 4px;
    }

    &__rangeCont {
      display: flex;
      flex-direction: column;
    }

    &__button {
      flex-direction: row;
      align-items: center;
      margin-bottom: 8px;

      span {
        margin-left: 4px;
        font-size: 1.2rem;
        text-transform: uppercase;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }

    input[type="range"] {
      &,
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
      }
      cursor: pointer;
      height: 8px;
      -webkit-appearance: none;
      width: 100%;
      background: transparent;
      margin-bottom: 8px;

      &:focus {
        outline: none;
      }
      &::-ms-track {
        width: 100%;
        cursor: pointer;
        /* Hides the slider so custom styles can be added */
        background: transparent;
        border-color: transparent;
        color: transparent;
      }
      &::-webkit-slider-thumb {
        height: 8px;
        width: 8px;
        border: none;
        border-radius: 50%;
        background: ${p => p.theme.golOffWhite};
      }
      &::-moz-range-thumb {
        height: 8px;
        width: 8px;
        border: none;
        border-radius: 50%;
        background: ${p => p.theme.golOffWhite};
      }
      &::-ms-thumb {
        height: 8px;
        width: 8px;
        border: none;
        border-radius: 50%;
        background: ${p => p.theme.golOffWhite};
      }
      &::-webkit-slider-runnable-track {
        height: 8px;
        width: 100%;
        background: ${p => p.theme.golHighlight};
        border-radius: 10px;
      }
      &::-moz-range-track {
        height: 8px;
        width: 100%;
        background: ${p => p.theme.golHighlight};
        border-radius: 10px;
      }
      &:focus::-webkit-slider-runnable-track {
      }
    }
    &__radio {
      font-size: initial;

      input[type="radio"] {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        & + div {
          background: ${p => p.theme.golOffWhite};
        }

        &:checked ~ div {
          background: ${p => p.theme.golHighlight};
        }
      }

      label {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.2rem;
        text-transform: uppercase;
        margin-bottom: 0;
        div {
          margin-right: 4px;
        }
      }
      margin-bottom: 8px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }

  // general styles
  button,
  input[type="radio"] + div {
    width: 32px;
    height: 18px;
    // line-height: 28px;
    font-size: 1.2rem;
    border: 2px solid ${p => p.theme.golOffWhite};
    background: ${p => p.theme.golHighlight};
    border-radius: 50px;
    cursor: pointer;
    transition: all 50ms;
    outline: none;

    &:hover {
      filter: brightness(92%);
    }

    &:active {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4) inset;
    }
  }
`;

export default GameOfLifeSettingsLayout;
