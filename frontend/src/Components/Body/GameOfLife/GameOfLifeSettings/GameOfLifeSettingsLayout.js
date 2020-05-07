import styled from "styled-components";

const circleButton = p => `
  position:relative;
  height: 28px;
  width: 28px;
  border-radius: 50%;
  border: 4px solid  ${p.theme.golPrimary1}; 
  background: ${p.theme.golButtonColor};

  &:after, &:before {
    content:'';
    width:6px;
    height:6px;
    position:absolute;
    background: ${p.theme.golWhite};
    border-radius:50%;
    top:6px;
    left:6px;
    transform:translate(0,-50%);
  }
`;

const capFont = p => `
font-weight:bold;
font-size:2rem;
letter-spacing:0.3rem;
color:${p.theme.golTextColor};
text-transform: uppercase;

`;

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

  .gol__settings {
    &--container {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
      max-width: 768px;
      max-height: 100%;
      margin-top: 64px;
    }

    &--settings {
      width: 100%;
      height: auto;
      display:flex;
      flex-direction:column;

      &__top {
        display:flex;
        justify-content:space-between;

        & > div {
          width:45%;
        }
      }
    }

    &--logo {
      position: absolute;
      width: 100%;

      img {
        position: absolute;
        width: 70%;
        left: -20px;
        top: -5px;
      }

      svg {
        position: absolute;
        z-index: 1000000;

        &:first-of-type {
          top: -40px;
          right: 45px;
        }

        &:last-of-type {
          top: -10px;
          right: 10px;
        }
      }
    }

    &--setting {
      display: flex;
      flex-direction: column;

      &__touch {
        display:flex;
        justify-content:flex-start;
        flex-direction:row;
      }

      input {
        cursor: pointer;
      }

      &__container {
        position: relative;
        // border: 2px solid ${p => p.theme.golOffWhiteDark};
        padding: 8px;
        margin-bottom: 16px;
        min-width: 106px;
        align-self:flex-start;
      }

      &__title {
        text-transform: capitalize;
        font-size: 2rem;
        position: absolute;
        left: 8px;
        top: -7px;
        padding: 0 4px;
        background: ${p => p.theme.golWhite};
        color: ${p => p.theme.golPrimary3};
      }

      label {
        ${capFont};
        display: flex;
        justify-content: space-between;
        margin-bottom: 2px;
        span {
          color: ${p => p.theme.golTextColor};
        }
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
          ${capFont}
          margin-left: 4px;
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
        height: 24px;
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
        margin-bottom: 16px;

        &:focus {
          outline: none;
        }
        &::-ms-track {
          width: 100%;
          cursor: pointer;
          /* Hides the slider so custom styles can be added */
          background: transparent;
          border-color: transparent;
          border-radius:4px;
          height:4px;
          color: transparent;
        }
        &::-webkit-slider-thumb {
          ${circleButton}
        }
        &::-moz-range-thumb {
          ${circleButton}
        }
        &::-ms-thumb {
          ${circleButton}
        }
        &::-webkit-slider-runnable-track {
          height: 8px;
          width: 100%;
          background: ${p => p.theme.golPrimary3};
          border-radius:4px;
          height:4px;
        }
        &::-moz-range-track {
          height: 8px;
          width: 100%;
          background: ${p => p.theme.golPrimary3};
          border-radius:4px;
          height:4px;
        }
        &:focus::-webkit-slider-runnable-track {
        }
      }
      &__radio {
        font-size: initial;
        align-self: flex-start;

        input[type="radio"] {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;

          & + div {
            ${circleButton}
            width:32px;height:32px;
            position:relative;
            background: ${p => p.theme.golWhite};
            border: 4px solid  ${p => p.theme.golGrey1}; 
            margin-right:8px;
          }

          &:checked ~ div {
            border: 4px solid  ${p => p.theme.golPrimary1}; 
            background: ${p => p.theme.golButtonColor};

            &:after {
              content:'';
              width:6px;
              height:6px;
              position:absolute;
              background: ${p => p.theme.golWhite};
              border-radius:50%;
              top:6px;
              left:6px;
              transform:translate(0,-50%);
            }
          }
        }

        label {
          display: flex;
          justify-content:flex-start;
          width:auto;
          align-items: center;
          font-size: 1.2rem;
          text-transform: uppercase;
          margin-bottom: 0;
          font-size:2rem;
          margin-right:24px;
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

    &--controls {
      width: 100%;
      position: absolute;
      top:0;
      left:-1000px;
      z-index:0;
      svg {
        width: 100%;
      }
    }
  }

  // general styles
  button {
     ${circleButton};
     width:46px;
     border-radius:50px;
  }
`;

export default GameOfLifeSettingsLayout;
