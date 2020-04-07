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
    } else if (paused !== true && speed !== prevProps.speed) {
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
      // Calculate middle of grid
      // use this for centered patterns
      const centerX = Math.floor(numberOfColumns / 2);
      const centerY = Math.floor(numberOfRows / 2);

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
      //
      // flourish in center
      newGrid[centerX][centerY].state = "alive";
      newGrid[centerX][centerY - 1].state = "alive";
      newGrid[centerX][centerY + 1].state = "alive";
      newGrid[centerX - 1][centerY].state = "alive";
      newGrid[centerX + 1][centerY].state = "alive";
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

    const handleClick = e => {
      const xPos = Math.floor(e.layerX / resolution);
      const yPos = Math.floor(e.layerY / resolution);

      let x = xPos * resolution;
      let y = yPos * resolution;

      if (grid[xPos][yPos].state === "alive") {
        incomingGrid[xPos][yPos].state = "dead";

        s.fill(0);
        s.stroke(0);
        s.rect(x, y, resolution, resolution);
      } else if (grid[xPos][yPos].state === "dead") {
        incomingGrid[xPos][yPos].state = "alive";

        s.fill(255);
        s.stroke(0);
        s.rect(x, y, resolution, resolution);
      }
    };

    s.setup = () => {
      let canvas = s.createCanvas(w, h).parent(this.p5Ref);

      canvas.mouseClicked(e => handleClick(e));

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

      for (let colNum = 0; colNum < numberOfColumns; colNum++) {
        for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
          if (grid[colNum][rowNum].state === "alive") {
            let x = colNum * resolution;
            let y = rowNum * resolution;

            s.fill(255);
            s.stroke(0);
            s.rect(x, y, resolution, resolution);
          }
        }
      }
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
