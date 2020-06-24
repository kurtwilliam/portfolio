import styled from "styled-components";

const CharacterContainerLayout = styled.div`
  padding: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgrey;
  width: calc(100% / ${props => props.lastColumn});
  transition: all 30ms;
  cursor: pointer;
  max-width: 64px;
  max-height: 64px;

  &.hidden {
    border: none;
    color: lightgrey;
  }

  &.hiddenOverride {
    color: black;
  }

  &.highlight {
    background: lightgrey;
  }
  &.highlight.hidden {
    background: rgba(0, 0, 0, 0);
    color: black;
  }

  &:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export default CharacterContainerLayout;
