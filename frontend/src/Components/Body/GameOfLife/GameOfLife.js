import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeGrid from "./GameOfLifeGrid";
import GameOfLifeSettings from "./GameOfLifeSettings";
import patterns from "./patterns";

import GameOfLifeMidground from "./GameOfLifeMidground";
import GameOfLifeBackground from "./GameOfLifeBackground";

class GameOfLife extends Component {
  state = {
    speed: 1,
    paused: false,
    randomize: false,
    clear: false,
    gridSize: 400,
    zoomLevel: 0.75,
    selectedPattern: "Dot",
    cursorAction: "draw",
    displayedInfo: "settings", // settings patterns help
    currentHelpPage: 0
  };

  handleChange = e =>
    this.setState({
      [e.target.name]:
        e.target.name !== "cursorAction"
          ? parseInt(e.target.value, 10)
          : e.target.value
    });

  toggleState = e => {
    // if click event, e is normal event
    // if called from grid, e is just a string
    const name = e.target ? e.target.name : e;
    return this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  };
  updateSelectedPattern = patternName =>
    this.setState(prevState => ({
      selectedPattern:
        patternName === "" && prevState.selectedPattern === ""
          ? Object.keys(patterns)[0]
          : patternName,
      cursorAction: patternName !== "" ? "draw" : prevState.cursorAction
    }));

  updateZoom = zoom =>
    this.setState({
      zoomLevel: parseFloat(zoom.target ? zoom.target.value : zoom).toFixed(2)
    });

  updateState = (name, value) => this.setState({ [name]: value });

  render() {
    const {
      speed,
      paused,
      gridSize,
      clear,
      randomize,
      zoomLevel,
      selectedPattern,
      cursorAction,
      displayedInfo,
      currentHelpPage
    } = this.state;

    return (
      <GameOfLifeLayout className="gol">
        <GameOfLifeBackground />
        <GameOfLifeMidground>
          <GameOfLifeSettings
            speed={speed}
            paused={paused}
            gridSize={gridSize}
            handleChange={this.handleChange}
            toggleState={this.toggleState}
            selectedPattern={selectedPattern}
            updateSelectedPattern={this.updateSelectedPattern}
            updateZoom={this.updateZoom}
            zoomLevel={zoomLevel}
            cursorAction={cursorAction}
            displayedInfo={displayedInfo}
            currentHelpPage={currentHelpPage}
            updateState={this.updateState}
          />
          <GameOfLifeGrid
            speed={speed}
            paused={paused}
            gridSize={gridSize}
            clear={clear}
            randomize={randomize}
            toggleState={this.toggleState}
            selectedPattern={selectedPattern}
            updateZoom={this.updateZoom}
            zoomLevel={zoomLevel}
            cursorAction={cursorAction}
            currentHelpPage={currentHelpPage}
            displayedInfo={displayedInfo}
            updateState={this.updateState}
          />
        </GameOfLifeMidground>
      </GameOfLifeLayout>
    );
  }
}

export default GameOfLife;
