import React, { Component, useEffect } from "react";
import GridSquareLayout from "./GridSquareLayout";

const gridSquareSize = 16;

class GridSquare extends Component {
  shouldComponentUpdate(nextProps) {
    const { shouldUpdate, shouldUpdateSquareId, squareIndex } = nextProps;

    if (
      shouldUpdate ||
      (shouldUpdateSquareId !== null && shouldUpdateSquareId === squareIndex)
    ) {
      return true;
    }

    return false;
  }

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
