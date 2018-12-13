import React, { Component } from "react";
import proptypes from "prop-types";

import Chunk from "../../shared/Chunk";

// OnClick for chunk that mkes bullet hole...?
// onclick for target that adds to counter?

class Shooter extends Component {
  state = {
    score: 0
  };
  render() {
    const { score } = this.state;
    return (
      <Chunk>
        <p class="score">{score}</p>
      </Chunk>
    );
  }
}

export default Shooter;
