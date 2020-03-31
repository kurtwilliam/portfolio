import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";

const speedMin = 200;
const speedMax = 2000;

const gridMin = 200;
const gridMax = 600;

class GameOfLifeSettings extends Component {
  render() {
    const { speed, paused, gridSize, handleChange, toggleState } = this.props;
    return (
      <GameOfLifeSettingsLayout>
        <button onClick={toggleState}>{paused ? "Play" : "Pause"}</button>
        <div className="gol__settings--range">
          <label>Speed</label>
          <input
            type="range"
            name="speed"
            min={speedMin}
            max={speedMax}
            value={speed}
            onChange={handleChange}
            step={200}
          />
        </div>
        <div className="gol__settings--range">
          <label>Grid Size</label>
          <input
            type="range"
            name="gridSize"
            min={gridMin}
            max={gridMax}
            value={gridSize}
            onChange={handleChange}
            step={50}
          />
        </div>
        {/* <label>Zoom</label>
        <input /> */}
      </GameOfLifeSettingsLayout>
    );
  }
}

export default GameOfLifeSettings;
