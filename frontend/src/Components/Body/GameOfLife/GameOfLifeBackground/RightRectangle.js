import styled from "styled-components";

const RightRectangle = styled.div`
  position: absolute;
  width: 45%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${p => p.theme.golWhite};
  padding: ${p => p.theme.golBorderWidth / 5}vw ${p => p.theme.golBorderWidth}vw;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .gol__bg {
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

      &:nth-of-type(3) {
        width: calc(400px + ${p => p.theme.golBorderWidth * 1.75}vw);
      }
      &:nth-of-type(4) {
        width: calc(400px + ${p => p.theme.golBorderWidth * 1.25}vw);
      }
      &:nth-of-type(5) {
        width: calc(400px + ${p => p.theme.golBorderWidth * 1}vw);
      }
    }

    &--rectContTop {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
`;

export default RightRectangle;
