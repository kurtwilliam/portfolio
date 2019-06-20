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
      cursor: pointer;
      user-select: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        font-size: 2.6rem;
      }
    }

    &__word {
      min-height: 150px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      max-width: 100%;
      flex-wrap: wrap;

      p {
        font-size: 8rem;
        font-weight: bold;

        @media (max-width: 600px) {
          font-size: 6rem;
        }
      }

      p.highlight {
        color: white;
        text-shadow: -3px 0 rgba(0, 0, 0, 1), 0 3px rgba(0, 0, 0, 1),
          3px 0 rgba(0, 0, 0, 1), 0 -3px rgba(0, 0, 0, 1),
          -3px 3px rgba(0, 0, 0, 1), 3px -3px rgba(0, 0, 0, 1),
          3px 3px rgba(0, 0, 0, 1), -3px -3px rgba(0, 0, 0, 1);
        min-width: 100px;
        text-align: center;
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;

        @media (max-width: 600px) {
          min-width: 50px;
        }
      }
    }
  }
`;

export default HiraganaOverlay;
