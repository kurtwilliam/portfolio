import styled from "styled-components";
import Chunk from "../../shared/Chunk";

const GameOfLifeChunkLayout = styled(Chunk)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: ${p => p.theme.golOffWhite};

  .logo {
    position:relative;
    z-index: 10000000;
    min-width:430px;

    svg {
      position: absolute;
  
      &:first-of-type {
        top: 10px;
right: -10px;
      }
  
      &:last-of-type {
        top: -30px;
        right: 25px;
      }
    }
  }

  .gol__bg {
    position:absolute;
    width:100%;
    height:100%;
    top:0;
    bottom:0;
    left:0;
    right:0;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    padding:32px;

    &--longRect {
      width: 100%;
      max-width: 100%;
      position: relative;
      border-radius: 2px;
      height: ${p => p.theme.golBorderWidth / 5}vw;
      background: ${p => p.theme.golHoleColor1};
      background: linear-gradient(
        90deg,
        ${p => p.theme.golHoleColor2} 0%,
        ${p => p.theme.golHoleColor1} 6%,
        ${p => p.theme.golHoleColor1} 98%,
        ${p => p.theme.golHoleColor2} 100%
      );
      box-shadow: 0 3px 4px ${p => p.theme.golHoleColor2} inset;
      margin-top: ${p => p.theme.golBorderWidth / 5}vw;

      &:first-of-type {
        margin-top: 0;
      }

      // &:nth-of-type(3) {
      //   width: calc(400px + ${p => p.theme.golBorderWidth * 1.75}vw);
      // }
      // &:nth-of-type(4) {
      //   width: calc(400px + ${p => p.theme.golBorderWidth * 1.25}vw);
      // }
      // &:nth-of-type(5) {
      //   width: calc(400px + ${p => p.theme.golBorderWidth * 1}vw);
      // }
    }

    &--rectContTop {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }

  a {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

export default GameOfLifeChunkLayout;
