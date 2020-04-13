import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifeShapes from "./GameOfLifeShapes";
import GridSquare from "../GameOfLifeGrid/GridRow/GridSquare";

const speedMin = 1;
const speedMax = 60;

const gridMin = 200;
const gridMax = 600;

const zoomMin = 200;
const zoomMax = 600;

class GameOfLifeSettings extends Component {
  render() {
    const {
      speed,
      paused,
      gridSize,
      handleChange,
      toggleState,
      updateSelectedShape,
      selectedShape,
      zoomLevel,
      updateZoom
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
            <div className="gol__settings--range">
              <label>Zoom - {zoomLevel}</label>
              <input
                type="range"
                name="zoomLevel"
                min={0.5}
                max={2.0}
                value={zoomLevel}
                onChange={handleChange}
                step={0.05}
              />
            </div>
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
