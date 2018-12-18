import styled from "styled-components";
import Chunk from "../../shared/Chunk";
import AestheticDimensionImg from "../../../assets/AestheticDimensionImg.png";

const AestheticDimensionChunk = styled(Chunk)`
  background-image: url(${AestheticDimensionImg});
  background-size: cover;
  background-position: center;

  a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export default AestheticDimensionChunk;
