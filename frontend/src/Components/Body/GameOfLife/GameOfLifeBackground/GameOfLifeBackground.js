import React, { Component } from "react";
import { withTheme } from "styled-components";
import GameOfLifeBackgroundLayout from "./GameOfLifeBackgroundLayout";
import Screw from "../assets/Screw";

class GameOfLifeBackground extends Component {
  render() {
    return (
      <GameOfLifeBackgroundLayout>
        <Screw />
      </GameOfLifeBackgroundLayout>
    );
  }
}

export default withTheme(GameOfLifeBackground);
