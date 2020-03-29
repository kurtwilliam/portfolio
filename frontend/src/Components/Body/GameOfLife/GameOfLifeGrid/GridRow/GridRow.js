import React, { Component, useEffect } from "react";
import GridRowLayout from "./GridRowLayout";
import GridSquare from "./GridSquare";

class GridRow extends Component {
  state = {};

  shouldComponentUpdate(nextProps) {
    const { shouldUpdate, shouldUpdateRowId } = nextProps;
    const { rowIndex } = this.props;

    if (
      shouldUpdate ||
      (shouldUpdateRowId !== null && shouldUpdateRowId === rowIndex)
    ) {
      return true;
    }

    return false;
  }

  render() {
    const {
      gridRow,
      updateSquare,
      rowIndex,
      shouldUpdateSquareId,
      shouldUpdate
    } = this.props;

    return (
      <GridRowLayout>
        {gridRow.map((square, squareIndex) => (
          <GridSquare
            key={square.id}
            square={square}
            squareIndex={squareIndex}
            updateSquare={updateSquare}
            rowIndex={rowIndex}
            shouldUpdate={shouldUpdate}
            shouldUpdateSquareId={shouldUpdateSquareId}
          />
        ))}
      </GridRowLayout>
    );
  }
}

export default GridRow;
