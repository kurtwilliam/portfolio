import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";

const speedMin = 100;
const speedMax = 2000;

class GameOfLifeSettings extends Component {
  render() {
    const { speed, paused, handleChange, toggleState } = this.props;
    return (
      <GameOfLifeSettingsLayout>
        <button onClick={toggleState}>{paused ? "Play" : "Pause"}</button>
        <div className="gol__settings--range">
          <label>Speed</label>
          <input
            type="range"
            min={speedMin}
            max={speedMax}
            value={speed}
            onChange={handleChange}
            step={200}
          />
        </div>
        {/* <label>Zoom</label>
        <input /> */}
      </GameOfLifeSettingsLayout>
    );
  }
}

export default GameOfLifeSettings;
