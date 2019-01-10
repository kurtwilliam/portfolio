import styled from 'styled-components';

const Chunk = styled.div`
  position: relative;
  min-height: 75vh;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 200ms;
  border-radius: 2px;

  :hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    min-height: 50vh;
  }

  @media (max-width: 600px) {
    min-height: 40vh;
  }
`;

export default Chunk;
