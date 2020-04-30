import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifePatterns from "./GameOfLifePatterns";
import GameOfLifeHelp from "./GameOfLifeHelp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faSearch,
  faBackspace
} from "@fortawesome/free-solid-svg-icons";
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
      updateState,
      theme
    } = this.props;

    return (
      <>
        <GameOfLifeSettingsLayout>
          <div className="gol__settings--container">
            {/* {displayedInfo === "patterns" && ( */}

            {/* )} */}
            {displayedInfo === "settings" && (
              <>
                {/* <div className="gol__settings--setting gol__settings--button">
                  <button
                    onClick={() => this.clickPatterns()}
                    className="gol__settings--patternsButton"
                  ></button>
                  <span>Draw Patterns</span>
                </div> */}
                <div className="gol__settings--setting__container">
                  <span className="gol__settings--setting__title">
                    Grid Settings
                  </span>
                  <div className="gol__settings--setting__rangeCont">
                    <div className="gol__settings--setting">
                      <label>
                        <FontAwesomeIcon icon={faStopwatch} />
                        Speed - {speed} FPS
                      </label>
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
                      <label>
                        <FontAwesomeIcon icon={faSearch} />
                        Zoom - {zoomLevel}
                      </label>
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
                  {/* </div>
                <div className="gol__settings--setting__container"> */}
                  <div className="gol__settings--setting gol__settings--setting__button">
                    <button
                      className={`${
                        paused ? "pause" : "pause paused"
                      } gol__settings--patternsButton`}
                      onClick={toggleState}
                      name="paused"
                    ></button>
                    <span>{paused ? "Play" : "Pause"}</span>
                  </div>
                  <div className="gol__settings--setting gol__settings--setting__button">
                    <button
                      onClick={toggleState}
                      name="clear"
                      className="gol__settings--patternsButton"
                    ></button>
                    <span>
                      {/* <FontAwesomeIcon icon={faBackspace} />*/} Clear
                    </span>
                  </div>
                  <div className="gol__settings--setting gol__settings--setting__button">
                    <button
                      className="gol__settings--patternsButton"
                      onClick={toggleState}
                      name="randomize"
                    ></button>
                    <span>Randomize</span>
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
                          checked={cursorAction === "draw" && true}
                          onChange={handleChange}
                        />
                        <div></div>
                        Draw
                      </label>
                    </div>
                    <div className="gol__settings--setting__radio">
                      <label>
                        <input
                          type="radio"
                          name="cursorAction"
                          value="grab"
                          checked={cursorAction === "grab" && true}
                          onChange={handleChange}
                        />
                        <div></div>
                        Move
                      </label>
                    </div>
                  </div>
                </div>
                <GameOfLifePatterns
                  selectedPattern={selectedPattern}
                  updateSelectedPattern={updateSelectedPattern}
                  updateState={updateState}
                />
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
