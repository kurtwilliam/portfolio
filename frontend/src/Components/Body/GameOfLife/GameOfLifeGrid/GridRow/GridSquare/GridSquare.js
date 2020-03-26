import React, { Component, useEffect } from "react";
import GridSquareLayout from "./GridSquareLayout";
import { gridSquareSize } from "../../../../../../config";

class GridSquare extends Component {
  shouldComponentUpdate(nextProps) {
    const { shouldUpdate, shouldUpdateSquareId, squareIndex } = nextProps;

    // console.log(shouldUpdateSquareId, " ", squareIndex, shouldUpdate)

    if (
      shouldUpdate ||
      (shouldUpdateSquareId !== null && shouldUpdateSquareId === squareIndex)
    ) {
      // console.log("YEEEET", shouldUpdateSquareId, " ", squareIndex);
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
