import styled from "styled-components";
import Chunk from "../../shared/Chunk";

const HiraganaChunkLayout = styled(Chunk)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;

  a {
    text-decoration: none;
    color: inherit;
    text-align: center;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .hiragana-container {
    display: flex;

    div {
      font-size: 3rem;
      color: lightgrey;

      span {
        padding: 2rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid lightgrey;
        width: calc(100% / ${props => props.lastColumn});
        transition: all 30ms;
        cursor: pointer;
        max-height: 128px;
        font-size: 8rem;
        color: ${p => p.theme.main};
        border-right: 1px solid lightgrey;

        @media (max-width: 720px) {
          font-size: 4rem;
          max-height: 84px;
        }
      }

      &:last-of-type span {
        border-right: 2px solid lightgrey;
      }
    }
  }
`;

export default HiraganaChunkLayout;
