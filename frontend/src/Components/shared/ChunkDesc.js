import styled from "styled-components";

const ChunkDesc = styled.figcaption`
  position: relative;
  width:100%;
  padding:16px 32px
  text-align:center;
  color:${props => props.theme.golTextColor};
  max-width:75%;
  margin: 0 auto;
  padding-bottom: 64px;
  font-size:1.6rem;
  a {
    color:inherit;
  }

  .skills {
    font-size:1.4rem;
    display:block;
    color:${props => props.theme.golTextColor};
    opacity:.8;
  }

  @media(max-width:600px) {
    padding:8px 12px 50px;
    max-width:100%;
  }
`;

export default ChunkDesc;
