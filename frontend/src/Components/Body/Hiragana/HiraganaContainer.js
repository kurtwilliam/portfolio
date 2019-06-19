import styled from "styled-components";

const HiraganaContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .hiragana__instructions {
    display: flex;
    justify-content: flex-start;

    p {
      margin-left: 16px;
    }

    p:first-of-type {
      margin-left: 0;
    }
  }
`;

export default HiraganaContainer;
