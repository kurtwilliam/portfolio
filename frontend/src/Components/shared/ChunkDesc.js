import styled from "styled-components";

const ChunkDesc = styled.figcaption`
  position: relative;
  width:100%;
  padding:16px 32px
  text-align:center;
  color:${props => props.theme.grey};
  max-width:75%;
  margin: 0 auto 64px;

  @media(max-width:600px) {
    padding:8px 12px;
    max-width:100%;
  }
`;

export default ChunkDesc;
