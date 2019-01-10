import styled from 'styled-components';
import LinkChunk from '../../shared/LinkChunk';

const NewYouChunk = styled(LinkChunk)`
  background: repeating-linear-gradient(
    45deg,
    rgba(48, 93, 126, 1),
    rgba(48, 93, 126, 1) 10px,
    rgba(205, 92, 92, 1) 10px,
    rgba(205, 92, 92, 1) 20px
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  min-height: 75vh;

  p {
    color: white;
    font-size: 8rem;
    padding: 40px;
    border-radius: 10px;
    background-color: rgb(48, 93, 126);
    @media (max-width: 1020px) {
      padding: 20px;
      font-size: 6rem;
    }
  }

  @media (max-width: 768px) {
    min-height: 50vh;
  }

  @media (max-width: 600px) {
    min-height: 40vh;
  }
`;

export default NewYouChunk;
