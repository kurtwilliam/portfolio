import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeForegroundLayout from "./GameOfLifeForegroundLayout";

class GameOfLifeForeground extends Component {
  render() {
    const { updateState } = this.props;
    return (
      <GameOfLifeForegroundLayout>
        <button
          className={"gol__settings--helpButton"}
          onClick={() => updateState("displayedInfo", "help")}
        >
          What is this?
        </button>
      </GameOfLifeForegroundLayout>
    );
  }
}

export default withTheme(GameOfLifeForeground);
