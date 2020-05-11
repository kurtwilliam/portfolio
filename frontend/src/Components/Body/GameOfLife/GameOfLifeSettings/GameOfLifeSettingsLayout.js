import styled from "styled-components";
import ControlsContainer from "../../../../assets/GameOfLife/ControlsContainer.svg";

const circleButton = p => `
  position:relative;
  height: 22px;
  width: 22px;
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
  width: 400px;
  display: flex;
  flex-direction: column;
  background: transparent;
  z-index: 1000;

  // @media (max-width: 1500px) {
  //   width: 360px;
  // }

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
      padding-top: 64px;
    }

    &--settings {
      position: relative;
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      min-height: 300px;

      &__top {
        z-index: 1000;
        display: flex;
        justify-content: space-between;

        & > div {
          width: 45%;
        }
      }
    }

    &--logo {
      position: absolute;
      width: 100%;
      z-index: 100000000;

      img {
        position: absolute;
        width: 70%;
        left: -25px;
        top: -5px;
      }

      svg {
        position: absolute;
        z-index: 10000000;

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

      input {
        cursor: pointer;
      }

      &__container {
        z-index: 1000;
        position: relative;
        padding: 8px;
        margin-bottom: 16px;
        min-width: 106px;
        align-self: flex-start;
        padding-top: 24px;
        max-width: 420px;

        &Touch {
          position: absolute;
          padding-top: 25px;
          top: 183px;

          .gol__settings--setting {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            &__title {
              top: -14%;
              // @media (max-width: 1500px) {
              //   font-size: 1.6rem;
              //   top: -7%;
              // }
            }
          }
        }
      }

      &__title {
        text-transform: capitalize;
        font-size: 2rem;
        position: absolute;
        left: 4%;
        top: -4%;
        padding: 0 2px;
        background: ${p => p.theme.golWhite};
        color: ${p => p.theme.golPrimary3};

        // @media (max-width: 1500px) {
        //   font-size: 1.6rem;
        //   top: -3%;
        // }
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
        margin-bottom: 16px;

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
        position: relative;
        cursor: pointer;
        height: 24px;
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
        margin-bottom: 16px;
        display: flex;
        align-items: center;

        &:focus {
          outline: none;
        }
        &::-ms-track {
          width: 100%;
          cursor: pointer;
          /* Hides the slider so custom styles can be added */
          background: transparent;
          border-color: transparent;
          border-radius: 4px;
          height: 4px;
          color: transparent;
        }
        &::-webkit-slider-thumb {
          ${circleButton};
          margin-top: -12px;
          width: 32px;
          height: 32px;
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
          border-radius: 4px;
          height: 4px;
        }
        &::-moz-range-track {
          height: 8px;
          width: 100%;
          background: ${p => p.theme.golPrimary3};
          border-radius: 4px;
          height: 4px;
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
            width:32px;
            height: 32px;
            position: relative;
            background: ${p => p.theme.golWhite};
            border: 4px solid ${p => p.theme.golGrey1};
            margin-right: 8px;
          }

          &:checked ~ div {
            border: 4px solid ${p => p.theme.golPrimary1};
            background: ${p => p.theme.golButtonColor};

            &:after {
              content: "";
              width: 6px;
              height: 6px;
              position: absolute;
              background: ${p => p.theme.golWhite};
              border-radius: 50%;
              top: 6px;
              left: 6px;
              transform: translate(0, -50%);
            }
          }
        }

        label {
          display: flex;
          justify-content: flex-start;
          width: auto;
          align-items: center;
          font-size: 1.2rem;
          text-transform: uppercase;
          margin-bottom: 0;
          font-size: 2rem;
          margin-right: 24px;
          div {
            margin-right: 4px;
          }
        }

        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }

    &--controls {
      width: calc(100% + 21px);
      height: 100%;
      max-height: 282px;
      position: absolute;
      top: -9px;
      left: -21px;
      bottom: 0;
      right: 0;
      z-index: 0;
      max-height: 285px;
      background-image: url(${ControlsContainer});
      background-size: cover;
      background-repeat: no-repeat;

      svg {
        width: 100%;
      }
    }
  }

  // general styles
  button {
    ${circleButton};
    width: 46px;
    height: 32px;
    border-radius: 50px;
    cursor: pointer;
  }

  .gol__patterns--title {
    text-transform: capitalize;
    font-size: 2rem;
    position: absolute;
    left: 4%;
    top: 0;
    padding: 0 2px;
    z-index: 100000;
    background: ${p => p.theme.golWhite};
    color: ${p => p.theme.golPrimary3};
  }
`;

export default GameOfLifeSettingsLayout;
