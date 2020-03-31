import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeGrid from "./GameOfLifeGrid";
import GameOfLifeSettings from "./GameOfLifeSettings";

class GameOfLife extends Component {
  state = {
    speed: 1000,
    paused: false
  };

  handleChange = e => this.setState({ speed: e.target.value });
  toggleState = () =>
    this.setState(prevState => ({ paused: !prevState.paused }));

  render() {
    const { speed, paused } = this.state;

    return (
      <GameOfLifeLayout>
        <GameOfLifeSettings
          speed={speed}
          paused={paused}
          handleChange={this.handleChange}
          toggleState={this.toggleState}
        />
        <GameOfLifeGrid />
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
