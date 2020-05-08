import React, { Component, useEffect } from "react";
import GameOfLifeSettingsLayout from "./GameOfLifeSettingsLayout";
import GameOfLifePatterns from "./GameOfLifePatterns";
import GameOfLifeHelp from "./GameOfLifeHelp";
import LogoGerm from "../assets/LogoGerm";
import LogoGermBig from "../assets/LogoGermBig";
import BacterialColony from "../../../../assets/GameOfLife/BacterialColony.png";
import ControlsContainer from "../assets/ControlsContainer";
// import LogoGerm from "../assets/LogoGerm";

const speedMin = 1;
const speedMax = 60;

const gridMin = 200;
const gridMax = 600;

const zoomMin = 0.25;
const zoomMax = 2;

class GameOfLifeSettings extends Component {
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
          <div className="gol__settings--logo">
            <img src={BacterialColony} />
            <LogoGermBig />
            <LogoGerm />
          </div>
          <div className="gol__settings--container">
            {displayedInfo === "settings" && (
              <>
                <div className="gol__settings--settings">
                  <div className="gol__settings--settings__top">
                    <div className="gol__settings--setting__container">
                      <span className="gol__settings--setting__title">
                        Observe
                      </span>
                      <div className="gol__settings--setting__rangeCont">
                        <div className="gol__settings--setting">
                          <label>
                            Speed <span>{speed}</span>
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
                            Zoom <span>{zoomLevel}</span>
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
                    </div>
                    <div className="gol__settings--setting__container">
                      <span className="gol__settings--setting__title">
                        Colony Controls
                      </span>
                      <div className="gol__settings--setting gol__settings--setting__button">
                        <button
                          className={`${paused ? "pause" : "pause paused"}`}
                          onClick={toggleState}
                          name="paused"
                        ></button>
                        <span>{paused ? "Play" : "Pause"}</span>
                      </div>
                      <div className="gol__settings--setting gol__settings--setting__button">
                        <button onClick={toggleState} name="clear"></button>
                        <span>Clear</span>
                      </div>
                      <div className="gol__settings--setting gol__settings--setting__button">
                        <button onClick={toggleState} name="randomize"></button>
                        <span>Bloom</span>
                      </div>
                    </div>
                  </div>

                  <div className="gol__settings--setting__container gol__settings--setting__containerTouch">
                    <span className="gol__settings--setting__title">
                      Touch Action
                    </span>
                    <div className="gol__settings--setting">
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
                          Pan
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="gol__settings--controls">
                    {/* <ControlsContainer /> */}
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
