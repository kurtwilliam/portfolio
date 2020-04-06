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
    gridSize: 400
  };

  handleChange = e =>
    this.setState({ [e.target.name]: parseInt(e.target.value, 10) });
  toggleState = e => {
    const { name } = e.target;
    return this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  };

  render() {
    const { speed, paused, gridSize } = this.state;

    return (
      <GameOfLifeLayout>
        <GameOfLifeSettings
          speed={speed}
          paused={paused}
          gridSize={gridSize}
          handleChange={this.handleChange}
          toggleState={this.toggleState}
        />
        <GameOfLifeGrid speed={speed} paused={paused} gridSize={gridSize} />
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
