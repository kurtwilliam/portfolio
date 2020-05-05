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
      // transform: translate(-50%, 0);

      &__row {
        display: flex;
        align-items: center;

        &:nth-child(odd) {
          height: 10px;
          .gol__bg--hexagons__hex {
            transform: translate(-50%, 0);
          }
        }
      }
      &__hex {
        background: ${p => p.theme.golCream};
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
      }
    }
  }
`;

export default LeftRectangle;
