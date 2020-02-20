import React, { Component } from "react";
import GameOfLifeLayout from "./GameOfLifeLayout";
import GameOfLifeOverlay from "./GameOfLifeOverlay";
import GameOfLifeGrid from "./GameOfLifeGrid";

class GameOfLife extends Component {
  render() {
    return (
      <GameOfLifeLayout>
        <GameOfLifeGrid />
        <GameOfLifeOverlay />
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
