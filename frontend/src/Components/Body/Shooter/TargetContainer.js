import styled from 'styled-components';

const TargetContainer = styled.div`
  position: absolute;
  top: ${props => props.y}%;
  left: ${props => props.x}%;
  width: 100px;
  height: 100px;
  transition: all ${props => props.duration}s;
  border: 1px solid red;
`;

export default TargetContainer;
