import React, { Component } from "react";
import Chunk from "../shared/Chunk";

import JungleSearch from "./JungleSearch";
import Shooter from "./Shooter";

// Map over body chunks we get from state
// from here we render a body piece
// in the body piece we render the type of body it is

class BodyContainer extends Component {
  render() {
    return (
      <Chunk>
        <Shooter />
        <JungleSearch />
      </Chunk>
    );
  }
}

export default BodyContainer;
