import styled from "styled-components";

const LeftRectangle = styled.div`
  position: absolute;
  width: ${p => p.theme.golBorderWidth * 6}vw;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  transform: translate(-50%, 0);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  .gol__bg {
    &--hexagons {
      position: absolute;
      top: ${p => p.theme.golBorderWidth / 2}vw;
      right: ${p => p.theme.golBorderWidth * 2}vw;

      &__row {
        display: flex;
        align-items: center;

        &:nth-child(odd) {
          height: 10px;
          .gol__bg--hexagons__hex {
            transform: translate(-50%, 0);
          }
        }
        &:first-of-type .gol__bg--hexagons__hex {
          background: ${p => p.theme.golHoleColor1};
          background: linear-gradient(
            180deg,
            ${p => p.theme.golHoleColor2} 0%,
            ${p => p.theme.golHoleColor1} 50%,
            ${p => p.theme.golHoleColor1} 100%
          );
        }
      }
      &__hex {
        background: ${p => p.theme.golHoleColor1};
        margin: 1px;

        width: 16px;
        height: 16px;
        -webkit-clip-path: polygon(
          50% 0%,
          100% 25%,
          100% 75%,
          50% 100%,
          0% 75%,
          0% 25%
        );
        clip-path: polygon(
          50% 0%,
          100% 25%,
          100% 75%,
          50% 100%,
          0% 75%,
          0% 25%
        );

        &:last-of-type {
          background: linear-gradient(
            270deg,
            ${p => p.theme.golHoleColor2} 0%,
            ${p => p.theme.golHoleColor1} 50%,
            ${p => p.theme.golHoleColor1} 100%
          );
        }
      }
    }
  }
`;

export default LeftRectangle;
