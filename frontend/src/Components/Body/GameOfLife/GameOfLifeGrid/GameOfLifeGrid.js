import React, { Component } from "react";
import p5 from "p5";

import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GameOfLifeGridContainer from "./GameOfLifeGridContainer";

import shapes from "../shapes";
console.log(shapes);

let grid = [];
let incomingGrid = [];
let resolution = 10;
let numberOfColumns = 0;
let numberOfRows = 0;
let centerX = 0;
let centerY = 0;
const paddingForHeight = 0.84;
let scaleFactor = 1;

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
    this.p5Canvas = new p5(this.Sketch, this.p5Ref);
    this.p5Ref.addEventListener("wheel", e => this.scaleFunctionality(e));
    // this.p5Ref.addEventListener("pointermove", e => this.scaleFunctionality(e));
  };

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
      this.clearGrid();
      toggleState("clear");
    } else if (randomize) {
      this.clearGrid();
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

  scaleFunctionality = e => {
    e.preventDefault();
    if (e.deltaY > 0) scaleFactor *= 1.05;
    else scaleFactor *= 0.95;
  };

  clearGrid = () => {
    for (let colNum = 0; colNum < numberOfColumns; colNum++) {
      for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
        incomingGrid[colNum][rowNum].state = "dead";
      }
    }
    this.p5Canvas.background(0);
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
    console.log("scaleFactor", scaleFactor);

    const xPos = Math.floor(e.layerX / resolution);
    const yPos = Math.floor(e.layerY / resolution);

    let x = (xPos * resolution) / scaleFactor;
    let y = (yPos * resolution) / scaleFactor;
    console.log(xPos, yPos);
    console.log(x, y);
    console.log(xPos * resolution * scaleFactor);

    // if we are clicking the grid to put on a shape
    // use the mouse pos to fill in the surrounding shapes
    if (selectedShape !== "") {
      const currentShape = shapes[selectedShape].config;
      // const centerOfShapeCol = Math.floor(currentShape.length / 2);
      // const centerOfShapeRow = Math.floor(
      //   currentShape[centerOfShapeCol].length / 2
      // );

      for (let row = 0; row < currentShape.length; row++) {
        for (let col = 0; col < currentShape[row].length; col++) {
          // get mouse position
          // and change there depending if alive/not
          // then change the incoming grid
          let state = "dead";
          let fill = 0;
          if (currentShape[row][col] === true) {
            state = "alive";
            fill = 255;
          }

          // if outside of grid when rendering
          if (
            !incomingGrid[xPos + col] ||
            !incomingGrid[xPos + col][yPos + row]
          )
            continue;

          incomingGrid[xPos + col][yPos + row].state = state;
          this.p5Canvas.fill(fill);
          // this.p5Canvas.stroke(0);

          this.p5Canvas.rect(
            x + col * resolution,
            y + row * resolution,
            resolution,
            resolution
          );
        }
      }
    } else {
      console.log(incomingGrid);
      let state = "dead";
      let fill = 0;
      if (grid[xPos][yPos].state === "dead") {
        state = "alive";
        fill = 255;
      }

      incomingGrid[xPos][yPos].state = state;
      this.p5Canvas.fill(fill);
      // this.p5Canvas.stroke(0);
      this.p5Canvas.rect(x, y, resolution, resolution);
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

      numberOfColumns = Math.round((s.width / resolution) * 2);
      numberOfRows = Math.round((s.height / resolution) * 2);
      s.frameRate(speed);

      centerX = Math.floor(numberOfColumns / 2);
      centerY = Math.floor(numberOfRows / 2);

      grid =
        incomingGrid.length < 1
          ? this.setupGrid(numberOfColumns, numberOfRows)
          : incomingGrid;
    };

    s.draw = () => {
      s.background(0);
      s.scale(scaleFactor);
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
            // s.stroke(0);
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
