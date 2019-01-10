import styled from 'styled-components';

const LinkChunk = styled.a`
  width: 100%;
  height: auto;
  margin: 0 auto;
  max-height: 75vh;
  text-decoration: none;
  border-radius: 2px;

  img {
    width: 100%;
    height: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 200ms;

    :hover {
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    }
  }
`;

export default LinkChunk;
