import React, { Component } from "react";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GridRow from "./GridRow";
import { numberOfSquaresInGrid } from "../../../../config";

class GameOfLifeGrid extends Component {
  state = {
    grid: [],
    incomingGrid: [],
    shouldUpdate: true
  };

  componentDidMount() {
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

      this.setState({
        grid: newGrid,
        incomingGrid: newGrid,
        shouldUpdate: true
      });

      return this.startTimer();
    }
  }

  recalculateGrid = () => {
    const { incomingGrid } = this.state;
    const newGrid = [...incomingGrid];

    incomingGrid.forEach((row, rowIndex) => {
      row.forEach((square, squareIndex) => {
        let neighbour1 = null;
        let neighbour2 = null;
        let neighbour3 = null;
        let neighbour4 = null;
        let neighbour5 = null;
        let neighbour6 = null;
        let neighbour7 = null;
        let neighbour8 = null;

        if (incomingGrid[rowIndex - 1] !== undefined) {
          if (incomingGrid[rowIndex - 1][squareIndex - 1] !== undefined) {
            neighbour1 = incomingGrid[rowIndex - 1][squareIndex - 1].state;
          }

          neighbour2 = incomingGrid[rowIndex - 1][squareIndex].state;

          if (incomingGrid[rowIndex - 1][squareIndex + 1] !== undefined) {
            neighbour3 = incomingGrid[rowIndex - 1][squareIndex + 1].state;
          }
        }

        if (incomingGrid[rowIndex][squareIndex - 1] !== undefined) {
          neighbour4 = incomingGrid[rowIndex][squareIndex - 1].state;
        }
        if (incomingGrid[rowIndex][squareIndex + 1] !== undefined) {
          neighbour5 = incomingGrid[rowIndex][squareIndex + 1].state;
        }

        if (incomingGrid[rowIndex + 1] !== undefined) {
          if (incomingGrid[rowIndex + 1][squareIndex - 1] !== undefined) {
            neighbour6 = incomingGrid[rowIndex + 1][squareIndex - 1].state;
          }
          neighbour7 = incomingGrid[rowIndex + 1][squareIndex].state;
          if (incomingGrid[rowIndex + 1][squareIndex + 1] !== undefined) {
            neighbour8 = incomingGrid[rowIndex + 1][squareIndex + 1].state;
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
            newGrid[rowIndex][squareIndex].state = "dead";
          }
        }
      });
    });

    this.setState({ grid: newGrid, incomingGrid: newGrid, shouldUpdate: true });
  };

  startTimer = () => window.setInterval(() => this.recalculateGrid(), 10000);

  updateSquare = (rowIndex, squareIndex) => {
    const { incomingGrid } = this.state;

    const newGrid = [...incomingGrid];

    const renderedSquare = document.getElementById(
      `${incomingGrid[rowIndex][squareIndex].id}`
    );

    if (incomingGrid[rowIndex][squareIndex].state === "dead") {
      newGrid[rowIndex][squareIndex].state = "alive";
      renderedSquare.classList.remove("dead");
      renderedSquare.classList.add("alive");
    } else if (incomingGrid[rowIndex][squareIndex].state === "alive") {
      newGrid[rowIndex][squareIndex].state = "dead";
      renderedSquare.classList.remove("alive");
      renderedSquare.classList.add("dead");
    }

    return this.setState({
      incomingGrid: newGrid,
      shouldUpdate: false
    });
  };

  render() {
    const { grid, shouldUpdate } = this.state;
    return (
      <GameOfLifeGridLayout>
        {grid.length > 0 &&
          grid.map((gridRow, rowIndex) => {
            return (
              <GridRow
                key={`${gridRow},${rowIndex}`}
                gridRow={gridRow}
                rowIndex={rowIndex}
                updateSquare={this.updateSquare}
                shouldUpdate={shouldUpdate}
              />
            );
          })}
      </GameOfLifeGridLayout>
    );
  }
}

export default GameOfLifeGrid;
