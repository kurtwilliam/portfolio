import React, { Component } from "react";
import p5 from "p5";

import Draggable from "react-draggable";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GameOfLifeGridContainer from "./GameOfLifeGridContainer";
import GridRow from "./GridRow";

let grid = [];
let incomingGrid = [];
let resolution = 20;
let numberOfColumns = 0;
let numberOfRows = 0;
const paddingForHeight = 0.84;

class GameOfLifeGrid extends Component {
  state = {
    grid: [],
    incomingGrid: [],
    shouldUpdate: true,
    shouldUpdateRowId: null,
    shouldUpdateSquareId: null,
    browserDimensions: [0, 0]
  };

  componentWillMount = () => {
    this.calculateWidthAndHeight();

    window.addEventListener("resize", this.calculateWidthAndHeight);
  };

  componentDidMount = () => (this.p5Canvas = new p5(this.Sketch, this.p5Ref));

  componentDidUpdate = prevProps => {
    const { speed, paused, gridSize } = this.props;
    if (paused !== prevProps.paused) {
      this.p5Canvas.frameRate(paused === true ? 0 : speed);
    } else if (speed !== prevProps.speed) {
      this.p5Canvas.frameRate(speed);
    }
    // if (
    //   gridSize !== prevProps.gridSize
    // ) {
    //   this.p5Canvas.frameRate(speed);
    // }
  };

  calculateWidthAndHeight = () => {
    const { innerWidth: width, innerHeight: height } = window;
    // height calculation for what the
    // settings and explanation sizes are
    return this.setState(
      { browserDimensions: [width, height * paddingForHeight] },
      () => this.p5Canvas.resizeCanvas(width, height)
    );
  };

  setupGrid = (numberOfColumns, numberOfRows, randomize) => {
    let newGrid = this.createNestedArray(
      numberOfColumns,
      numberOfRows,
      randomize
    );

    if (!randomize) {
      // square in top left for testing purposes
      // newGrid[1][1].state = "alive";
      // newGrid[1][2].state = "alive";
      // newGrid[2][1].state = "alive";
      // newGrid[2][2].state = "alive";
      //
      // square in top right for testing purposes
      // newGrid[numberOfColumns - 2][1].state = "alive";
      // newGrid[numberOfColumns - 2][2].state = "alive";
      // newGrid[numberOfColumns - 3][1].state = "alive";
      // newGrid[numberOfColumns - 3][2].state = "alive";
    }

    return newGrid;
  };

  createNestedArray = (cols, rows, randomize) => {
    let newArray = [];
    for (let colNum = 0; colNum < cols; colNum++) {
      newArray[colNum] = [];
      for (let rowNum = 0; rowNum < rows; rowNum++) {
        newArray[colNum][rowNum] = {
          state:
            randomize === true
              ? Math.random() < 0.5
                ? "dead"
                : "alive"
              : null,
          id: `row${rowNum}col${colNum}`,
          rowId: rowNum,
          colId: colNum
        };
      }
    }
    return newArray;
  };

  Sketch = s => {
    const { browserDimensions } = this.state;
    const { speed } = this.props;
    let w = browserDimensions[0];
    let h = browserDimensions[1];

    const getMousePosition = e => {
      const xPos = Math.floor(e.layerX / resolution);
      const yPos = Math.floor(e.layerY / resolution);

      let x = xPos * resolution;
      let y = yPos * resolution;

      if (grid[xPos][yPos].state === "alive") {
        grid[xPos][yPos].state = "dead";

        s.fill(0);
        s.stroke(0);
        s.rect(x, y, resolution, resolution);
      } else if (grid[xPos][yPos].state === "dead") {
        grid[xPos][yPos].state = "alive";

        s.fill(255);
        s.stroke(0);
        s.rect(x, y, resolution, resolution);
      }
    };

    s.setup = () => {
      let canvas = s.createCanvas(w, h).parent(this.p5Ref);

      canvas.mouseClicked(e => getMousePosition(e));

      numberOfColumns = Math.round(s.width / resolution);
      numberOfRows = Math.round(s.height / resolution);
      s.frameRate(speed);

      grid =
        incomingGrid.length < 1
          ? // ? this.createNestedArray(numberOfColumns, numberOfRows, true)
            this.setupGrid(numberOfColumns, numberOfRows, false)
          : incomingGrid;
    };

    s.draw = () => {
      s.background(0);

      for (let colNum = 0; colNum < numberOfColumns; colNum++) {
        for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
          let x = colNum * resolution;
          let y = rowNum * resolution;
          if (grid[colNum][rowNum].state === "alive") {
            s.fill(255);
            s.stroke(0);
            s.rect(x, y, resolution, resolution);
          }
        }
      }
      incomingGrid = this.createNestedArray(numberOfColumns, numberOfRows);

      for (let colNum = 0; colNum < numberOfColumns; colNum++) {
        for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
          let state = grid[colNum][rowNum].state;
          let sumOfAliveNeighbours = this.countNeighbors(grid, colNum, rowNum);

          let stateToUpdateTo = "";
          if (state === "alive") {
            if (sumOfAliveNeighbours <= 1) {
              stateToUpdateTo = "dead";
            } else if (sumOfAliveNeighbours > 1 && sumOfAliveNeighbours < 4) {
              stateToUpdateTo = "alive";
            } else if (sumOfAliveNeighbours >= 4) {
              stateToUpdateTo = "dead";
            }
          } else {
            if (sumOfAliveNeighbours === 3) {
              stateToUpdateTo = "alive";
            } else {
              stateToUpdateTo = "dead";
            }
          }
          incomingGrid[colNum][rowNum].state = stateToUpdateTo;
        }
      }

