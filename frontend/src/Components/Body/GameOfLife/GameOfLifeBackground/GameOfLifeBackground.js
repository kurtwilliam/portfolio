import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeBackgroundLayout from "./GameOfLifeBackgroundLayout";

class GameOfLifeBackground extends Component {
  render() {
    return <GameOfLifeBackgroundLayout></GameOfLifeBackgroundLayout>;
  }
}

export default withTheme(GameOfLifeBackground);
