import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeGrid from "./GameOfLifeGrid";
import GameOfLifeSettings from "./GameOfLifeSettings";
import GameOfLifeExplanation from "./GameOfLifeExplanation";
import shapes from "./shapes";

class GameOfLife extends Component {
  state = {
    speed: 2,
    paused: false,
    randomize: false,
    clear: false,
    gridSize: 400,
    zoomLevel: 0.75,
    selectedShape: "",
    cursorAction: "draw"
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
  updateSelectedShape = shapeName =>
    this.setState(prevState => ({
      selectedShape:
        shapeName === "" && prevState.selectedShape === ""
          ? Object.keys(shapes)[0]
          : shapeName,
      cursorAction: shapeName !== "" ? "draw" : prevState.cursorAction
    }));

  updateZoom = zoom => {
    // console.log();
    this.setState({
      zoomLevel: parseFloat(zoom.target ? zoom.target.value : zoom).toFixed(2)
    });
  };

  render() {
    const {
      speed,
      paused,
      gridSize,
      clear,
      randomize,
      zoomLevel,
      selectedShape,
      cursorAction
    } = this.state;
    console.log('paused',paused)

    return (
      <GameOfLifeLayout>
        <GameOfLifeSettings
          speed={speed}
          paused={paused}
          gridSize={gridSize}
          handleChange={this.handleChange}
          toggleState={this.toggleState}
          selectedShape={selectedShape}
          updateSelectedShape={this.updateSelectedShape}
          updateZoom={this.updateZoom}
          zoomLevel={zoomLevel}
          cursorAction={cursorAction}
        />
        <GameOfLifeGrid
          speed={speed}
          paused={paused}
          gridSize={gridSize}
          clear={clear}
          randomize={randomize}
          toggleState={this.toggleState}
          selectedShape={selectedShape}
          updateZoom={this.updateZoom}
          zoomLevel={zoomLevel}
          cursorAction={cursorAction}
        />
        <GameOfLifeExplanation />
      </GameOfLifeLayout>
    );
  }
}

// const GameOfLife = () => {
//   const [grid, gridOverlay] = useState({});
//   return (
//     <GameOfLifeLayout>
//       {/* <GameOfLifeGrid />
//       <GameOfLifeOverlay /> */}
//     </GameOfLifeLayout>
//   );
// };

export default GameOfLife;
