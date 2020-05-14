import styled from "styled-components";

const capFont = p => `
  font-size:2rem;
  letter-spacing:0.1rem;
  color:${p.theme.golTextColor};
  text-transform: uppercase;
`;

const GameOfLifePatternsLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 300px);
  border: 12px double ${p => p.theme.golPrimary3};
  border-radius: 14px;
  padding: 8px;
  padding-top: 16px;

  span,
  a {
    color: ${p => p.theme.golTextColor};
  }

  .gol__patterns {
    width: 100%;

    &.hidden {
      .gol__patterns--container {
        max-height: 0;
      }
    }
    &--container {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      max-height: auto;
      overflow-y: scroll;
      transition: all 200ms;

      &::-webkit-scrollbar {
        width: 10px;
        position: relative;
      }

      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: ${p => p.theme.golOffWhite};
      }
    }

    &--overflow {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    &--title {
      text-transform: capitalize;
      font-size: 2rem;
      position: absolute;
      left: 6px;
      top: -19px;
      padding: 0 2px;
      z-index: 100000;
      background: ${p => p.theme.golWhite};
      color: ${p => p.theme.golPrimary3};
    }

    &--pattern {
      border-bottom: 1px solid ${p => p.theme.golOffWhiteDark};
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;

      &:last-of-type {
        border-bottom: none;
      }

      div {
        position: relative;
        display: flex;
        justify-content: space-between;
        transition: all 120ms;
      }

      &.selected {
        span:first-of-type {
          text-transform: uppercase;
          font-weight: bold;
        }

        .gol__patterns--pattern__hidden {
          max-height: 100px;

          span:first-of-type,
          a {
            font-size: 1.2rem;
            font-weight: normal;
            letter-spacing: inherit;
            text-transform: capitalize;
            min-width: inherit;
          }
        }
      }

      span {
        ${capFont};
        display: block;

        &:first-of-type {
          text-transform: capitalize;
          font-weight: bold;
        }
        &:last-of-type {
          min-width: 75px;
          text-align: right;
        }
      }
      &__hidden {
        overflow: hidden;
        max-height: 0;
      }
    }
  }
`;

export default GameOfLifePatternsLayout;
