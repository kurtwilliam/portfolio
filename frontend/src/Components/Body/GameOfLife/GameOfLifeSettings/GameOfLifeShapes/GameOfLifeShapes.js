/* eslint-disable */

import React, { Component, useEffect } from "react";
import GameOfLifeShapesLayout from "./GameOfLifeShapesLayout";
import shapes from "../../shapes";
class GameOfLifeShapes extends Component {
  render() {
    console.log(shapes);
    return (
      <GameOfLifeShapesLayout>
        {Object.keys(shapes).map((shapeName, i) => (
          <div className="gol__shapes--shape" key={shapeName} title={shapeName}>
            {shapes[shapeName].map((row, rowIndex) => (
              <div className="gol__shapes--row" key={`${shapeName}${rowIndex}`}>
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
        ))}
      </GameOfLifeShapesLayout>
    );
  }
}

export default GameOfLifeShapes;
