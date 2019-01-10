import styled from "styled-components";

const Chunk = styled.div`
  position: relative;
  min-height: 75vh;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 200ms;

  :hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

export default Chunk;
