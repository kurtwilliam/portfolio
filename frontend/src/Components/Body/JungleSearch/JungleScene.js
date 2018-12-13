import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const JungleBox = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  min-width: 20%;
`;

const JungleScene = ({ x, y, w, scene }) => (
  <Draggable>
    <JungleBox
      style={{ width: `${w}%`, left: `${x}%`, top: `${y}%` }}
      src={scene}
      draggable="false"
    />
  </Draggable>
);

export default JungleScene;
