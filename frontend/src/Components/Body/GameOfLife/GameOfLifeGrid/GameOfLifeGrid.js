import React, { Component } from "react";
import p5 from "p5";

import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GameOfLifeGridContainer from "./GameOfLifeGridContainer";

import shapes from "../shapes";
console.log(shapes);

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
    const {
      speed,
      paused,
      gridSize,
      clear,
      randomize,
      toggleState,
      selectedShape
    } = this.props;

    if (paused !== prevProps.paused) {
      this.p5Canvas.frameRate(paused === true ? 0 : speed);
    } else if (paused !== true && speed !== prevProps.speed) {
      this.p5Canvas.frameRate(speed);
    } else if (clear) {
      grid = [];
      toggleState("clear");
    } else if (randomize) {
      grid = this.createNestedArray(numberOfColumns, numberOfRows, true);
      toggleState("randomize");
    }
    // else if (selectedShape !== prevProps.selectedShape) {

    // }
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

  setupGrid = (numberOfColumns, numberOfRows) => {
    const { toggleState, randomize } = this.props;
    let newGrid = this.createNestedArray(
      numberOfColumns,
      numberOfRows,
      randomize
    );

    if (randomize) toggleState("randomize");

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

  createNestedArray = (cols, rows, shouldRandomize) => {
    let newArray = [];
    for (let colNum = 0; colNum < cols; colNum++) {
      newArray[colNum] = [];
      for (let rowNum = 0; rowNum < rows; rowNum++) {
        newArray[colNum][rowNum] = {
          state:
            shouldRandomize === true
              ? Math.random() < 0.5
                ? "dead"
                : "alive"
              : "dead",
          id: `row${rowNum}col${colNum}`,
          rowId: rowNum,
          colId: colNum
        };
      }
    }
    return newArray;
  };

  handleClick = e => {
    const { selectedShape } = this.props;

    const xPos = Math.floor(e.layerX / resolution);
    const yPos = Math.floor(e.layerY / resolution);

    let x = xPos * resolution;
    let y = yPos * resolution;

    // if we are clicking the grid to put on a shape
    // use the mouse pos to fill in the surrounding shapes
    if (selectedShape !== "") {
      const currentShape = shapes[selectedShape];
      // const centerOfShapeCol = Math.floor(currentShape.length / 2);
      // const centerOfShapeRow = Math.floor(
      //   currentShape[centerOfShapeCol].length / 2
      // );

      for (let row = 0; row < currentShape.length; row++) {
        for (let col = 0; col < currentShape[row].length; col++) {
          // get mouse position
          // and change there depending if alive/not
          // then change the incoming grid
          if (currentShape[row][col] === true) {
            incomingGrid[xPos + col][yPos + row].state = "alive";

            this.p5Canvas.fill(255);
            this.p5Canvas.stroke(0);
            this.p5Canvas.rect(x + col, y + col, resolution, resolution);
          } else {
            incomingGrid[xPos + col][yPos + row].state = "dead";

            this.p5Canvas.fill(0);
            this.p5Canvas.stroke(0);
            this.p5Canvas.rect(x + col, y + col, resolution, resolution);
          }
        }
      }
    } else {
      if (grid[xPos][yPos].state === "alive") {
        incomingGrid[xPos][yPos].state = "dead";

        this.p5Canvas.fill(0);
        this.p5Canvas.stroke(0);
        this.p5Canvas.rect(x, y, resolution, resolution);
      } else if (grid[xPos][yPos].state === "dead") {
        incomingGrid[xPos][yPos].state = "alive";

        this.p5Canvas.fill(255);
        this.p5Canvas.stroke(0);
        this.p5Canvas.rect(x, y, resolution, resolution);
      }
    }
  };

  Sketch = s => {
    const { browserDimensions } = this.state;
    const { speed, selectedShape } = this.props;
    let w = browserDimensions[0];
    let h = browserDimensions[1];

    s.setup = () => {
      let canvas = s.createCanvas(w, h).parent(this.p5Ref);

      canvas.mouseClicked(e => this.handleClick(e));

      numberOfColumns = Math.round(s.width / resolution);
      numberOfRows = Math.round(s.height / resolution);
      s.frameRate(speed);

      grid =
        incomingGrid.length < 1
          ? this.setupGrid(numberOfColumns, numberOfRows)
          : incomingGrid;
    };

    s.draw = () => {
      s.background(0);
      incomingGrid = this.createNestedArray(numberOfColumns, numberOfRows);

      if (grid.length > 0) {
        for (let colNum = 0; colNum < numberOfColumns; colNum++) {
          for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
            let state = grid[colNum][rowNum].state;
            let sumOfAliveNeighbours = this.countNeighbors(
              grid,
              colNum,
              rowNum
            );

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
