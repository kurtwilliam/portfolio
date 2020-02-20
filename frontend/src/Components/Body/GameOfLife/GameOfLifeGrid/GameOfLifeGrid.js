import React, { Component } from "react";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GridRow from "./GridRow";
import { numberOfSquaresInGrid } from "../../../../config";

class GameOfLifeGrid extends Component {
  state = {
    grid: []
  };

  componentDidMount() {
    console.log("componentDidMount");
    const { grid } = this.state;

    if (grid.length < 1) {
      const newGrid = [...grid];
      for (let row = 0; row < numberOfSquaresInGrid / 10; row++) {
        newGrid[row] = [];

        // make squares in row
        for (let square = 0; square < numberOfSquaresInGrid / 10; square++) {
          newGrid[row][square] = {
            state: "dead",
            id: `row${row}square${square}`
          };
        }
      }
      this.setState({ grid: newGrid });
    }
  }

  recalculateGrid = () => {
    const { grid } = this.state;
    const newGrid = [...grid];

    grid.forEach((row, rowIndex) => {
      row.forEach((square, squareIndex) => {
        let neighbour1 = null;
        let neighbour2 = null;
        let neighbour3 = null;
        let neighbour4 = null;
        let neighbour5 = null;
        let neighbour6 = null;
        let neighbour7 = null;
        let neighbour8 = null;

        if (grid[rowIndex - 1] !== undefined) {
          if (grid[rowIndex - 1][squareIndex - 1] !== undefined) {
            neighbour1 = grid[rowIndex - 1][squareIndex - 1];
          }

          neighbour2 = grid[rowIndex - 1][squareIndex];

          if (grid[rowIndex - 1][squareIndex + 1] !== undefined) {
            neighbour3 = grid[rowIndex - 1][squareIndex + 1];
          }
        }

        if (grid[rowIndex][squareIndex - 1] !== undefined) {
          neighbour4 = grid[rowIndex][squareIndex - 1];
        }
        if (grid[rowIndex][squareIndex + 1] !== undefined) {
          neighbour5 = grid[rowIndex][squareIndex + 1];
        }

        if (grid[rowIndex + 1] !== undefined) {
          if (grid[rowIndex + 1][squareIndex - 1] !== undefined) {
            neighbour6 = grid[rowIndex + 1][squareIndex - 1];
          }
          neighbour7 = grid[rowIndex + 1][squareIndex];
          if (grid[rowIndex + 1][squareIndex + 1] !== undefined) {
            neighbour8 = grid[rowIndex + 1][squareIndex + 1];
          }
        }

        const neighbours = [
          neighbour1,
          neighbour2,
          neighbour3,
          neighbour4,
          neighbour5,
          neighbour6,
          neighbour7,
          neighbour8
        ];

        let sumOfAliveNeighbours = 0;

        for (let i = 0; i < neighbours.length; i++) {
          const neighbour = neighbours[i];
          if (neighbour === true) sumOfAliveNeighbours += 1;
        }

        if (square === true) {
          if (sumOfAliveNeighbours <= 1) {
            newGrid[rowIndex][squareIndex].state = "dead";
          } else if (sumOfAliveNeighbours > 1 && sumOfAliveNeighbours < 4) {
            newGrid[rowIndex][squareIndex].state = true;
          } else if (sumOfAliveNeighbours >= 4) {
            newGrid[rowIndex][squareIndex].state = "dead";
          }
        } else {
          if (sumOfAliveNeighbours === 3) {
            newGrid[rowIndex][squareIndex].state = true;
          } else {
            newGrid[rowIndex][squareIndex] = "dead";
          }
        }
      });
    });

    this.setState({ grid: newGrid });
  };

  startTimer = () => window.setInterval(() => this.recalculateGrid(), 2000);

  updateSquare = (rowIndex, squareIndex) => {
    const { grid } = this.state;

    const newGrid = [...grid];

    if (grid[rowIndex][squareIndex].state === "dead") {
      newGrid[rowIndex][squareIndex].state = "alive";
    } else if (grid[rowIndex][squareIndex].state === "alive") {
      newGrid[rowIndex][squareIndex].state = "dead";
    }

    // console.log(newGrid[rowIndex][squareIndex].state);

    return this.setState({ grid: newGrid });
  };

  render() {
    const { grid } = this.state;
    return (
      <GameOfLifeGridLayout>
        {grid.length > 0 &&
          grid.map((gridRow, rowIndex) => {
            return (
              <GridRow
                key={rowIndex}
                gridRow={gridRow}
                rowIndex={rowIndex}
                updateSquare={this.updateSquare}
              />
            );
          })}
      </GameOfLifeGridLayout>
    );
  }
}

export default GameOfLifeGrid;
