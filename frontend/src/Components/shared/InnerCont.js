import styled from "styled-components";

const InnerCont = styled.div`
  width: calc(100% - 60px);
  max-width: 1200px;
  height: auto;
  margin: 0 auto;
  padding-top: 100px;
  min-height: 100vh;

  @media (max-width: 720px) {
    width: calc(100% - 15px);
    padding-top: 20px;
  }
`;

export default InnerCont;
