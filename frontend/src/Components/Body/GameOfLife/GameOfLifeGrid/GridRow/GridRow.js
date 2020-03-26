import React, { Component, useEffect } from "react";
import GridRowLayout from "./GridRowLayout";
import GridSquare from "./GridSquare";

class GridRow extends Component {
  state = {};

  shouldComponentUpdate(nextProps) {
    const { shouldUpdate } = nextProps;

    if (shouldUpdate) {
      return true;
    }

    return false;
  }

  render() {
    const { gridRow, updateSquare, rowIndex } = this.props;
    console.log("rerendered");
    return (
      <GridRowLayout>
        {gridRow.map((square, squareIndex) => (
          <GridSquare
            key={square.id}
            square={square}
            squareIndex={squareIndex}
            updateSquare={updateSquare}
            rowIndex={rowIndex}
          />
        ))}
      </GridRowLayout>
    );
  }
}

export default GridRow;
