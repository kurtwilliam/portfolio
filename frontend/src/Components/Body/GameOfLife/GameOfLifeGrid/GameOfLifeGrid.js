import React, { Component } from "react";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GridRow from "./GridRow";
import { numberOfSquaresInGrid } from "../../../../config";

class GameOfLifeGrid extends Component {
  state = {
    grid: [],
    incomingGrid: [],
    shouldUpdate: true,
    shouldUpdateRowId: null,
    shouldUpdateSquareId: null
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
            id: `row${row}square${square}`,
            rowId: row,
            squareId: square
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

    // console.log(incomingGrid[0][0]);

    incomingGrid.forEach((row, rowIndex) => {
      row.forEach((square, squareIndex) => {
        // figure out all neighbours for each square
        let neighbour1 = null;
        let neighbour2 = null;
        let neighbour3 = null;
        let neighbour4 = null;
        let neighbour5 = null;
        let neighbour6 = null;
        let neighbour7 = null;
        let neighbour8 = null;

        // all these if statements figure out
        // whether or not the neighbour at that coordinate exists
        // then whether or not it's alive/dead
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

        // put all neighbours into an array
        // then count number of neighbours alive
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
        // console.log("square", square);
        // console.log("neighbours", neighbours);

        let sumOfAliveNeighbours = 0;

        for (let i = 0; i < neighbours.length; i++) {
          const neighbour = neighbours[i];

          if (neighbour === "alive") {
            sumOfAliveNeighbours += 1;
          }
        }

        // if current square is alive
        if (square.state === "alive") {
          if (sumOfAliveNeighbours <= 1) {
            newGrid[rowIndex][squareIndex].state = "dead";
          } else if (sumOfAliveNeighbours > 1 && sumOfAliveNeighbours < 4) {
            newGrid[rowIndex][squareIndex].state = "alive";
          } else if (sumOfAliveNeighbours >= 4) {
            newGrid[rowIndex][squareIndex].state = "dead";
          }
          // else current square is dead
        } else {
          if (sumOfAliveNeighbours === 3) {
            newGrid[rowIndex][squareIndex].state = "alive";
          } else {
            newGrid[rowIndex][squareIndex].state = "dead";
          }
        }
      });
    });

    this.setState({
      shouldUpdateRowId: null,
      shouldUpdateSquareId: null,
      grid: newGrid,
      incomingGrid: newGrid,
      shouldUpdate: true
    });
  };

  startTimer = () => window.setInterval(() => this.recalculateGrid(), 8000);

  updateSquare = (rowIndex, squareIndex) => {
    const { incomingGrid } = this.state;

    const newGrid = [...incomingGrid];

    console.log("UPDATE ME", rowIndex, squareIndex);

    if (incomingGrid[rowIndex][squareIndex].state === "dead") {
      newGrid[rowIndex][squareIndex].state = "alive";
    } else if (incomingGrid[rowIndex][squareIndex].state === "alive") {
      newGrid[rowIndex][squareIndex].state = "dead";
    }

    return this.setState({
      incomingGrid: newGrid,
      shouldUpdate: false,
      shouldUpdateRowId: rowIndex,
      shouldUpdateSquareId: squareIndex
    });
  };

  render() {
    const {
      grid,
      shouldUpdate,
      shouldUpdateRowId,
      shouldUpdateSquareId
    } = this.state;
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
                shouldUpdateRowId={shouldUpdateRowId}
                shouldUpdateSquareId={shouldUpdateSquareId}
              />
            );
          })}
      </GameOfLifeGridLayout>
    );
  }
}

export default GameOfLifeGrid;
