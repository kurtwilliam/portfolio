/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifeShapesLayout from "./GameOfLifeShapesLayout";
import shapes from "../../shapes";
class GameOfLifeShapes extends Component {
  render() {
    const { updateSelectedShape, selectedShape } = this.props;
    console.log(shapes);
    console.log(selectedShape);
    return (
      <GameOfLifeShapesLayout
        className={`gol__shapes ${selectedShape === "" ? "hidden" : ""}`}
      >
        {Object.keys(shapes).map((shapeName, i) =>
          shapes[shapeName][0].length > 6 ? (
            <span
              className={`gol__shapes--shape ${
                selectedShape === shapeName ? "selected" : ""
              }`}
              onClick={() => updateSelectedShape(shapeName)}
              key={shapeName}
            >
              {shapeName}
            </span>
          ) : (
            <div
              className={`gol__shapes--shape ${
                selectedShape === shapeName ? "selected" : ""
              }`}
              key={shapeName}
              title={shapeName}
              onClick={() => updateSelectedShape(shapeName)}
            >
              {shapes[shapeName].map((row, rowIndex) => (
                <div
                  className="gol__shapes--row"
                  key={`${shapeName}${rowIndex}`}
                >
                  {shapes[shapeName][rowIndex].map((shape, shapeIndex) => (
                    <div
                      key={`${shapeName}r${rowIndex}s${shapeIndex}`}
                      className={`gol__shapes--shape__square gol__shapes--shape__${
                        shape ? "filled" : "empty"
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          )
        )}
      </GameOfLifeShapesLayout>
    );
  }
}

export default GameOfLifeShapes;
