import React, { Component, useEffect } from "react";
import GridSquareLayout from "./GridSquareLayout";
import { gridSquareSize } from "../../../../../../config";

class GridSquare extends Component {
  render() {
    const { updateSquare, rowIndex, square, squareIndex } = this.props;

    const squareState = square.state;
    return (
      <GridSquareLayout
        gridSquareSize={gridSquareSize}
        onClick={() => updateSquare(rowIndex, squareIndex)}
        className={squareState}
        id={square.id}
      />
    );
  }
}

export default GridSquare;
