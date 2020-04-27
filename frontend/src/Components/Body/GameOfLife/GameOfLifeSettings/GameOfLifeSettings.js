import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifePatterns from "./GameOfLifePatterns";
import GameOfLifeHelp from "./GameOfLifeHelp";

// import GridSquare from "../GameOfLifeGrid/GridRow/GridSquare";

const speedMin = 1;
const speedMax = 60;

const gridMin = 200;
const gridMax = 600;

const zoomMin = 0.25;
const zoomMax = 2;

class GameOfLifeSettings extends Component {
  clickPatterns = () => {
    const { updateSelectedPattern, updateState } = this.props;
    updateSelectedPattern("");
    updateState("displayedInfo", "patterns");
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
      currentHelpPage,
      updateState
    } = this.props;

    return (
      <>
        <GameOfLifeSettingsLayout>
          <div className="gol__settings--container">
            {displayedInfo === "patterns" && (
              <GameOfLifePatterns
                selectedPattern={selectedPattern}
                updateSelectedPattern={updateSelectedPattern}
                updateState={updateState}
              />
            )}
            {displayedInfo === "settings" && (
              <>
                <div className="gol__settings--setting gol__settings--button">
                  <button
                    onClick={() => this.clickPatterns()}
                    className="gol__settings--patternsButton"
                  ></button>
                  <span>Draw Patterns</span>
                </div>
                <div className="gol__settings--setting__container">
                  <span className="gol__settings--setting__title">
                    Grid Settings
                  </span>
                  <div className="gol__settings--setting">
                    <button
                      className={`${paused ? "pause" : "pause paused"}`}
                      onClick={toggleState}
                      name="paused"
                    ></button>
                  </div>
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
                  {/* </div>
                <div className="gol__settings--setting__container"> */}
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

                <div className="gol__settings--setting__container">
                  <div className="gol__settings--setting">
                    <span className="gol__settings--setting__title">
                      Touch Action
                    </span>
                    <div className="gol__settings--setting__radio">
                      <label>
                        <input
                          type="radio"
                          name="cursorAction"
                          value="draw"
                          defaultChecked
                          onChange={handleChange}
                        />
                        Draw
                      </label>
                    </div>
                    <div className="gol__settings--setting__radio">
                      <label>
                        <input
                          type="radio"
                          name="cursorAction"
                          value="grab"
                          onChange={handleChange}
                        />
                        Move
                      </label>
                    </div>
                  </div>
                </div>
                <div className="gol__settings--setting">
                  <button
                    onClick={() => updateState("displayedInfo", "help")}
                    name="randomize"
                  >
                    What is this?
                  </button>
                </div>
              </>
            )}
            {displayedInfo === "help" && (
              <GameOfLifeHelp
                selectedPattern={selectedPattern}
                updateSelectedPattern={updateSelectedPattern}
                updateState={updateState}
                currentHelpPage={currentHelpPage}
              />
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
