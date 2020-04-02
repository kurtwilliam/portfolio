import styled from "styled-components";

const GameOfLifeSettingsLayout = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  background: rgb(100, 100, 100);

  .gol__settings--range {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
  }

  button {
    width: 28px;
    height: 28px;
    border-style: solid;
    border-width: 14px 0 14px 28px;
    box-sizing: border-box;
    border-color: rgba(100, 100, 100, 0) rgba(100, 100, 100, 0)
      rgba(100, 100, 100, 0) #202020;
    // transition: 25ms all ease;
    cursor: pointer;

    &.paused {
      width: 28px;

      border-style: double;
      border-width: 0 0 0 28px;
    }
  }
`;

export default GameOfLifeSettingsLayout;
