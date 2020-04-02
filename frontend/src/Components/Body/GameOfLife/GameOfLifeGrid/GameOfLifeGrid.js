import React, { Component } from "react";
import p5 from "p5";

import Draggable from "react-draggable";
import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GameOfLifeGridContainer from "./GameOfLifeGridContainer";
import GridRow from "./GridRow";

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

  componentDidMount = () => {
    this.p5Canvas = new p5(this.Sketch, this.p5Ref.current);
  };

  calculateWidthAndHeight = () => {
    const { innerWidth: width, innerHeight: height } = window;
    console.log(width, height);
    return this.setState(
      { browserDimensions: [width, height] },
      () => this.Sketch
    );
  };

  Sketch = s => {
    const { browserDimensions } = this.state;
    let w = browserDimensions[0];
    let h = browserDimensions[1];

    s.setup = () => {
      s.createCanvas(w, h);
    };

    // .scale() for zooming

    s.draw = () => {
      s.background(0);
      s.fill(255);
      s.rect(100, 100, 50, 50);
    };
  };

  render() {
    // const {
    //   grid,
    //   shouldUpdate,
    //   shouldUpdateRowId,
    //   shouldUpdateSquareId
    // } = this.state;
    return (
      <GameOfLifeGridContainer>
        <GameOfLifeGridLayout ref={ref => (this.p5Ref = ref)} />

        {/* <Draggable bounds="parent">
        <GameOfLifeGridLayout>
          {grid.length > 0 &&
            grid.map((gridRow, rowIndex) => (
              <GridRow
                key={`${gridRow},${rowIndex}`}
                gridRow={gridRow}
                rowIndex={rowIndex}
                updateSquare={this.updateSquare}
                shouldUpdate={shouldUpdate}
                shouldUpdateRowId={shouldUpdateRowId}
                shouldUpdateSquareId={shouldUpdateSquareId}
              />
            ))}
        </GameOfLifeGridLayout>
        </Draggable> */}
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
