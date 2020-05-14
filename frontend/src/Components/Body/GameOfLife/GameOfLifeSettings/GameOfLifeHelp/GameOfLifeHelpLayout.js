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
      bottom: 24px;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      margin-top: 16px;
      background: transparent;
      border: none;
      text-decoration: underline;
      font-size: 1.6rem;
      color: ${p => p.theme.golTextColor};
    }

    &--pages {
      position: absolute;
      bottom: 56px;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;
      button {
        background: ${p => p.theme.golPrimary3};
        padding: 8px 10px;
        font-size: 2.4rem;
        font-weight: bold;
        color: ${p => p.theme.golWhite};
        outline: none;
        max-height: 52px;
        border: none;
        transition: all 50ms;
        border-radius: 50px;
        display: flex;
        align-items: center;
        padding-left: 24px;

        &:after,
        &:before {
          content: none;
        }

        span {
          display: inline-block;
          width: 36px;
          height: 36px;
          border-radius: 50px;
          background: white;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-left: 12px;
        }

        &.gol__help--pages__previous {
          padding-left: 8px;
          padding-right: 24px;

          span {
            transform: scale(-1, -1);
            margin-left: 0px;
            margin-right: 12px;
          }
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
