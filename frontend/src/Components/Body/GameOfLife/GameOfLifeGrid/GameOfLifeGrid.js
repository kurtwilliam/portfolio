import React, { Component } from "react";
import p5 from "p5";

import GameOfLifeGridLayout from "./GameOfLifeGridLayout";
import GameOfLifeGridContainer from "./GameOfLifeGridContainer";

import shapes from "../shapes";

// variables that change for drawing
let grid = [];
// let incomingGrid = [];
let resolution = 10;
let numberOfColumns = 0;
let numberOfRows = 0;
let centerX = 0;
let centerY = 0;
let speedVar = 0;
const paddingForHeight = 0.84;

let zoomLevelVar = 1;

// affects # col and # rows - affects performance
const gridSizeMultiplier = 2.5;

// for figuring out if it is a click for drawing
let clickStartX = null;
let clickStartY = null;

// dimensions of browser - includes padding on top and bottom!
let browserWidth = 0;
let browserHeight = 0;

// where does the canvas sit on screen and its dimensions
let canvasXPos = 0;
let canvasYPos = 0;
let canvasWidth = 0;
let canvasHeight = 0;

// Size of the Grid (can be bigger/smaller depending on No of col/rows/zoom)
let gridXPos = 0; // pan x and y
let gridYPos = 0;
let gridWidth = 0;
let gridHeight = 0;

// Is the mouse draw or grab?
let cursorState = "";

// Bool to change grid without recalculating grid
let redrawCanvas = false;

// For counting neighbour conditions
let minAliveNeighbours = 2;
let maxAliveNeighbours = 3;
let minDeadNeighbours = 3;
let maxDeadNeighbours = 3;

class GameOfLifeGrid extends Component {
  state = {
    grid: [],
    shouldUpdate: true,
    shouldUpdateRowId: null,
    shouldUpdateSquareId: null,
    browserDimensions: [0, 0]
  };

  componentWillMount = () => {
    const { speed, zoomLevel, cursorAction } = this.props;
    this.calculateWidthAndHeight();
    speedVar = speed;
    zoomLevelVar = zoomLevel;
    cursorState = cursorAction;
    window.addEventListener("resize", this.calculateWidthAndHeight);
  };

  componentDidMount = () => {
    this.p5Canvas = new p5(this.Sketch, this.p5Ref);

    this.p5Ref.addEventListener("mousedown", e => this.mousePressed(e));
    this.p5Ref.addEventListener("mouseup", e => this.mouseReleased(e));

    // canvas.mouseReleased(e => this.mouseReleased(e));
    // this.p5Ref.addEventListener("wheel", e => this.scaleFunctionality(e));
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
      zoomLevel,
      cursorAction
    } = this.props;

    if (paused !== prevProps.paused) {
      this.p5Canvas.frameRate(paused === true ? 0 : speed);
    } else if (paused !== true && speed !== prevProps.speed) {
      speedVar = speed;
      this.p5Canvas.frameRate(speedVar);
    } else if (clear) {
      this.clearGrid();
      toggleState("clear");
    } else if (randomize) {
      this.clearGrid();
      grid = this.createNestedArray(numberOfColumns, numberOfRows, true);
      toggleState("randomize");
    } else if (zoomLevel !== prevProps.zoomLevel) {
      zoomLevelVar = zoomLevel;

      this.checkGridFitsScreen();
    } else if (cursorAction !== prevProps.cursorAction) {
      cursorState = cursorAction;
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
    const { zoomLevel } = this.props;
    e.preventDefault();

    zoomLevelVar = parseFloat(zoomLevel);
    if (e.deltaY > 0) {
      zoomLevelVar += 0.05;
      if (zoomLevelVar >= 2) zoomLevelVar = 2;
    } else {
      zoomLevelVar -= 0.05;
      if (zoomLevelVar <= 0.25) zoomLevelVar = 0.25;
    }

    // before we actually reflect the new zoom, we need to confirm
    // it's still within the screen.
    this.checkGridFitsScreen();
  };

  checkGridFitsScreen = () => {
    this.calculateGridWidthAndHeight();
    if (this.isCanvasSmallerThanScreen()) {
      this.fitGridToScreen();
      this.calculateGridWidthAndHeight();
    }
    this.recalculatePosition(null, null, true);
    this.props.updateZoom(zoomLevelVar);
    return this.p5Canvas.scale(zoomLevelVar);
  };

  fitGridToScreen = () =>
    (zoomLevelVar = (canvasWidth / (numberOfColumns * resolution)).toFixed(2));

