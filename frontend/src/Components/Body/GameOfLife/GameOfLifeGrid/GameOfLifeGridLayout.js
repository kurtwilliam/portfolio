import styled from "styled-components";

const GameOfLifeGridLayout = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth}vw;
  left: ${p => p.theme.golBorderWidth}vw;
  bottom: ${p => p.theme.golBorderWidth}vw;
  width: calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 400px);
  max-width: 100%;
  z-index: 1000;

  // @media (max-width: 1500px) {
  //   width: calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 360px);
  // }

  & > svg {
    position: absolute;
    z-index: 100000;
  }

  & > svg:first-of-type {
    left: -20px;
    bottom: 17px;
  }

  & > svg:nth-child(4) {
    left: -26px;
    top: 81px;
  }

  & > svg:nth-child(5) {
    right: -21px;
    bottom: 227px;
  }
  & > svg:nth-child(6) {
    left: 100px;
    top: -88px;
  }

  .gol__grid {
    &--container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 400px);
      overflow: hidden;
      max-width: 100%;
      border-radius: 80px;
      border: 4px solid ${p => p.theme.golPrimary3};
      border-radius: 80px;
      background: ${p => p.theme.golOffWhite};
    }

    &--germStars {
      position: absolute;
      bottom: -30px;
      right: -60px;
      overflow: hidden;
      width: 150px;
      height: 160px;

      svg {
        position: absolute;
        z-index: 100000;
      }

      & svg:nth-child(1) {
        position: relative;
        z-index: 100010;
        left: 90px;
        top: 58px;
        transform: translate(-50%, -50%);
      }
      & svg:nth-child(2) {
        right: 59px;
        bottom: 87px;
      }
      & svg:nth-child(3) {
        right: 47px;
        bottom: -2px;
      }
    }

    &--helpButton {
      &:hover {
        filter: brightness(92%);
      }

      &:active {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.4) inset;
      }
      position: absolute;
      bottom: 0;
      left: ${p => p.theme.golBorderWidth * 2}vw;
      display: flex;
      align-items: center;
      font-weight: bold;
      z-index: 100000;
      width: auto;
      height: auto;
      border: none;
      background: ${p => p.theme.golPrimary3};
      border-radius: 50px;
      cursor: pointer;
      transition: all 50ms;
      padding: 8px 10px;
      font-size: 2.4rem;
      color: ${p => p.theme.golWhite};
      outline: none;
      transform: rotate(11.45deg);
      max-height: 52px;

      span {
        width: 36px;
        height: 36px;
        background: ${p => p.theme.golWhite};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 8px;
      }

      &.hidden {
        left:-100000px;
      }
    }
  }
`;

export default GameOfLifeGridLayout;
