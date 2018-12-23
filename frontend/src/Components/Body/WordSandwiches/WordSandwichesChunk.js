import styled from "styled-components";
import Chunk from "../../shared/Chunk";
import WordSandwichesBG from "./assets/WordSandwichesBG.png";

const WordSandwichesChunk = styled(Chunk)`
  background-image: url(${WordSandwichesBG});
  background-position: center;
  background-color: #faf5e4;

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default WordSandwichesChunk;