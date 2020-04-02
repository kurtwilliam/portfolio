import styled from "styled-components";

const Gradient = styled.div`
  padding: 15px;
  padding-bottom: 0px;
  width: 100%;
  height: auto;
  background: ${props => props.theme.gradient};

  @media (max-width: 550px) {
    padding: 7.5px;
    padding-bottom: 0px;
  }
`;

export default Gradient;
