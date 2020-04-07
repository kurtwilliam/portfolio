import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeGrid from "./GameOfLifeGrid";
import GameOfLifeSettings from "./GameOfLifeSettings";
import GameOfLifeExplanation from "./GameOfLifeExplanation";

class GameOfLife extends Component {
  state = {
    speed: 2,
    paused: false,
    randomize: false,
    clear: false,
    gridSize: 400,
    selectingShape: false,
    selectedShape: ""
  };

  handleChange = e =>
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
  toggleState = e => {
    // if click event, e is normal event
    // if called from grid, e is just a string
    const name = e.target ? e.target.name : e;
    return this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  };

  render() {
    const {
      speed,
      paused,
      gridSize,
      clear,
      randomize,
      selectingShapes,
      selectedShape
    } = this.state;

    return (
      <GameOfLifeLayout>
        <GameOfLifeSettings
          speed={speed}
          paused={paused}
          gridSize={gridSize}
          handleChange={this.handleChange}
          toggleState={this.toggleState}
        />
        <GameOfLifeGrid
          speed={speed}
          paused={paused}
          gridSize={gridSize}
          clear={clear}
          randomize={randomize}
          toggleState={this.toggleState}
          selectingShapes={selectingShapes}
          selectedShape={selectedShape}
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
