import styled from "styled-components";

const GameOfLifeHelpLayout = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  z-index: 10000000;
  background: ${p => p.theme.golWhite};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  // border: 2px solid ${p => p.theme.golOffWhiteDark};
  border-radius: 2px;

  button {
    width: auto;
    height: auto;
  }

  .gol__help {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    u {
      cursor: pointer;
    }

    &--close {
      position: absolute;
      top: 27px;
      right: 0;

      background: transparent;
      border: none;
      font-size: 2.4rem;
      z-index: 10000000;
      svg {
        color: ${p => p.theme.golPrimary3};
        height: 2.4rem;
      }
    }

    &--switch {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      margin-top: 16px;
      background: transparent;
      border: none;
      text-decoration: underline;
    }

    &--pages {
      position: absolute;
      bottom: 32px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        padding: 4px 8px;

        &.gol__help--pages__previous {
          background: none;
          border: none;
        }
      }
    }
  }
`;

export default GameOfLifeHelpLayout;
