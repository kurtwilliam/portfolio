import React, { Component } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const JungleBox = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  min-width: 20%;
  z-index: 10;
`;

class JungleScene extends Component {
  state = {
    transition: null
  };
  startDrag = () => this.setState({ transition: null });
  stopDrag = () => this.setState({ transition: "all 500ms" });

  render() {
    const { x, y, w, plant } = this.props;
    const { transition } = this.state;

    return (
      <Draggable onStart={this.startDrag} onStop={this.stopDrag}>
        <JungleBox
          style={{
            transition,

            width: `${w}%`,
            left: `${x}%`,
            top: `${y}%`,
            height: "auto"
          }}
          src={plant}
          draggable="false"
        />
      </Draggable>
    );
  }
}

export default JungleScene;