      grid = incomingGrid;
    };

    const windowResized = () => {
      return s.resizeCanvas(w, h);
    };

    this.Sketch.windowResized = windowResized;
  };

  countNeighbors = (grid, x, y) => {
    let sumOfAliveNeighbours = 0;
    // -1 to +1 of x position of this square
    for (let i = -1; i < 2; i++) {
      // -1 to +1 of y position of this square
      for (let j = -1; j < 2; j++) {
        let xCoord = x + i;
        let yCoord = y + j;

        // check if coordinates are in grid
        // and its not current square
        if (
          grid[xCoord] === undefined ||
          grid[xCoord][yCoord] === undefined ||
          (i === 0 && j === 0)
        )
          continue;

        // if neighbour is alive and it's not the current square
        if (grid[xCoord][yCoord].state === "alive") {
          sumOfAliveNeighbours += 1;
        }
      }
    }

    return sumOfAliveNeighbours;
  };

  render() {
    return (
      <GameOfLifeGridContainer>
        <GameOfLifeGridLayout ref={ref => (this.p5Ref = ref)} />
      </GameOfLifeGridContainer>
    );
  }
}

export default GameOfLifeGrid;

// componentDidMount() {
//   const { grid } = this.state;
//   const { gridSize } = this.props;

//   if (grid.length < 1) {
//     const newGrid = [...grid];
//     for (let row = 0; row < gridSize / 10; row++) {
//       newGrid[row] = [];

//       // make squares in row
//       for (let square = 0; square < gridSize / 10; square++) {
//         newGrid[row][square] = {
//           state: "dead",
//           id: `row${row}square${square}`,
//           rowId: row,
//           squareId: square
//         };
//       }
//     }

//     // Initial pretty grid set up!
//     newGrid[5][5].state = "alive";
//     newGrid[4][5].state = "alive";
//     newGrid[5][4].state = "alive";
//     newGrid[6][5].state = "alive";
//     newGrid[5][6].state = "alive";

//     this.setState({
//       grid: newGrid,
//       incomingGrid: newGrid,
//       shouldUpdate: true
//     });

//     return this.startTimer();
//   }
// }

// componentDidUpdate(prevProps) {
//   const { speed, paused, gridSize } = this.props;

//   if (speed !== prevProps.speed || paused !== prevProps.paused) {
//     this.clearThenResetSpeedUnlessPaused();
//   }
//   if (gridSize !== prevProps.gridSize) {
//     this.resizeGrid();
//   }
// }

// clearThenResetSpeedUnlessPaused = () => {
//   const { speed, paused } = this.props;

//   if (this.recalculateInterval) clearInterval(this.recalculateInterval);

//   if (!paused) {
//     return (this.recalculateInterval = setInterval(
//       () => this.recalculateGrid(),
//       speed
//     ));
//   }
// };

// resizeGrid = () => {
//   const { gridSize } = this.props;
//   const { incomingGrid } = this.state;

//   const newGrid = [...incomingGrid];

//   const gridRowSize = gridSize / 10;

//   const difference = newGrid.length - gridRowSize;

//   if (difference < 0) {
//     for (let row = 0; row < gridRowSize; row++) {
//       newGrid[row] = incomingGrid[row] ? incomingGrid[row] : [];

//       // make squares in row
//       for (let square = 0; square < gridRowSize; square++) {
//         if (typeof newGrid[row][square] !== "object") {
//           newGrid[row][square] = {
//             state: "dead",
//             id: `row${row}square${square}`,
//             rowId: row,
//             squareId: square
//           };
//         }
//       }
//     }
//   } else {
//     newGrid.length = gridRowSize;

//     for (let row = 0; row < gridRowSize; row++) {
//       newGrid[row].length = gridRowSize;
//     }
//   }

