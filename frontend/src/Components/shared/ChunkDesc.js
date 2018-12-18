import styled from "styled-components";

const ChunkDesc = styled.figcaption`
  position: relative;
  width:100%;
  padding:16px 32px
  text-align:center;
  color:${props => props.theme.grey};
  margin-bottom: 32px;
  max-width:75%;
  margin: 0 auto;

  @media(max-width:600) {
    padding:8px 12px;
  max-width:100%;
  }
`;

export default ChunkDesc;
