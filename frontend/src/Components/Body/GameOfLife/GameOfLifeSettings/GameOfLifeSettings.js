import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifePatterns from "./GameOfLifePatterns";
// import GridSquare from "../GameOfLifeGrid/GridRow/GridSquare";

const speedMin = 1;
const speedMax = 60;

const gridMin = 200;
const gridMax = 600;

const zoomMin = 0.25;
const zoomMax = 2;

class GameOfLifeSettings extends Component {
  clickPatterns = () => {
    const { updateSelectedPattern, updateDisplayedInfo } = this.props;
    updateSelectedPattern("");
    updateDisplayedInfo("patterns");
  };

  render() {
    const {
      speed,
      paused,
      gridSize,
      handleChange,
      toggleState,
      updateSelectedPattern,
      selectedPattern,
      zoomLevel,
      updateZoom,
      displayedInfo,
      cursorAction,
      updateDisplayedInfo
    } = this.props;
    console.log(displayedInfo);
    return (
      <>
        <GameOfLifeSettingsLayout>
          <div className="gol__settings--container">
            {displayedInfo === "patterns" ? (
              <GameOfLifePatterns
                selectedPattern={selectedPattern}
                updateSelectedPattern={updateSelectedPattern}
                updateDisplayedInfo={updateDisplayedInfo}
              />
            ) : (
              <>
                <div className="gol__settings--setting">
                  <button onClick={() => this.clickPatterns()}>
                    Add Patterns
                  </button>
                </div>
                <button
                  className={`${paused ? "pause" : "pause paused"}`}
                  onClick={toggleState}
                  name="paused"
                ></button>
                <div className="gol__settings--setting__container">
                  <div className="gol__settings--setting">
                    <label>Speed - {speed} FPS</label>
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
                  <div className="gol__settings--setting">
                    <label>Zoom - {zoomLevel}</label>
                    <input
                      type="range"
                      name="zoomLevel"
                      min={zoomMin}
                      max={zoomMax}
                      value={zoomLevel}
                      onChange={updateZoom}
                      step={0.05}
                    />
                  </div>
                </div>
                <div className="gol__settings--setting__container">
                  <div className="gol__settings--setting">
                    <button onClick={toggleState} name="clear">
                      Clear
                    </button>
                  </div>
                  <div className="gol__settings--setting">
                    <button onClick={toggleState} name="randomize">
                      Randomize
                    </button>
                  </div>
                </div>

                <div className="gol__settings--setting">
                  <span>Touch Action</span>
                  <div className="gol__settings--setting__radio">
                    <label>
                      Draw
                      <input
                        type="radio"
                        name="cursorAction"
                        value="draw"
                        defaultChecked
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className="gol__settings--setting__radio">
                    <label>
                      Move
                      <input
                        type="radio"
                        name="cursorAction"
                        value="grab"
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="gol__settings--setting">
                  <button
                    onClick={() => updateDisplayedInfo("help")}
                    name="randomize"
                  >
                    ?
                  </button>
                </div>
              </>
            )}
          </div>
          {/* <label>Zoom</label>
        <input /> */}
        </GameOfLifeSettingsLayout>
      </>
    );
  }
}

export default GameOfLifeSettings;
