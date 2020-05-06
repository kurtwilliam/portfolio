import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeForegroundLayout from "./GameOfLifeForegroundLayout";

class GameOfLifeForeground extends Component {
  render() {
    const { updateState } = this.props;
    return <GameOfLifeForegroundLayout></GameOfLifeForegroundLayout>;
  }
}

export default withTheme(GameOfLifeForeground);