//   this.setState({ grid: newGrid, incomingGrid: newGrid });
// };

// recalculateGrid = () => {
//   const { incomingGrid } = this.state;
//   const newGrid = [];

//   incomingGrid.forEach((row, rowIndex) => {
//     row.forEach((square, squareIndex) => {
//       // figure out all neighbours for each square
//       let neighbour1 = null;
//       let neighbour2 = null;
//       let neighbour3 = null;
//       let neighbour4 = null;
//       let neighbour5 = null;
//       let neighbour6 = null;
//       let neighbour7 = null;
//       let neighbour8 = null;

//       // all these if statements figure out
//       // whether or not the neighbour at that coordinate exists
//       // then whether or not it's alive/dead
//       if (incomingGrid[rowIndex - 1] !== undefined) {
//         if (incomingGrid[rowIndex - 1][squareIndex - 1] !== undefined) {
//           neighbour1 = incomingGrid[rowIndex - 1][squareIndex - 1].state;
//         }

//         neighbour2 = incomingGrid[rowIndex - 1][squareIndex].state;

//         if (incomingGrid[rowIndex - 1][squareIndex + 1] !== undefined) {
//           neighbour3 = incomingGrid[rowIndex - 1][squareIndex + 1].state;
//         }
//       }

//       if (incomingGrid[rowIndex][squareIndex - 1] !== undefined) {
//         neighbour4 = incomingGrid[rowIndex][squareIndex - 1].state;
//       }
//       if (incomingGrid[rowIndex][squareIndex + 1] !== undefined) {
//         neighbour5 = incomingGrid[rowIndex][squareIndex + 1].state;
//       }

//       if (incomingGrid[rowIndex + 1] !== undefined) {
//         if (incomingGrid[rowIndex + 1][squareIndex - 1] !== undefined) {
//           neighbour6 = incomingGrid[rowIndex + 1][squareIndex - 1].state;
//         }
//         neighbour7 = incomingGrid[rowIndex + 1][squareIndex].state;
//         if (incomingGrid[rowIndex + 1][squareIndex + 1] !== undefined) {
//           neighbour8 = incomingGrid[rowIndex + 1][squareIndex + 1].state;
//         }
//       }

//       // put all neighbours into an array
//       // then count number of neighbours alive
//       const neighbours = [
//         neighbour1,
//         neighbour2,
//         neighbour3,
//         neighbour4,
//         neighbour5,
//         neighbour6,
//         neighbour7,
//         neighbour8
//       ];

//       let sumOfAliveNeighbours = 0;

//       for (let i = 0; i < neighbours.length; i++) {
//         const neighbour = neighbours[i];

//         if (neighbour === "alive") {
//           sumOfAliveNeighbours += 1;
//         }
//       }

//       let stateToUpdateTo = "";

//       if (square.state === "alive") {
//         if (sumOfAliveNeighbours <= 1) {
//           stateToUpdateTo = "dead";
//         } else if (sumOfAliveNeighbours > 1 && sumOfAliveNeighbours < 4) {
//           stateToUpdateTo = "alive";
//         } else if (sumOfAliveNeighbours >= 4) {
//           stateToUpdateTo = "dead";
//         }
//       } else {
//         if (sumOfAliveNeighbours === 3) {
//           stateToUpdateTo = "alive";
//         } else {
//           stateToUpdateTo = "dead";
//         }
//       }

//       // lets add to newGrid!
//       // if this row is undefined, create it
//       // then push new square to it
//       if (newGrid[rowIndex] === undefined) {
//         newGrid[rowIndex] = [];
//       }

//       newGrid[rowIndex][squareIndex] = {
//         ...incomingGrid[rowIndex][squareIndex],
//         state: stateToUpdateTo
//       };
//     });
//   });

//   this.setState({
//     shouldUpdateRowId: null,
//     shouldUpdateSquareId: null,
//     grid: newGrid,
//     incomingGrid: newGrid,
//     shouldUpdate: true
//   });
// };

// startTimer = () =>
//   (this.recalculateInterval = setInterval(
//     () => this.recalculateGrid(),
//     this.props.speed
//   ));

// updateSquare = (rowIndex, squareIndex) => {
//   const { incomingGrid } = this.state;

//   const newGrid = [...incomingGrid];

//   let nextSquareState = "dead";
//   if (incomingGrid[rowIndex][squareIndex].state === "dead") {
//     nextSquareState = "alive";
//   }

//   newGrid[rowIndex][squareIndex].state = nextSquareState;

//   return this.setState({
//     incomingGrid: newGrid,
//     shouldUpdate: false,
//     shouldUpdateRowId: rowIndex,
//     shouldUpdateSquareId: squareIndex
//   });
// };
