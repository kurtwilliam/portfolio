import React, { Component, useEffect } from "react";
import GridRowLayout from "./GridRowLayout";
import GridSquare from "./GridSquare";

class GridRow extends Component {
  state = {};

  render() {
    const { gridRow, updateSquare, rowIndex } = this.props;
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
