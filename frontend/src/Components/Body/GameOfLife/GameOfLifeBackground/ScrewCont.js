import styled from "styled-components";

const ScrewCont = styled.span`
  position: absolute;
  left: ${p => (p.right ? "auto" : p.x)}%;
  top: ${p => p.y}%;
  right: calc(${p => (p.right ? `400px + 3.25%` : "auto")});
`;

export default ScrewCont;
