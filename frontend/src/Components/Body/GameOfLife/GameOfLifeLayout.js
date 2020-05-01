import styled from "styled-components";

const GameOfLifeLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${p => p.theme.golBlack};

  .gol__settings--helpButton {
    &:hover {
      filter: brightness(92%);
    }

    &:active {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4) inset;
    }
    position: absolute;
    bottom: ${p => p.theme.golBorderWidth * 2}vw;
    left: ${p => p.theme.golBorderWidth * 2}vw;
    z-index: 100000;
    width: auto;
    height: auto;
    border: 2px solid ${p => p.theme.golOffWhite};
    background: ${p => p.theme.golHighlight};
    border-radius: 50px;
    cursor: pointer;
    transition: all 50ms;
    padding: 6px 10px;
    font-size: 1.6rem;
    color: ${p => p.theme.golOffWhite};
  }
`;

export default GameOfLifeLayout;
