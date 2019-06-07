import styled from "styled-components";

const ChartRow = styled.div`
  width: 100%;
  display: flex;

  &.hidden,
  &.hidden .character {
    border: none;
    color: lightgrey;
  }

  &.hiddenOverride {
    color: black;
  }

  &.highlight {
    background: lightgrey;
  }
  &.hidden .character.highlight {
    background: rgba(0, 0, 0, 0);
    color: black;
  }
`;

export default ChartRow;
