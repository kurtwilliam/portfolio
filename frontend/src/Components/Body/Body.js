import React, { Component } from "react";
import Chunk from "../shared/Chunk";
import JungleSearch from "./JungleSearch";
import AestheticDimension from "./AestheticDimension";
import Shooter from "./Shooter";
import EmailBuilder from "./EmailBuilder";

// Map over body chunks we get from state
// from here we render a body piece
// in the body piece we render the type of body it is

class Body extends Component {
  render() {
    return (
      <Chunk>
        <Shooter />
        <JungleSearch />
        <AestheticDimension />
        <EmailBuilder />
      </Chunk>
    );
  }
}

export default Body;
