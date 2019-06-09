import styled from "styled-components";

const HiraganaOverlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);

  .hiraganaOverlay {
    &__content {
      font-size: 20vw;
    }

    &__word {
      min-height: 150px;
      cursor: pointer;

      p {
        font-size: 8rem;
        font-weight: bold;
      }

      p.highlight {
        color: blue;
      }
    }
  }
`;

export default HiraganaOverlay;
