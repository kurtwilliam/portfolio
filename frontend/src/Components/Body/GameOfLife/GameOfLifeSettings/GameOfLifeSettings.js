import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifeShapes from "./GameOfLifeShapes";
import GridSquare from "../GameOfLifeGrid/GridRow/GridSquare";

const speedMin = 1;
const speedMax = 60;

const gridMin = 200;
const gridMax = 600;

class GameOfLifeSettings extends Component {
  render() {
    const {
      speed,
      paused,
      gridSize,
      handleChange,
      toggleState,
      updateSelectedShape,
      selectedShape
    } = this.props;
    return (
      <>
        <GameOfLifeSettingsLayout>
          <div className="gol__settings--container">
            <button
              className={`${paused ? "pause" : "pause paused"}`}
              onClick={toggleState}
              name="paused"
            ></button>
            <div className="gol__settings--range">
              <label>Speed - {speed} frames/s</label>
              <input
                type="range"
                name="speed"
                min={speedMin}
                max={speedMax}
                value={speed}
                onChange={handleChange}
                step={1}
              />
            </div>
            {/* <div className="gol__settings--range">
          <label>
            Grid Size - {gridSize / 10} x {gridSize / 10}
          </label>
          <input
            type="range"
            name="gridSize"
            min={gridMin}
            max={gridMax}
            value={gridSize}
            onChange={handleChange}
            step={50}
          />
        </div> */}
            <div className="gol__settings--range">
              <button onClick={toggleState} name="clear">
                Clear
              </button>
            </div>
            <div className="gol__settings--range">
              <button onClick={toggleState} name="randomize">
                Randomize
              </button>
            </div>

            <div className="gol__settings--range">
              <button onClick={() => updateSelectedShape("")}>
                Add Shapes
              </button>
            </div>
          </div>
          {/* <label>Zoom</label>
        <input /> */}
        </GameOfLifeSettingsLayout>
        <GameOfLifeShapes
          selectedShape={selectedShape}
          updateSelectedShape={updateSelectedShape}
        />
      </>
    );
  }
}

export default GameOfLifeSettings;
