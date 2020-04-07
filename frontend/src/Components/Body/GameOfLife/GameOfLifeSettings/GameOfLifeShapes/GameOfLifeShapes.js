import React, { Component, useEffect } from "react";
import GameOfLifeShapesLayout from "./GameOfLifeShapesLayout";
import shapes from "../../shapes";

class GameOfLifeShapes extends Component {
  render() {
    console.log(shapes);
    return (
      <GameOfLifeShapesLayout>
        {Object.keys(shapes).map((shapeName, i) => {
          <div className="gol__shapes--shape" key={shapeName}>
            {shapes[shapeName].map((row, rowIndex) => (
              <div className="gol__shapes--row" key={`${shapeName}${rowIndex}`}>
                {shapes[shapeName][rowIndex].map((row, rowIndex) => {
                  if (shapes[shapeName][rowIndex] === true) {
                    return <div className="gol__shapes--shape__square"></div>;
                  } else {
                    return <div className="gol__shapes--shape__empty"></div>;
                  }
                })}
              </div>
            ))}
          </div>;
        })}
      </GameOfLifeShapesLayout>
    );
  }
}

export default GameOfLifeShapes;
