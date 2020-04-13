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
let xPosition = 0; // pan x and y
let yPosition = 0;
let mouseX = 0;
let mouseY = 0;
let zoomLevelVar = 1;
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
      selectedShape,
      zoomLevel
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
    } else if (zoomLevel !== prevProps.zoomLevel) {
      zoomLevelVar = zoomLevel;
      this.p5Canvas.scale(zoomLevelVar);
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
    const { zoomLevel, updateZoom } = this.props;
    e.preventDefault();

    let newZoomLevel = zoomLevel;
    if (e.deltaY > 0) {
      newZoomLevel += 0.05;
      if (newZoomLevel >= 2) newZoomLevel = 2;
    } else {
      newZoomLevel -= 0.05;
      if (newZoomLevel <= 0.5) newZoomLevel = 0.5;
    }

    newZoomLevel = parseFloat(newZoomLevel).toFixed(2);

    this.p5Canvas.scale(newZoomLevel);
    updateZoom(newZoomLevel);
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
    const { selectedShape, zoomLevel } = this.props;
    const clickPosX = e.layerX;
    const clickPosY = e.layerY;

    // we want to know what square we pressed
    // so we need to take into account where user clicked on canvas (clickPos),
    // the size of square (resolution), how big the canvas is scaled (zoomLevel)
    const xPos = Math.floor(clickPosX / resolution / zoomLevel);
    const yPos = Math.floor(clickPosY / resolution / zoomLevel);

    let x = xPos * resolution;
    let y = yPos * resolution;
    console.log(xPos, yPos);
    console.log(x, y);
    console.log(xPos * resolution * zoomLevel);

    // if we are clicking the grid to put on a shape
    // use the mouse pos to fill in the surrounding shapes
    const currentShape =
      selectedShape === ""
        ? shapes["Dot"].config
        : shapes[selectedShape].config;
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
        if (!incomingGrid[xPos + col] || !incomingGrid[xPos + col][yPos + row])
          continue;

        incomingGrid[xPos + col][yPos + row].state = state;
        this.p5Canvas.fill(fill);
        this.p5Canvas.stroke(0);

        this.p5Canvas.rect(
          x + (col * resolution) / zoomLevel,
          y + (row * resolution) / zoomLevel,
          resolution - 1,
          resolution - 1
        );
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

      // add click event for adding squares
      canvas.mouseClicked(e => this.handleClick(e));

      // figure out how big canvas should be
      numberOfColumns = Math.round((s.width / resolution) * 2);
      numberOfRows = Math.round((s.height / resolution) * 2);

      // set framerate depending on speed
      s.frameRate(speed);

      // get center of canvas
      centerX = Math.floor(numberOfColumns / 2);
      centerY = Math.floor(numberOfRows / 2);

      // set center of canvas to be center of screen
      xPosition = centerX / 2;
      yPosition = centerY / 2;

      grid =
        incomingGrid.length < 1
          ? this.setupGrid(numberOfColumns, numberOfRows)
          : incomingGrid;
    };

    s.draw = () => {
      s.background(0);
      s.scale(zoomLevelVar);

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
            s.rect(x, y, resolution - 1, resolution - 1);
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
