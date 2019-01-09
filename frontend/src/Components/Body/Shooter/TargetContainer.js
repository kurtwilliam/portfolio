import styled from "styled-components";

const TargetContainer = styled.div`
  transition: all ${props => props.duration}s ease-out;
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 100px;
  height: 100px;
  border: 1px solid red;
  border-radius: 50%;

  div {
    position: absolute;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: crosshair;
    }
  }

  > div {
    background: red;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  > div > div {
    background: white;
    width: 66.66%;
    height: 66.66%;
    z-index: 20;
  }

  > div > div > div {
    background: red;
    width: 50%;
    height: 50%;
    z-index: 30;
  }
`;

export default TargetContainer;
