import styled from "styled-components";

const GameOfLifeGridLayout = styled.div`
  position: absolute;
  top: ${p => p.theme.golBorderWidth}vw;
  left: ${p => p.theme.golBorderWidth}vw;
  bottom: ${p => p.theme.golBorderWidth}vw;
  width: calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 25vw);
  max-width: 100%;
  z-index: 1000;

  .gol__grid {
    &--container {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: calc(100vw - ${p => p.theme.golBorderWidth * 3}vw - 25vw);
      overflow: hidden;
      max-width: 100%;
      border-radius: 80px;
      border: 4px solid ${p => p.theme.golPrimary3};
      border-radius: 80px;
      background: ${p => p.theme.golOffWhite};
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
    }
  }
`;

export default GameOfLifeGridLayout;
