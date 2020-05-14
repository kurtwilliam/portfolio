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
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  padding-top: 6vw;

  button {
    width: auto;
    height: auto;
  }

  .gol__help {
    position: relative;
    height: 100%;
    width: 100%;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    border: 12px double #0e6d34;
    border-radius: 14px;
    padding: 24px;
    padding-top: 32px;
    background: ${p => p.theme.golWhite};

    p,
    a {
      font-size: 2rem;
      color: ${p => p.theme.golTextColor};
      font-weight: bold;
    }

    u {
      cursor: pointer;
    }

    &--close {
      position: absolute;
      top: 6px;
      right: 12px;

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

    &--title {
      font-size: 2rem;
      position: absolute;
      left: 6px;
      top: -19px;
      padding: 0 2px;
      z-index: 100000;
      background: ${p => p.theme.golWhite};
      color: ${p => p.theme.golPrimary3};
    }
  }
`;

export default GameOfLifeHelpLayout;
