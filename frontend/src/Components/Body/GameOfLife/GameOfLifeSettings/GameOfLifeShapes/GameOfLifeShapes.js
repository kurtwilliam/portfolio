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
        {Object.keys(shapes).map((shapeName, i) => (
          <div
            className={`gol__shapes--shape ${
              selectedShape === shapeName ? "selected" : ""
            }`}
            key={shapeName}
            title={shapeName}
          >
            {shapes[shapeName].map((row, rowIndex) => (
              <div className="gol__shapes--row" key={`${shapeName}${rowIndex}`}>
                {shapes[shapeName][rowIndex].map((shape, shapeIndex) => (
                  <div
                    key={`${shapeName}r${rowIndex}s${shapeIndex}`}
                    className={`gol__shapes--shape__square gol__shapes--shape__${
                      shape ? "filled" : "empty"
                    }`}
                    onClick={() => updateSelectedShape(shapeName)}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </GameOfLifeShapesLayout>
    );
  }
}

export default GameOfLifeShapes;
