import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeGrid from "./GameOfLifeGrid";
import GameOfLifeSettings from "./GameOfLifeSettings";
// import GameOfLife from "./GameOfLifeHelp";
import GameOfLifeStars from "./GameOfLifeStars";
import patterns from "./patterns";

class GameOfLife extends Component {
  state = {
    speed: 1,
    paused: false,
    randomize: false,
    clear: false,
    gridSize: 400,
    zoomLevel: 0.75,
    selectedPattern: "",
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

  updateDisplayedInfo = displayedInfo => this.setState({ displayedInfo });
  updateHelpPage = currentHelpPage => this.setState({ currentHelpPage });

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
        {/* {displayedInfo === "help" && (
          <GameOfLifeHelp
            updateDisplayedInfo={this.updateDisplayedInfo}
          />
        )} */}
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
          updateDisplayedInfo={this.updateDisplayedInfo}
          displayedInfo={displayedInfo}
          currentHelpPage={currentHelpPage}
          updateHelpPage={this.updateHelpPage}
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
        />
        {/* <GameOfLifeStars /> */}
      </GameOfLifeLayout>
    );
  }
}

export default GameOfLife;