  clearGrid = () => {
    for (let colNum = 0; colNum < numberOfColumns; colNum++) {
      for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
        grid[colNum][rowNum].state = "dead";
        grid[colNum][rowNum].nextState = "dead";
      }
    }
    this.p5Canvas.background(0);
  };

  calculateGridWidthAndHeight = () => {
    gridWidth = Math.floor(numberOfColumns * resolution * zoomLevelVar);
    gridHeight = Math.floor(numberOfRows * resolution * zoomLevelVar);
  };

  calculateWidthAndHeight = () => {
    const { innerWidth: width, innerHeight: height } = window;
    // height calculation for what the
    // settings and explanation sizes are

    browserWidth = width;
    browserHeight = height * paddingForHeight;

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
      newGrid[centerX][centerY].nextState = "alive";
      newGrid[centerX][centerY - 1].nextState = "alive";
      newGrid[centerX][centerY + 1].nextState = "alive";
      newGrid[centerX - 1][centerY].nextState = "alive";
      newGrid[centerX + 1][centerY].nextState = "alive";
    }

    return newGrid;
  };

  createNestedArray = (cols, rows, shouldRandomize) => {
    let newArray = [];
    for (let colNum = 0; colNum < cols; colNum++) {
      newArray[colNum] = [];
      for (let rowNum = 0; rowNum < rows; rowNum++) {
        const state =
          shouldRandomize === true
            ? Math.random() < 0.5
              ? "dead"
              : "alive"
            : "dead";
        newArray[colNum][rowNum] = {
          state,
          id: `row${rowNum}col${colNum}`,
          nextState: null,
          prevState: state
        };
      }
    }
    return newArray;
  };

  handleClick = e => {
    const { selectedShape, zoomLevel } = this.props;

    // we want to know what square we pressed
    // so we need to take into account where user clicked on canvas (clickPos),
    // the Position of canvas the size of square (resolution)
    // how big the canvas is scaled (zoomLevel)
    const clickPosX = e.layerX + gridXPos * zoomLevel;
    const clickPosY = e.layerY + gridYPos * zoomLevel;

    const xPos = Math.floor(clickPosX / resolution / zoomLevel);
    const yPos = Math.floor(clickPosY / resolution / zoomLevel);

    let x = xPos * resolution;
    let y = yPos * resolution;

    // if we are clicking the grid to put on a shape
    // use the mouse pos to fill in the surrounding shapes
    const currentShape =
      selectedShape === "" ? shapes[0].config : shapes[selectedShape].config;
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
        if (!grid[xPos + col] || !grid[xPos + col][yPos + row]) continue;

        grid[xPos + col][yPos + row].state = state;
        this.p5Canvas.fill(fill);
        this.p5Canvas.stroke(0);
        this.p5Canvas.rect(
          x + col * resolution,
          y + row * resolution,
          resolution - 1,
          resolution - 1
        );
      }
    }
  };

  mouseReleased = e => {
    if (cursorState === "draw" && e.x === clickStartX && e.y === clickStartY) {
      this.handleClick(e);
    } else if (
      cursorState === "grab" &&
      e.x !== clickStartX &&
      e.y !== clickStartY
    ) {
      this.recalculatePosition(e.movementX, e.movementY);
    }
    clickStartX = null;
    clickStartY = null;
  };

  mousePressed = e => {
    if (
      e &&
      e.clientX > canvasXPos &&
      e.clientX < canvasXPos + canvasWidth &&
      e.clientY > canvasYPos &&
      e.clientY < canvasYPos + canvasHeight
    ) {
      clickStartX = e.x;
      clickStartY = e.y;
    }
  };

  Sketch = s => {
    const { speed, selectedShape } = this.props;

    s.setup = () => {
      let canvas = s
        .createCanvas(browserWidth, browserHeight)
        .parent(this.p5Ref);

      canvasWidth = browserWidth;
      canvasHeight = browserHeight;
      canvasXPos = canvas.elt.offsetLeft;
      canvasYPos = canvas.elt.offsetTop;

      // add event handlers - defining here to canvas
      // makes it so they only apply to canvas
      canvas.mouseWheel(e => this.scaleFunctionality(e));
      // canvas.mousePressed(e => mousePressed(e));
      // canvas.mouseReleased(e => this.mouseReleased(e));

      // figure out how big canvas should be
      numberOfColumns = Math.floor(
        (Math.floor(s.width) / resolution) * gridSizeMultiplier
      );
      numberOfRows = Math.floor(
        (Math.floor(s.height) / resolution) * gridSizeMultiplier
      );

      // set framerate depending on speed
      s.frameRate(speed);

      // get center of canvas
      centerX = Math.floor(numberOfColumns / 2);
      centerY = Math.floor(numberOfRows / 2);

      this.calculateGridWidthAndHeight();

      // set center of canvas to be center of screen
      this.centerCanvas();

      grid =
        grid[0] && grid[0][0].nextState !== null
          ? grid
          : this.setupGrid(numberOfColumns, numberOfRows);
    };

    s.draw = () => {
      // TODO: refactor
      s.background(0);
      s.scale(zoomLevelVar);
      s.translate(-gridXPos, -gridYPos);

      if (!redrawCanvas) {
        this.drawCalculateNeighbours();
      }

      for (let colNum = 0; colNum < numberOfColumns; colNum++) {
        for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
          let x = colNum * resolution;
          let y = rowNum * resolution;

          grid[colNum][rowNum].state =
            grid[colNum][rowNum].nextState !== null
              ? grid[colNum][rowNum].nextState
              : "dead";

          if (grid[colNum][rowNum].state === "alive") {
            s.fill(255);
            s.stroke(0);
            s.rect(x, y, resolution - 1, resolution - 1);
          } else {
          }
          grid[colNum][rowNum].nextState = null;
        }
      }

      s.frameRate(speedVar);

      redrawCanvas = false;
    };

    function windowResized() {
      s.resizeCanvas(browserWidth, browserHeight);
    }

    s.mouseDragged = e => {
      const { movementX, movementY, clientX, clientY } = e;
      // TODO investigate what happened to drawing speed
      // investigate performance first

      // first we gotta check to make sure were still
      // within the canvas during the drag so it doesn't just
      // run the function wherever we touch
      if (
        clientX > canvasXPos &&
        clientX < canvasXPos + browserWidth &&
        clientY > canvasYPos &&
        clientY < canvasYPos + browserHeight
      ) {
        if (cursorState === "draw") {
          this.handleClick(e);
        } else if (cursorState === "grab") {
          this.recalculatePosition(movementX, movementY);
        }
      }
    };
  };

  drawCanvasOneFrameWithoutMakingNewGrid = () => {
    redrawCanvas = true;
    this.p5Canvas.frameRate(1000);
  };

  centerCanvas = () => {
    gridXPos = (gridWidth - canvasWidth) / 2 / zoomLevelVar;
    gridYPos = (gridHeight - canvasHeight) / 2 / zoomLevelVar;
  };

  isCanvasSmallerThanScreen = () => {
    if (gridWidth < canvasWidth || gridHeight < canvasHeight) {
      return true;
    } else return false;
  };

  recalculatePosition = (movementX, movementY, dontMoveCanvas) => {
    if (this.isCanvasSmallerThanScreen() === true) {
      return this.centerCanvas();
    } else {
      if (
        // thse just check if the moving of grid is out of bounds
        gridXPos < -1 ||
        gridYPos < -1 ||
        gridYPos * zoomLevelVar + canvasHeight > gridHeight + 4 ||
        gridXPos * zoomLevelVar + canvasWidth > gridWidth + 4 ||
        dontMoveCanvas === true
      ) {
        if (gridXPos < 0) {
          gridXPos = -1;
        }
        if (gridYPos < 0) {
          gridYPos = -1;
        }
        if (gridXPos * zoomLevelVar + canvasWidth > gridWidth + 4) {
          gridXPos = (gridWidth - canvasWidth) / zoomLevelVar + 3;
        }
        if (gridYPos * zoomLevelVar + canvasHeight > gridHeight + 4) {
          gridYPos = (gridHeight - canvasHeight) / zoomLevelVar + 3;
        }
      } else {
        gridXPos -= movementX;
        gridYPos -= movementY;
      }
      this.drawCanvasOneFrameWithoutMakingNewGrid();
    }
  };

  drawCalculateNeighbours = () => {
    // TODO: refactor
    for (let colNum = 0; colNum < numberOfColumns; colNum++) {
      for (let rowNum = 0; rowNum < numberOfRows; rowNum++) {
        let state = grid[colNum][rowNum].state;

        // NOTE
        // If cell is DEAD at this point, sumOfAliveNeighbours wont be higher than maxDeadNeighbours + 1
        // If cell is DEAD at this point, sumOfAliveNeighbours wont be higher than maxAliveNeighbours + 1
        // for performance
        let sumOfAliveNeighbours = this.countNeighbors(colNum, rowNum, state);

        let stateToUpdateTo = "";
        if (state === "alive") {
          if (
            sumOfAliveNeighbours >= minAliveNeighbours &&
            sumOfAliveNeighbours <= maxAliveNeighbours
          ) {
            stateToUpdateTo = "alive";
          } else {
            stateToUpdateTo = "dead";
          }
        } else {
          if (
            sumOfAliveNeighbours >= minDeadNeighbours &&
            sumOfAliveNeighbours <= maxDeadNeighbours
          ) {
            stateToUpdateTo = "alive";
          } else {
            stateToUpdateTo = "dead";
          }
        }
        grid[colNum][rowNum].nextState =
          grid[colNum][rowNum].nextState !== null
            ? grid[colNum][rowNum].nextState
            : stateToUpdateTo;
      }
    }
    // }
  };

  countNeighbors = (x, y, state) => {
    let sumOfAliveNeighbours = 0;
    // -1 to +1 of x position of this square

    const maxNeighbours =
      state === "alive" ? maxAliveNeighbours : maxDeadNeighbours;
    for (let i = -1; i < 2; i++) {
      // -1 to +1 of y position of this square
      for (let j = -1; j < 2; j++) {
        if (sumOfAliveNeighbours >= maxNeighbours + 1) break;
        if (i === 0 && j === 0) continue;
        let xCoord = x + i;
        let yCoord = y + j;

        // check if coordinates are in grid
        // and its not current square
        if (grid[xCoord] === undefined || grid[xCoord][yCoord] === undefined)
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
    const { cursorAction } = this.props;
    return (
      <GameOfLifeGridContainer>
        <GameOfLifeGridLayout
          cursorAction={cursorAction}
          ref={ref => (this.p5Ref = ref)}
        />
      </GameOfLifeGridContainer>
    );
  }
}

export default GameOfLifeGrid;
